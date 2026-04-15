from typing import Optional

def calculate_scores(team: dict) -> dict:
    """
    Calculates diagnostic scores based on the team profile.
    Exclude zeros from average (unscored != 0).
    Rounding to 1 decimal place.
    """
    def avg(keys: list[str]) -> Optional[float]:
        values = [team.get(k) or 0 for k in keys]
        filtered = [v for v in values if v > 0]
        if not filtered:
            return None
        return round(sum(filtered) / len(filtered), 1)

    problem = avg(['problem_score', 'solution_score', 'unique_value_score'])
    market  = avg(['customer_interview_score', 'competitor_score', 'market_size_score'])
    biz     = avg(['revenue_model_score', 'bmc_score'])
    pitch   = avg(['pitch_deck_score', 'elevator_score', 'investor_ask_score'])
    
    sections = [s for s in [problem, market, biz, pitch] if s is not None]
    overall  = round(sum(sections) / len(sections), 1) if sections else None

    return {
        'problem': problem,
        'market': market,
        'biz': biz,
        'pitch': pitch,
        'overall': overall,
    }
