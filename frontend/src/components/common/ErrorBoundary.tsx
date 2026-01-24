'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <h2 className="mt-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mt-2 text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  )
}
