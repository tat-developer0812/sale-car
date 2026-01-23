# Add Toast Notifications

Add toast notification system using shadcn/ui.

## Steps

1. **Install toast component**
```bash
npx shadcn@latest add toast
```

2. **Add Toaster to layout** `app/layout.tsx`
```tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

3. **Usage examples**

### Basic toast
```tsx
'use client'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Success',
          description: 'Your action was completed.',
        })
      }}
    >
      Show Toast
    </Button>
  )
}
```

### Toast variants
```tsx
// Success
toast({
  title: 'Success!',
  description: 'Changes saved successfully.',
})

// Error
toast({
  variant: 'destructive',
  title: 'Error',
  description: 'Something went wrong. Please try again.',
})

// With action
toast({
  title: 'File deleted',
  description: 'The file has been moved to trash.',
  action: (
    <ToastAction altText="Undo" onClick={() => handleUndo()}>
      Undo
    </ToastAction>
  ),
})
```

### In async functions
```tsx
async function handleSubmit(data: FormData) {
  try {
    await saveData(data)
    toast({
      title: 'Saved!',
      description: 'Your changes have been saved.',
    })
  } catch (error) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to save changes.',
    })
  }
}
```

### In Server Actions
```tsx
// actions/create-post.ts
'use server'

export async function createPost(data: FormData) {
  // ... create post
  return { success: true, message: 'Post created!' }
}

// Component
'use client'

import { createPost } from '@/actions/create-post'

function CreatePostForm() {
  const { toast } = useToast()

  async function onSubmit(data: FormData) {
    const result = await createPost(data)
    
    if (result.success) {
      toast({ title: 'Success', description: result.message })
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message })
    }
  }

  return <form action={onSubmit}>...</form>
}
```

4. **Custom toast wrapper (optional)**
```tsx
// lib/toast.ts
import { toast as baseToast } from '@/hooks/use-toast'

export const toast = {
  success: (message: string) => baseToast({ title: 'Success', description: message }),
  error: (message: string) => baseToast({ variant: 'destructive', title: 'Error', description: message }),
  info: (message: string) => baseToast({ title: 'Info', description: message }),
}

// Usage
import { toast } from '@/lib/toast'
toast.success('Saved!')
toast.error('Failed!')
```

## Output
Confirm toast is set up and show usage example.
