'use client'

import React, { useState, useEffect } from 'react'
import { FileText, Loader2 } from 'lucide-react'
import type { TeamProfile } from '@/types/team.types'
import dynamic from 'next/dynamic'

// Dynamically import the PDF components to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)

const DiagnosticPDF = dynamic(
  () => import('./DiagnosticPDF'),
  { ssr: false }
)

export default function PDFDownloadButton({ team }: { team: TeamProfile }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return (
    <div className="bg-white/10 text-white/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
      <FileText size={14} /> Brief
    </div>
  )

  return (
    <PDFDownloadLink
      document={<DiagnosticPDF team={team} />}
      fileName={`${team.startupName || 'Startup'}-Brief.pdf`}
      className="bg-white/10 text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
    >
      {({ loading }) => (
        <>
          {loading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
          Brief
        </>
      )}
    </PDFDownloadLink>
  )
}
