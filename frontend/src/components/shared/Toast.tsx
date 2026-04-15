import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl animate-in slide-in-from-right-10 duration-300",
      type === 'success' 
        ? "bg-white/80 backdrop-blur-md border-teal/20 text-navy" 
        : "bg-white/80 backdrop-blur-md border-coral/20 text-navy"
    )}>
      {type === 'success' ? (
        <CheckCircle2 className="text-teal" size={18} />
      ) : (
        <AlertCircle className="text-coral" size={18} />
      )}
      
      <span className="text-[11px] font-bold tracking-tight">{message}</span>
      
      <button 
        onClick={onClose}
        className="ml-2 hover:bg-smoke p-1 rounded-md transition-all"
      >
        <X size={14} className="text-silver" />
      </button>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-silver/10 overflow-hidden rounded-b-xl">
        <div className={cn(
          "h-full animate-progress",
          type === 'success' ? "bg-teal" : "bg-coral"
        )}></div>
      </div>
    </div>
  )
}
