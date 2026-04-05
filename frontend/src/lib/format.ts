import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

/**
 * Format price in VND — uses regex to avoid Intl.NumberFormat locale variance
 * between Node.js (server) and browser (client).
 * e.g. 1500000 → "1.500.000 ₫"
 */
export function formatPrice(price: number): string {
  const formatted = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formatted} ₫`
}

/**
 * Format date using date-fns (consistent server/client output).
 * e.g. "15 tháng 3, 2026"
 */
export function formatDate(date: string | Date): string {
  try {
    return format(new Date(date), "d 'tháng' M, yyyy", { locale: vi })
  } catch {
    return ''
  }
}

/**
 * Format number with Vietnamese thousand separators (dots).
 * e.g. 1000000 → "1.000.000"
 */
export function formatNumber(num: number): string {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Generate slug from Vietnamese text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
