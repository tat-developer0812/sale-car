# Create New Form

Create a form with React Hook Form + Zod validation.

## Arguments
- $1: Form name (required) - e.g., "LoginForm", "ProfileForm"

## Steps

1. **Ask for form fields**
   - What fields are needed?
   - What validation rules?

2. **Create Zod schema**
```tsx
import * as z from 'zod'

export const ${name}Schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  // Add more fields
})

export type ${name}Values = z.infer<typeof ${name}Schema>
```

3. **Create form component** at `components/forms/${name}.tsx`
```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ${name}Schema, type ${name}Values } from '@/lib/schemas/${name}'

interface ${name}Props {
  onSubmit: (values: ${name}Values) => Promise<void>
  defaultValues?: Partial<${name}Values>
}

export function ${name}({ onSubmit, defaultValues }: ${name}Props) {
  const form = useForm<${name}Values>({
    resolver: zodResolver(${name}Schema),
    defaultValues: defaultValues ?? {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (values: ${name}Values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
```

4. **Ensure dependencies installed**
```bash
npm install @hookform/resolvers zod react-hook-form
npx shadcn@latest add form input label
```

5. **Output**: List created files with usage example
