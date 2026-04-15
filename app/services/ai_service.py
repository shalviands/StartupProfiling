import httpx
import json
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

FREE_MODELS = [
    "meta-llama/llama-3.1-8b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "google/gemma-2-9b-it:free",
    "openchat/openchat-7b:free",
]

class AIService:

    async def analyse(self, team: dict) -> dict:
        prompt = self._build_prompt(team)
        for model in FREE_MODELS:
            try:
                result = await self._call_openrouter(model, prompt)
                if result:
                    result['model_used'] = model
                    return result
            except Exception as e:
                logger.warning(f"Model {model} failed: {e}")
                continue
        
        # All models failed — use rule-based fallback
        return self._rule_based(team)

    async def _call_openrouter(self, model: str, prompt: str) -> dict:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                    "HTTP-Referer": "https://inunity.co",
                    "X-Title": "InUnity Startup Profiler",
                },
                json={
                    "model": model,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.4,
                    "max_tokens": 600,
                    "response_format": {"type": "json_object"},
                }
            )
            resp.raise_for_status()
            data = resp.json()
            raw = data["choices"][0]["message"]["content"]
            
            # Strip markdown fences if model wraps in ```json
            clean = raw.strip().lstrip("```json").lstrip("```").rstrip("```").strip()
            return json.loads(clean)

    def _sanitize(self, text: any) -> str:
        if text is None: return "N/A"
        return str(text).replace('"', '\\"').replace("'", "\\'").replace("\n", " ")

    def _build_prompt(self, team: dict) -> str:
        s_name = self._sanitize(team.get('startup_name'))
        s_sector = self._sanitize(team.get('sector'))
        s_p0 = self._sanitize(team.get('p0_need'))
        s_notes = self._sanitize(team.get('notes'))

        return f"""You are an expert startup incubation coach.
Analyse this startup profile and return ONLY a valid JSON object.
No markdown, no explanation, just the JSON.

JSON structure required:
{{
  "strengths": "2-3 sentences on what this team is doing well",
  "gaps": "2-3 sentences on critical issues to fix before the event",
  "recommendations": "specific actionable next steps",
  "readiness_summary": "one sentence overall assessment"
}}

Startup Profile:
- Name: {s_name}
- Sector: {s_sector}
- Problem score: {team.get('problem_score', 'N/A')}/5
- Market score: {team.get('market_score', 'N/A')}/5
- Business model score: {team.get('biz_model_score', 'N/A')}/5
- Pitch score: {team.get('pitch_score', 'N/A')}/5
- Overall score: {team.get('overall_score', 'N/A')}/5
- Revenue stage: {team.get('revenue_stage', 'Unknown')}
- TRL: {team.get('trl', '?')} / BRL: {team.get('brl', '?')} / CRL: {team.get('crl', '?')}
- P0 need: {s_p0}
- Notes: {s_notes}"""

    def _rule_based(self, team: dict) -> dict:
        scores = {k: team.get(k) for k in 
                  ['problem_score','market_score','biz_model_score','pitch_score']
                  if team.get(k)}
        
        if scores:
            weakest = min(scores, key=scores.get).replace('_score','').replace('_',' ')
            best = max(scores, key=scores.get).replace('_score','').replace('_',' ')
        else:
            weakest, best = 'business fundamentals', 'problem understanding'

        return {
            "strengths": f"The team demonstrates relative strength in {best}. There is visible commitment and a clear domain focus.",
            "gaps": f"The weakest area identified is {weakest}. This needs immediate structured attention before the event.",
            "recommendations": "Focus on P0 priorities. Complete the pitch deck and validate with at least 5 customers.",
            "readiness_summary": f"Team is in early stages with focused effort needed on {weakest}.",
            "model_used": "rule-based (all AI models unavailable)"
        }
