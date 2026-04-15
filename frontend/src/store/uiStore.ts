import { create } from 'zustand'

interface UIState {
  activeTab: string
  previewVisible: boolean
  isSaving: boolean
  toast: { message: string, type: 'success' | 'error' } | null
  setActiveTab: (tab: string) => void
  setPreviewVisible: (visible: boolean) => void
  setIsSaving: (saving: boolean) => void
  showToast: (message: string, type?: 'success' | 'error') => void
  hideToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'details',
  previewVisible: true,
  isSaving: false,
  toast: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPreviewVisible: (visible) => set({ previewVisible: visible }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  showToast: (message, type = 'success') => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
}))
