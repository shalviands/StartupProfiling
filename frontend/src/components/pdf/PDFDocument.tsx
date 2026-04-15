import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import type { TeamProfile, TeamScores } from '../../types/team.types'

const COLORS = {
  navy:    '#0F2647',
  navyLt:  '#1A3A6B',
  gold:    '#E8A020',
  goldLt:  '#FDF3DC',
  teal:    '#1A7A6E',
  tealLt:  '#D8F0ED',
  coral:   '#E84B3A',
  coralLt: '#FDECEA',
  purple:  '#5B4FCF',
  purpleLt:'#EEEAFF',
  slate:   '#3B5070',
  silver:  '#8A9BB0',
  smoke:   '#F4F6F9',
  rule:    '#DDE3EC',
  white:   '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: COLORS.white,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.navy,
  },
  header: {
    backgroundColor: COLORS.navy,
    padding: 20,
    position: 'relative',
    borderRadius: 4,
    marginBottom: 8,
  },
  headerAccent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 4, backgroundColor: COLORS.gold,
  },
  microLabel: {
    fontSize: 7, color: COLORS.gold, fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5, marginBottom: 4,
  },
  startupName: {
    fontSize: 22, color: COLORS.white, fontFamily: 'Helvetica-Bold',
  },
  headerMeta: {
    flexDirection: 'row', gap: 15, marginTop: 10,
    borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 10,
  },
  metaItem: { fontSize: 8, color: COLORS.silver },
  metaVal: { fontSize: 8.5, color: COLORS.white, fontFamily: 'Helvetica-Bold' },

  band: {
    flexDirection: 'row', backgroundColor: '#F0F4F8',
    borderRadius: 4, marginBottom: 8, overflow: 'hidden',
  },
  bandCol: { flex: 1, padding: 12 },
  bandColAlt: { backgroundColor: '#E1E8F0' },
  bandLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: COLORS.navy, marginBottom: 4 },
  bandText: { fontSize: 8, color: COLORS.slate, lineHeight: 1.3 },

  tilesRow: { flexDirection: 'row', gap: 4, marginBottom: 8 },
  tile: {
    flex: 1, borderRadius: 4, padding: 8, alignItems: 'center',
    borderBottomWidth: 2,
  },
  tileScore: { fontSize: 16, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  tileLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', textAlign: 'center' },

  statsBar: {
    flexDirection: 'row', backgroundColor: '#EBF3FC', 
    borderRadius: 4, padding: 8, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#2B6CB0',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#2B6CB0' },
  statLabel: { fontSize: 6.5, color: '#4A5568', textTransform: 'uppercase' },

  body: { flexDirection: 'row', gap: 12 },
  leftCol: { flex: 1 },
  rightCol: { flex: 1 },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: COLORS.rule,
    marginBottom: 6, marginTop: 4,
  },
  sectionDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.gold },
  sectionTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: COLORS.navy },

  card: { paddingBottom: 6 },
  cardLabel: { fontSize: 7, color: COLORS.silver, marginBottom: 2, textTransform: 'uppercase' },
  cardText: { fontSize: 8.5, color: COLORS.navy, lineHeight: 1.3 },
  cardBox: { 
    backgroundColor: COLORS.smoke, padding: 6, borderRadius: 3, 
    fontSize: 8, color: COLORS.slate, lineHeight: 1.3 
  },

  rmTable: { marginTop: 4 },
  rmHeader: { 
    flexDirection: 'row', backgroundColor: COLORS.navy, 
    borderRadius: 2, padding: 4, marginBottom: 2 
  },
  rmHeaderText: { fontSize: 7, color: COLORS.white, fontFamily: 'Helvetica-Bold' },
  rmRow: { 
    flexDirection: 'row', padding: 5, borderRadius: 2, 
    marginBottom: 2, alignItems: 'center' 
  },
  rmText: { fontSize: 7.5, color: COLORS.navy },

  footer: {
    position: 'absolute', bottom: 24, left: 24, right: 24,
    borderTopWidth: 0.5, borderTopColor: COLORS.rule, paddingTop: 8,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  footerText: { fontSize: 7, color: COLORS.silver },
})

const TILE_DEFS = [
  { key: 'problem',  label: 'PROBLEM &\nSOLUTION', color: COLORS.teal,   bg: COLORS.tealLt  },
  { key: 'market',   label: 'MARKET &\nVALIDATION', color: COLORS.navyLt, bg: '#D6E4F7'      },
  { key: 'biz',      label: 'BUSINESS\nMODEL',     color: COLORS.purple, bg: COLORS.purpleLt},
  { key: 'pitch',    label: 'PITCH\nREADINESS',    color: COLORS.coral,  bg: COLORS.coralLt },
  { key: 'overall',  label: 'OVERALL\nREADINESS',  color: COLORS.gold,   bg: COLORS.goldLt, isLast: true },
]

export default function PDFDocument({ team, scores }: { team: TeamProfile, scores: TeamScores | null }) {
  const sv = (v: any) => v || '—'
  const sc = scores || { problem:0, market:0, biz:0, pitch:0, overall:0 }

  return (
    <Document title={`${team.startupName || 'Startup'} Diagnosis Report`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.microLabel}>STARTUP DIAGNOSIS / PROFILE REPORT</Text>
          <Text style={styles.startupName}>{sv(team.startupName).toUpperCase()}</Text>
          <View style={styles.headerMeta}>
            <View style={{ flex: 1.2 }}>
              <Text style={styles.metaItem}>TEAM NAME</Text>
              <Text style={styles.metaVal}>{sv(team.teamName)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.metaItem}>SECTOR</Text>
              <Text style={styles.metaVal}>{team.sector === 'Other' ? team.sectorOther : team.sector}</Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.metaItem}>DATE</Text>
              <Text style={styles.metaVal}>{sv(team.interviewDate)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.metaItem}>INTERVIEWER</Text>
              <Text style={styles.metaVal}>{sv(team.interviewer)}</Text>
            </View>
          </View>
          <View style={styles.headerAccent} />
        </View>

        <View style={styles.band}>
          <View style={styles.bandCol}>
            <Text style={styles.bandLabel}>PROBLEM STATEMENT</Text>
            <Text style={styles.bandText}>{sv(team.problemStatement)}</Text>
          </View>
          <View style={[styles.bandCol, styles.bandColAlt]}>
            <Text style={styles.bandLabel}>PROPOSED SOLUTION</Text>
            <Text style={styles.bandText}>{sv(team.solutionDescription)}</Text>
          </View>
        </View>

        <View style={styles.tilesRow}>
          {TILE_DEFS.map(tile => {
            const val = sc[tile.key as keyof TeamScores]
            return (
              <View key={tile.key} style={[styles.tile, { 
                backgroundColor: tile.bg,
                borderBottomColor: tile.color
              }]}>
                <Text style={[styles.tileScore, { color: tile.color }]}>
                  {val ? `${val}/5` : '—'}
                </Text>
                <Text style={[styles.tileLabel, { color: tile.color }]}>{tile.label}</Text>
              </View>
            )
          })}
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{team.usersTested || 0}</Text>
            <Text style={styles.statLabel}>Users Tested</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#B8D4EE', height: '100%' }} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{team.stakeholdersInteracted || 0}</Text>
            <Text style={styles.statLabel}>Interactions</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#B8D4EE', height: '100%' }} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { fontSize: 7, marginTop: 2 }]}>{sv(team.stakeholderTypes).substring(0, 20)}</Text>
            <Text style={styles.statLabel}>Types</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#B8D4EE', height: '100%' }} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { fontSize: 7, marginTop: 2 }]}>{sv(team.testingDetails).substring(0, 15)}...</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        <View style={[styles.tilesRow, { marginBottom: 12 }]}>
          <View style={{ flex: 1, backgroundColor: COLORS.smoke, borderRadius: 4, padding: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.navy }}>{team.trl || 1}</Text>
            <Text style={{ fontSize: 6, color: COLORS.silver }}>TRL</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.smoke, borderRadius: 4, padding: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.navy }}>{team.brl || 1}</Text>
            <Text style={{ fontSize: 6, color: COLORS.silver }}>BRL</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.smoke, borderRadius: 4, padding: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.navy }}>{team.crl || 1}</Text>
            <Text style={{ fontSize: 6, color: COLORS.silver }}>CRL</Text>
          </View>
          <View style={{ flex: 2, backgroundColor: COLORS.smoke, borderRadius: 4, padding: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: COLORS.navy }}>{sv(team.revenueStage)}</Text>
            <Text style={{ fontSize: 6, color: COLORS.silver }}>REVENUE STAGE</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.leftCol}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>A. DIAGNOSIS FINDINGS</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Key Strengths</Text>
              <Text style={styles.cardBox}>{sv(team.strengths)}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Critical Gaps</Text>
              <Text style={styles.cardBox}>{sv(team.gaps)}</Text>
            </View>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>B. RECOMMENDED PATHWAY</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Program Modules</Text>
              <View style={{ backgroundColor: COLORS.purpleLt, padding: 6, borderRadius: 3 }}>
                <Text style={{ fontSize: 8.5, color: COLORS.purple, fontFamily: 'Helvetica-Bold' }}>{sv(team.modules)}</Text>
              </View>
            </View>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>C. MENTOR & NEXT STEPS</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>Assigned Mentor</Text>
                <Text style={styles.cardText}>{sv(team.mentor)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>Next Check-in</Text>
                <Text style={styles.cardText}>{sv(team.nextCheckin)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>D. INDIVIDUAL ROADMAP</Text>
            </View>
            <View style={styles.rmTable}>
              <View style={styles.rmHeader}>
                <Text style={[styles.rmHeaderText, { flex: 0.2 }]}>PRI</Text>
                <Text style={[styles.rmHeaderText, { flex: 1 }]}>ACTION / MILESTONE</Text>
                <Text style={[styles.rmHeaderText, { flex: 0.4 }]}>WHEN</Text>
              </View>
              {(team.roadmap || []).slice(0, 5).map((item, i) => {
                const bg = item.priority === 'P0' ? COLORS.coralLt : item.priority === 'P1' ? COLORS.goldLt : COLORS.tealLt
                return (
                  <View key={i} style={[styles.rmRow, { backgroundColor: bg }]}>
                    <Text style={[styles.rmText, { flex: 0.2, fontFamily: 'Helvetica-Bold' }]}>{item.priority}</Text>
                    <Text style={[styles.rmText, { flex: 1 }]}>{item.action}</Text>
                    <Text style={[styles.rmText, { flex: 0.4, fontSize: 6.5 }]}>{item.byWhen}</Text>
                  </View>
                )
              })}
            </View>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>E. GENERAL OBSERVATIONS</Text>
            </View>
            <Text style={{ fontSize: 8, color: COLORS.slate, lineHeight: 1.4 }}>
              {sv(team.notes)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>InUnity Private Limited — Confidential Internal Document</Text>
          <Text style={styles.footerText}>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  )
}
