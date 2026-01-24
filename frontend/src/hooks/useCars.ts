import { useQuery } from '@tanstack/react-query'
import { getAllCars, getCarBySlug, GetCarsParams } from '@/lib/api/cars'

export function useCars(params?: GetCarsParams) {
  return useQuery({
    queryKey: ['cars', params],
    queryFn: () => getAllCars(params),
  })
}

export function useCar(slug: string) {
  return useQuery({
    queryKey: ['car', slug],
    queryFn: () => getCarBySlug(slug),
    enabled: !!slug,
  })
}
