# Cleanup Project

Find and remove unused code, imports, and files.

## Steps

### 1. Find Unused Imports
```bash
# Search for potential unused imports
npx eslint . --ext .ts,.tsx --rule '{"@typescript-eslint/no-unused-vars": "warn"}'
```

Look for patterns:
```tsx
// ❌ Unused import
import { Button } from '@/components/ui/button'  // Button not used below

// ❌ Unused destructured import
import { useState, useEffect } from 'react'  // useEffect not used
```

### 2. Find Unused Variables
```tsx
// ❌ Unused variable
const data = fetchData()  // never used

// ❌ Unused function
function helper() {}  // never called

// ❌ Unused parameter
function onClick(event) {  // event not used
  console.log('clicked')
}
// ✅ Fix: prefix with underscore
function onClick(_event) {
```

### 3. Find Unused Components
Search for component files that are never imported:
```bash
# List all component files
find components -name "*.tsx" -type f

# For each, search if it's imported anywhere
grep -r "from.*ComponentName" --include="*.tsx" --include="*.ts"
```

### 4. Find Unused CSS Classes
```bash
# Search for Tailwind classes that might be unused
# (manual review needed for dynamic classes)
```

### 5. Find Empty/Stub Files
Look for files with only:
- Empty exports
- TODO comments
- Placeholder content

### 6. Common Cleanup Actions

**Remove unused imports:**
```tsx
// Before
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Only useState and Button are used

// After
import { useState } from 'react'
import { Button } from '@/components/ui/button'
```

**Remove console.logs:**
```bash
# Find console.logs
grep -r "console.log" --include="*.tsx" --include="*.ts" src/
```

**Remove commented code:**
```tsx
// ❌ Old commented code
// function oldFunction() {
//   return something
// }

// ✅ Remove it entirely (use git for history)
```

**Remove unused dependencies:**
```bash
# Check package.json for unused packages
npx depcheck
```

### 7. Auto-fix with ESLint
```bash
# Auto-fix what's possible
npx eslint . --ext .ts,.tsx --fix

# Format with Prettier
npx prettier --write .
```

### 8. Organize Imports
```tsx
// ✅ Organized import order:
// 1. React/Next
import { useState } from 'react'
import Link from 'next/link'

// 2. Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Local components
import { Button } from '@/components/ui/button'

// 4. Local utilities/types
import { cn } from '@/lib/utils'
import type { User } from '@/types'
```

## Output Format
```markdown
## Cleanup Report

### Unused Imports Found
- `file.tsx`: removed `useEffect`, `Card`
- `page.tsx`: removed `useState`

### Unused Files Found
- `components/old-component.tsx` - not imported anywhere
- `lib/deprecated.ts` - not imported anywhere

### Console.logs Found
- `api/route.ts:15` - `console.log(data)`
- `components/form.tsx:42` - `console.log(error)`

### Actions Taken
- [x] Removed 12 unused imports
- [x] Removed 3 console.logs
- [x] Deleted 2 unused files
- [ ] Review: `components/utils.tsx` - may be unused

### Recommendations
- Consider removing package `lodash` (not used)
- File `types/old.ts` appears unused
```
