# Plan 08: Forms & Lead Capture UI

**Duration**: Days 22-24
**Phase**: Lead Capture
**Prerequisites**: Plans 01-07 completed

---

## 🎯 Goals

- Create contact forms with validation
- Quick contact form (phone priority)
- Test drive request form
- Get quote form
- Form validation with Zod
- Success/error states

---

## 📋 Tasks

### Zod Validation Schemas

Create `src/lib/validations.ts`:
```typescript
import { z } from 'zod'

export const quickContactSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Invalid phone number'),
  name: z.string().optional(),
  carId: z.number(),
  carName: z.string(),
})

export const testDriveSchema = z.object({
  phone: z.string().min(10).regex(/^[0-9]+$/),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email().optional(),
  carId: z.number(),
  preferredDate: z.string(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
})

export const quoteSchema = z.object({
  phone: z.string().min(10).regex(/^[0-9]+$/),
  name: z.string().min(2),
  email: z.string().email().optional(),
  carId: z.number(),
  message: z.string().optional(),
})

export type QuickContactInput = z.infer<typeof quickContactSchema>
export type TestDriveInput = z.infer<typeof testDriveSchema>
export type QuoteInput = z.infer<typeof quoteSchema>
```

### Quick Contact Form

Create `src/components/forms/QuickContact.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quickContactSchema, QuickContactInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export function QuickContact({ carId, carName }: { carId: number; carName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuickContactInput>({
    resolver: zodResolver(quickContactSchema),
    defaultValues: { carId, carName },
  })

  const onSubmit = async (data: QuickContactInput) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Thank you! We will call you back within 5 minutes.')
        reset()
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      toast.error('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          {...register('phone')}
          id="phone"
          type="tel"
          placeholder="0909 123 456"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          {...register('name')}
          id="name"
          placeholder="Your name"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
      </Button>
    </form>
  )
}
```

Create similar forms:
- TestDriveForm.tsx
- QuoteForm.tsx
- ContactForm.tsx (for /contact page)

**✅ Completion**: All forms created with validation

---

## ➡️ Next Steps

Proceed to **Plan 09: Lead Processing Backend**

**Status**: ✅ Completed
