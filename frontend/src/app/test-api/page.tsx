import { getAllCars } from '@/lib/api/cars'
import { getAllBrands } from '@/lib/api/brands'
import { getAllPosts } from '@/lib/api/posts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'

async function testAPI() {
  const results = {
    brands: { success: false, data: null as Awaited<ReturnType<typeof getAllBrands>> | null, error: '' },
    cars: { success: false, data: null as Awaited<ReturnType<typeof getAllCars>> | null, error: '' },
    posts: { success: false, data: null as Awaited<ReturnType<typeof getAllPosts>> | null, error: '' },
  }

  try {
    results.brands.data = await getAllBrands()
    results.brands.success = true
  } catch (e) {
    results.brands.error = e instanceof Error ? e.message : 'Unknown error'
  }

  try {
    results.cars.data = await getAllCars({ pageSize: 5 })
    results.cars.success = true
  } catch (e) {
    results.cars.error = e instanceof Error ? e.message : 'Unknown error'
  }

  try {
    results.posts.data = await getAllPosts({ pageSize: 5 })
    results.posts.success = true
  } catch (e) {
    results.posts.error = e instanceof Error ? e.message : 'Unknown error'
  }

  return results
}

export default async function TestAPIPage() {
  const results = await testAPI()
  const allSuccess = results.brands.success && results.cars.success && results.posts.success

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="py-12">
          <h1 className="text-3xl font-bold">API Integration Test</h1>
          <p className="mt-2 text-muted-foreground">
            Testing connection to Strapi CMS at {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}
          </p>

          {!allSuccess && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                Make sure Strapi is running at {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}
                and API permissions are configured.
                <br />
                Run: <code className="bg-muted px-1 rounded">cd backend && npm run develop</code>
              </AlertDescription>
            </Alert>
          )}

          {allSuccess && (
            <Alert className="mt-6 border-green-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700">Connected Successfully</AlertTitle>
              <AlertDescription>
                All API endpoints are responding correctly.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Brands */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Brands</h2>
                {results.brands.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              {results.brands.success ? (
                <>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Found {results.brands.data?.length || 0} brands
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {results.brands.data?.slice(0, 5).map((brand) => (
                      <li key={brand.slug} className="truncate">
                        {brand.name}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-2 text-sm text-red-500">{results.brands.error}</p>
              )}
            </div>

            {/* Cars */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cars</h2>
                {results.cars.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              {results.cars.success ? (
                <>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Found {results.cars.data?.pagination?.total || 0} cars
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {results.cars.data?.data.slice(0, 5).map((car) => (
                      <li key={car.slug} className="truncate">
                        {car.name} - {car.price?.toLocaleString('vi-VN')} VND
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-2 text-sm text-red-500">{results.cars.error}</p>
              )}
            </div>

            {/* Posts */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Posts</h2>
                {results.posts.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              {results.posts.success ? (
                <>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Found {results.posts.data?.pagination?.total || 0} posts
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {results.posts.data?.data.slice(0, 5).map((post) => (
                      <li key={post.slug} className="truncate">
                        {post.title}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-2 text-sm text-red-500">{results.posts.error}</p>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
