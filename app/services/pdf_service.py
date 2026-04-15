from fpdf import FPDF
from datetime import datetime
import io

class DiagnosisPDF(FPDF):
    def __init__(self, team: dict, scores: dict):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.team = team
        self.scores = scores
        self.COLORS = {
            'navy': (15, 38, 71),
            'gold': (232, 160, 32),
            'teal': (26, 122, 110),
            'coral': (232, 75, 58),
            'purple': (91, 79, 207),
            'slate': (59, 80, 112),
            'silver': (138, 155, 176),
            'smoke': (244, 246, 249),
            'rule': (221, 227, 236),
            'white': (255, 255, 255)
        }
        self.set_margins(0,0,0)
        self.set_auto_page_break(False)
        self.add_page()
        self._build()

    def _build(self):
        self._draw_borders()
        self._draw_header()
        self._draw_score_tiles()
        self._draw_pills()
        self._draw_body()
        self._draw_footer()

    def _draw_borders(self):
        self.set_line_width(0.8)
        self.set_draw_color(*self.COLORS['navy'])
        self.rect(1, 1, 208, 295)
        
        self.set_line_width(0.2)
        self.set_draw_color(*self.COLORS['gold'])
        self.rect(2.5, 2.5, 205, 292)

    def _draw_header(self):
        # Background
        self.set_fill_color(*self.COLORS['navy'])
        self.rect(0, 0, 210, 45, 'F')
        
        # Gold accent bar left
        self.set_fill_color(*self.COLORS['gold'])
        self.rect(0, 0, 2, 45, 'F')
        
        # Gold accent bottom
        self.rect(0, 44, 210, 1, 'F')
        
        self.set_xy(10, 8)
        self.set_font('Helvetica', 'B', 7)
        self.set_text_color(*self.COLORS['gold'])
        self.cell(100, 4, "STARTUP DIAGNOSIS / PROFILE REPORT", ln=True)
        
        # Micro rule
        self.set_draw_color(*self.COLORS['gold'])
        self.set_line_width(0.1)
        self.line(10, 13, 30, 13)
        
        # Startup Name
        self.set_xy(10, 18)
        self.set_font('Helvetica', 'B', 22)
        self.set_text_color(*self.COLORS['white'])
        self.cell(100, 10, self.team.get('startup_name', 'STARTUP NAME').upper(), ln=True)
        
        self.set_font('Helvetica', '', 8)
        self.set_text_color(255, 255, 255)
        self.set_alpha(0.5)
        self.cell(100, 5, "Diagnosis & Profile Report", ln=True)
        self.set_alpha(1.0)
        
        # Right info
        self.set_xy(130, 12)
        self._info_field("TEAM NAME", self.team.get('team_name', '—'))
        self.set_xy(130, 22)
        self._info_field("SECTOR", self.team.get('sector', '—'))
        
        self.set_xy(130, 32)
        self._info_field("DATE", str(self.team.get('interview_date', '—')), w=30)
        self.set_xy(165, 32)
        self._info_field("INTERVIEWER", self.team.get('interviewer', '—'), w=30)

    def _info_field(self, label, value, w=70):
        curr_x = self.get_x()
        curr_y = self.get_y()
        self.set_font('Helvetica', 'B', 6)
        self.set_text_color(*self.COLORS['silver'])
        self.cell(w, 3, label, ln=True)
        
        self.set_x(curr_x)
        self.set_font('Helvetica', '', 9)
        self.set_text_color(*self.COLORS['white'])
        self.cell(w, 5, str(value), ln=True)
        
        self.set_draw_color(255, 255, 255)
        self.set_alpha(0.2)
        self.line(curr_x, self.get_y(), curr_x + w, self.get_y())
        self.set_alpha(1.0)

    def _draw_score_tiles(self):
        tiles = [
            {'key': 'problem',  'label': 'Problem & Solution', 'color': self.COLORS['teal'],   'bg': (216, 240, 237)},
            {'key': 'market',   'label': 'Market & Customers', 'color': self.COLORS['navy'],   'bg': (214, 228, 247)},
            {'key': 'biz_model','label': 'Business Model',    'color': self.COLORS['purple'], 'bg': (238, 234, 255)},
            {'key': 'pitch',    'label': 'Pitch Readiness',   'color': self.COLORS['coral'],  'bg': (253, 236, 234)},
            {'key': 'overall',  'label': 'Overall Readiness', 'color': self.COLORS['gold'],   'bg': self.COLORS['gold']},
        ]
        
        x = 8
        y = 52
        w = 38
        h = 18
        
        for tile in tiles:
            is_last = tile['key'] == 'overall'
            self.set_fill_color(*(tile['color'] if is_last else tile['bg']))
            self.rect(x, y, w, h, 'F')
            
            # Accent top
            self.set_fill_color(*tile['color'])
            self.rect(x, y, w, 1.5, 'F')
            
            # Score
            self.set_xy(x, y + 4)
            self.set_font('Helvetica', 'B', 12)
            self.set_text_color(*(self.COLORS['white'] if is_last else tile['color']))
            score_val = self.scores.get(tile['key'])
            self.cell(w, 8, f"{score_val}/5" if score_val else "—", align='C', ln=True)
            
            # Label
            self.set_x(x)
            self.set_font('Helvetica', '', 6)
            self.set_text_color(*( (255,255,255) if is_last else self.COLORS['slate']))
            self.cell(w, 4, tile['label'], align='C')
            
            x += w + 1

    def _draw_pills(self):
        pills = [
            ('TRL', self.team.get('trl')),
            ('BRL', self.team.get('brl')),
            ('CRL', self.team.get('crl')),
            ('STAGE', self.team.get('revenue_stage')),
            ('BMC', self.team.get('bmc_done'))
        ]
        
        x = 8
        y = 75
        w = 38
        h = 8
        
        for p_label, p_val in pills:
            self.set_fill_color(*self.COLORS['smoke'])
            self.set_draw_color(*self.COLORS['rule'])
            self.rect(x, y, w, h, 'DF')
            
            self.set_xy(x, y + 1)
            self.set_font('Helvetica', 'B', 7)
            self.set_text_color(*self.COLORS['navy'])
            self.cell(w, 3, p_label, align='C', ln=True)
            
            self.set_x(x)
            self.set_font('Helvetica', '', 7)
            self.set_text_color(*self.COLORS['slate'])
            self.cell(w, 3, str(p_val or '—')[:15], align='C')
            
            x += w + 1

    def _draw_body(self):
        # Body start y ~ 90
        self.set_draw_color(*self.COLORS['rule'])
        self.line(8, 88, 202, 88)
        
        # Left Col (x=8, w=92) | Right Col (x=110, w=92)
        self._draw_left_col()
        self._draw_right_col()
        
        # Vertical divider
        self.set_draw_color(*self.COLORS['rule'])
        self.line(105, 95, 105, 275)

    def _draw_left_col(self):
        x = 8
        y = 95
        w = 92
        
        # Section C
        self._section_header(x, y, "C. DIAGNOSIS FINDINGS", self.COLORS['gold'])
        y += 8
        
        cards = [
            ('KEY STRENGTHS', self.team.get('strengths'), self.COLORS['teal'], (216, 240, 237)),
            ('KEY GAPS', self.team.get('gaps'), self.COLORS['coral'], (253, 236, 234)),
            ('RECOMMENDED MODULES', self.team.get('modules'), self.COLORS['purple'], (238, 234, 255)),
        ]
        
        for card_label, card_val, acc, bg in cards:
            self.set_fill_color(*bg)
            self.rect(x, y, w, 22, 'F')
            self.set_fill_color(*acc)
            self.rect(x, y, 1.5, 22, 'F')
            
            self.set_xy(x + 5, y + 2)
            self.set_font('Helvetica', 'B', 7)
            self.set_text_color(*acc)
            self.cell(w-5, 4, card_label, ln=True)
            
            self.set_xy(x + 5, y + 6)
            self.set_font('Helvetica', '', 7)
            self.set_text_color(*self.COLORS['slate'])
            self.multi_cell(w-7, 3, str(card_val or 'Not specified'))
            
            y += 24

        # Section D
        y += 2
        self._section_header(x, y, "D. PROGRAMME NEEDS", self.COLORS['teal'])
        y += 8
        
        needs = [
            ('P0', self.team.get('p0_need'), self.COLORS['coral'], (253, 236, 234)),
            ('P1', self.team.get('p1_need'), self.COLORS['gold'], (253, 243, 220)),
            ('P2', self.team.get('p2_need'), self.COLORS['teal'], (216, 240, 237)),
        ]
        
        for n_code, n_val, acc, bg in needs:
            self.set_fill_color(*bg)
            self.rect(x, y, w, 8, 'F')
            
            self.set_xy(x + 2, y + 1.5)
            self.set_fill_color(*acc)
            self.set_text_color(255, 255, 255)
            self.set_font('Helvetica', 'B', 7)
            self.cell(8, 5, n_code, ln=False, align='C', fill=True)
            
            self.set_text_color(*self.COLORS['slate'])
            self.set_font('Helvetica', '', 7)
            self.cell(80, 5, "  " + str(n_val or 'Not specified'))
            
            y += 10

    def _draw_right_col(self):
        x = 110
        y = 95
        w = 92
        
        # Section A
        self._section_header(x, y, "A. TEAM DETAILS", self.COLORS['gold'])
        y += 8
        
        self.set_xy(x, y)
        self._field_label_val("INSTITUTION", self.team.get('institution', '—'), w)
        y += 12
        self.set_xy(x, y)
        val = f"{self.team.get('team_size', '—')} members"
        if self.team.get('roles'): val += f" · {self.team['roles']}"
        self._field_label_val("TEAM SIZE & ROLES", val, w)
        y += 15
        
        # Section E
        self._section_header(x, y, "E. INDIVIDUAL ROADMAP", self.COLORS['navy'])
        y += 8
        
        # Table Header
        self.set_fill_color(*self.COLORS['navy'])
        self.rect(x, y, w, 6, 'F')
        self.set_xy(x + 1, y + 1)
        self.set_font('Helvetica', 'B', 6)
        self.set_text_color(255, 255, 255)
        self.cell(15, 4, "Priority")
        self.cell(50, 4, "Action / Milestone")
        self.cell(25, 4, "By When")
        y += 7
        
        # Placeholder for 3 items
        roadmap = self.team.get('roadmap', [])
        for i in range(3):
            item = roadmap[i] if len(roadmap) > i else {'priority': '—', 'action': '...', 'by_when': '...'}
            p = item.get('priority', 'P1')
            bg = (216, 240, 237) if p == 'P2' else (253, 243, 220) if p == 'P1' else (253, 236, 234)
            acc = self.COLORS['teal'] if p == 'P2' else self.COLORS['gold'] if p == 'P1' else self.COLORS['coral']
            
            self.set_fill_color(*bg)
            self.rect(x, y, w, 7, 'F')
            self.set_xy(x + 1, y + 1)
            
            self.set_fill_color(*acc)
            self.set_text_color(255, 255, 255)
            self.cell(10, 5, str(p), align='C', fill=True)
            
            self.set_text_color(*self.COLORS['slate'])
            self.set_font('Helvetica', '', 6)
            self.cell(55, 5, "  " + str(item.get('action', '—'))[:40])
            self.cell(25, 5, str(item.get('by_when', '—')))
            y += 8
            
        # Mentor strip
        y += 2
        self.set_fill_color(*self.COLORS['smoke'])
        self.set_draw_color(*self.COLORS['rule'])
        self.rect(x, y, w, 8, 'DF')
        self.set_xy(x + 2, y + 2)
        self.set_font('Helvetica', 'B', 7)
        self.set_text_color(*self.COLORS['navy'])
        self.write(4, "Mentor: ")
        self.set_font('Helvetica', '', 7)
        self.set_text_color(*self.COLORS['slate'])
        self.write(4, str(self.team.get('mentor', '—')))
        self.set_x(x + 50)
        self.set_font('Helvetica', 'B', 7)
        self.set_text_color(*self.COLORS['navy'])
        self.write(4, "Check-in: ")
        self.set_font('Helvetica', '', 7)
        self.set_text_color(*self.COLORS['slate'])
        self.write(4, str(self.team.get('next_checkin', '—')))
        
        # Section F
        y += 12
        self._section_header(x, y, "F. NOTES", (136, 136, 136))
        y += 8
        self.set_fill_color(*self.COLORS['smoke'])
        self.rect(x, y, w, 30, 'F')
        self.set_xy(x + 2, y + 2)
        self.set_font('Helvetica', '', 7)
        self.set_text_color(*self.COLORS['slate'])
        self.multi_cell(w - 4, 3, str(self.team.get('notes', '—')))

    def _section_header(self, x, y, title, color):
        self.set_fill_color(*color)
        self.rect(x, y, 2, 6, 'F')
        self.set_xy(x + 4, y + 1)
        self.set_font('Helvetica', 'B', 8)
        self.set_text_color(*self.COLORS['navy'])
        self.cell(w=40, h=4, text=title)
        
        self.set_draw_color(*self.COLORS['rule'])
        self.line(self.get_x() + 2, y + 3, x + 92, y + 3)

    def _field_label_val(self, label, val, w):
        self.set_font('Helvetica', 'B', 6)
        self.set_text_color(*self.COLORS['silver'])
        self.cell(w, 3, label, ln=True)
        self.set_font('Helvetica', '', 9)
        self.set_text_color(*self.COLORS['navy'])
        self.cell(w, 5, str(val), ln=True)
        self.set_draw_color(*self.COLORS['rule'])
        self.line(self.get_x(), self.get_y(), self.get_x() + w, self.get_y())

    def _draw_footer(self):
        self.set_fill_color(*self.COLORS['navy'])
        self.rect(0, 285, 210, 12, 'F')
        self.set_fill_color(*self.COLORS['gold'])
        self.rect(0, 285, 210, 1, 'F')
        
        self.set_xy(10, 288)
        self.set_font('Helvetica', 'B', 9)
        self.set_text_color(255, 255, 255)
        self.cell(100, 4, "InUnity Private Limited")
        
        self.set_xy(10, 292)
        self.set_font('Helvetica', '', 7)
        self.set_text_color(*self.COLORS['silver'])
        self.cell(100, 3, "Startup Diagnosis / Profile Report")
        
        self.set_xy(150, 288)
        self.set_font('Helvetica', '', 6)
        self.set_text_color(*self.COLORS['silver'])
        self.multi_cell(50, 3, "Confidential — Internal Use Only\nPage 1 of 1", align='R')

def generate_diagnosis_pdf(team_data, scores):
    pdf = DiagnosisPDF(team_data, scores)
    return pdf.output()
