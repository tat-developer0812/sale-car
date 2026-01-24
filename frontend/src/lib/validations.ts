import { z } from 'zod'

// Vietnamese phone number regex (10-11 digits, starting with 0)
const phoneRegex = /^0[0-9]{9,10}$/

export const quickContactSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
    .regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  carId: z.number().optional(),
  carName: z.string().optional(),
  source: z.string().optional(),
})

export const testDriveSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
    .regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  carId: z.number(),
  carName: z.string(),
  preferredDate: z.string().min(1, 'Vui lòng chọn ngày'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    message: 'Vui lòng chọn thời gian',
  }),
  location: z.string().optional(),
  message: z.string().optional(),
})

export const quoteSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
    .regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  carId: z.number(),
  carName: z.string(),
  province: z.string().optional(),
  paymentMethod: z.enum(['cash', 'loan', 'undecided']).optional(),
  message: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
    .regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  subject: z.string().min(1, 'Vui lòng chọn chủ đề'),
  message: z.string().min(10, 'Vui lòng nhập nội dung tin nhắn (ít nhất 10 ký tự)'),
})

export type QuickContactInput = z.infer<typeof quickContactSchema>
export type TestDriveInput = z.infer<typeof testDriveSchema>
export type QuoteInput = z.infer<typeof quoteSchema>
export type ContactInput = z.infer<typeof contactSchema>
