'use client'

import dynamic from 'next/dynamic'

// All client-only widgets — ssr:false prevents hydration mismatches.
const FloatingPhone = dynamic(
  () => import('./FloatingPhone').then((m) => m.FloatingPhone),
  { ssr: false }
)
const ZaloButton = dynamic(
  () => import('./ZaloButton').then((m) => m.ZaloButton),
  { ssr: false }
)
const MobileBottomBar = dynamic(
  () => import('./MobileBottomBar').then((m) => m.MobileBottomBar),
  { ssr: false }
)
const StickyContactModal = dynamic(
  () => import('./StickyContactModal').then((m) => m.StickyContactModal),
  { ssr: false }
)
const ExitIntent = dynamic(
  () => import('./ExitIntent').then((m) => m.ExitIntent),
  { ssr: false }
)
const Toaster = dynamic(
  () => import('@/components/ui/sonner').then((m) => m.Toaster),
  { ssr: false }
)

export function LazyWidgets() {
  return (
    <>
      <FloatingPhone />
      <ZaloButton />
      <MobileBottomBar />
      <StickyContactModal />
      <ExitIntent />
      <Toaster />
    </>
  )
}
