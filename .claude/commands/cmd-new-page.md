# Create New Page

Create a new Next.js App Router page.

## Arguments
- $1: Route path (required) - e.g., "dashboard", "settings/profile"

## Steps

1. **Create directory structure**
   - Path: `app/$1/`
   - Create folder if not exists

2. **Create page.tsx**
```tsx
export default function ${PageName}Page() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">${PageName}</h1>
      <p className="mt-2 text-muted-foreground">
        Description here
      </p>
      
      <div className="mt-8">
        {/* Content */}
      </div>
    </div>
  )
}
```

3. **Ask if needed**
   - Add loading.tsx?
   - Add error.tsx?
   - Add layout.tsx for this route?

4. **Create loading.tsx** (if yes)
```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container py-8 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
      <Skeleton className="h-64 w-full mt-8" />
    </div>
  )
}
```

5. **Create error.tsx** (if yes)
```tsx
'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container py-8 flex flex-col items-center justify-center min-h-[400px]">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <h2 className="mt-4 text-xl font-semibold">Something went wrong!</h2>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-4">Try again</Button>
    </div>
  )
}
```

6. **Output**: List all created files
