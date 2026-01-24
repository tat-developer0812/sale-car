import { useQuery } from '@tanstack/react-query'
import { getAllBrands, getBrandBySlug } from '@/lib/api/brands'

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrands,
  })
}

export function useBrand(slug: string) {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: () => getBrandBySlug(slug),
    enabled: !!slug,
  })
}
