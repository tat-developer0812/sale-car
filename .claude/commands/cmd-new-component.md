# Create New Component

Create a new React/Next.js component with TypeScript.

## Arguments
- $1: Component name (required)
- $2: Component type - "client" or "server" (optional, default: server)

## Steps

1. **Determine component location**
   - If name contains "/" → use as path (e.g., "forms/LoginForm")
   - Otherwise → place in `components/` folder

2. **Ask if not specified**
   - Client or Server component?
   - Need props interface?
   - Need children prop?

3. **Create the component file**

### Server Component Template
```tsx
interface ${name}Props {
  // Add props here
}

export function ${name}({ }: ${name}Props) {
  return (
    <div>
      <h1>${name}</h1>
    </div>
  )
}
```

### Client Component Template
```tsx
'use client'

import { useState } from 'react'

interface ${name}Props {
  // Add props here
}

export function ${name}({ }: ${name}Props) {
  return (
    <div>
      <h1>${name}</h1>
    </div>
  )
}
```

4. **Output**: Confirm file created with path
