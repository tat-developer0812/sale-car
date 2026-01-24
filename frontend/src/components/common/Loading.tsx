export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
    </div>
  )
}
