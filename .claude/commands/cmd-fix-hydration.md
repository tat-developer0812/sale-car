# Fix Hydration Errors

Diagnose and fix React hydration mismatch errors.

## Common Causes & Solutions

### 1. Date/Time Rendering
```tsx
// ❌ Causes hydration error (server/client time different)
<p>{new Date().toLocaleString()}</p>

// ✅ Fix: Use useEffect
'use client'
import { useState, useEffect } from 'react'

function DateTime() {
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    setDate(new Date().toLocaleString())
  }, [])

  return <p>{date}</p>
}
```

### 2. Random Values
```tsx
// ❌ Causes hydration error
<p>ID: {Math.random()}</p>

// ✅ Fix: Generate in useEffect or use stable ID
const [id, setId] = useState<string>('')
useEffect(() => {
  setId(crypto.randomUUID())
}, [])
```

### 3. Browser-only APIs
```tsx
// ❌ Causes hydration error
<p>Width: {window.innerWidth}</p>

// ✅ Fix: Check if window exists or use useEffect
const [width, setWidth] = useState(0)
useEffect(() => {
  setWidth(window.innerWidth)
}, [])
```

### 4. localStorage/sessionStorage
```tsx
// ❌ Causes hydration error
const theme = localStorage.getItem('theme')

// ✅ Fix: Use useEffect
const [theme, setTheme] = useState('light')
useEffect(() => {
  setTheme(localStorage.getItem('theme') || 'light')
}, [])
```

### 5. User Agent / Device Detection
```tsx
// ❌ Causes hydration error
const isMobile = navigator.userAgent.includes('Mobile')

// ✅ Fix: Use useEffect or CSS media queries
const [isMobile, setIsMobile] = useState(false)
useEffect(() => {
  setIsMobile(window.innerWidth < 768)
}, [])
```

### 6. Third-party Scripts/Extensions
```tsx
// Extensions may inject elements causing mismatch
// ✅ Fix: Add suppressHydrationWarning to html/body

// app/layout.tsx
<html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
```

### 7. Conditional Rendering based on Client State
```tsx
// ❌ Different output server vs client
{isLoggedIn && <UserMenu />}

// ✅ Fix: Ensure initial state matches server
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])

if (!mounted) return null // or skeleton
return isLoggedIn ? <UserMenu /> : null
```

### 8. Dynamic Imports for Client-only Components
```tsx
// ✅ For components that can't run on server
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <Skeleton className="h-64" />,
})
```

## Debugging Steps

1. **Read the error message** - It usually tells which element mismatched

2. **Check for**:
   - Date/time usage
   - Random values
   - window/document/navigator
   - localStorage/sessionStorage
   - Conditional rendering

3. **Add console logs** to compare server vs client output

4. **Use React DevTools** to inspect component tree

## Quick Fix Template
```tsx
'use client'

import { useState, useEffect } from 'react'

export function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div> // or Skeleton
  }

  return (
    <div>
      {/* Safe to use browser APIs here */}
    </div>
  )
}
```

## Output
List the identified cause and applied fix.
