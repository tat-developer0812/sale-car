import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ThumbsUp, ThumbsDown, Star } from 'lucide-react'

interface CarFeaturesProps {
  features?: Record<string, unknown>
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  fullDescription?: string
}

export function CarFeatures({
  features,
  highlights,
  pros,
  cons,
  fullDescription,
}: CarFeaturesProps) {
  const hasFeatures = features && Object.keys(features).length > 0
  const hasHighlights = highlights && highlights.length > 0
  const hasPros = pros && pros.length > 0
  const hasCons = cons && cons.length > 0
  const hasDescription = fullDescription && fullDescription.trim().length > 0

  if (!hasFeatures && !hasHighlights && !hasPros && !hasCons && !hasDescription) {
    return null
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Description */}
      {hasDescription && (
        <Card>
          <CardHeader>
            <CardTitle>Giới thiệu</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            />
          </CardContent>
        </Card>
      )}

      {/* Highlights */}
      {hasHighlights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Điểm nổi bật
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {highlight}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pros and Cons */}
      {(hasPros || hasCons) && (
        <div className="grid gap-6 md:grid-cols-2">
          {hasPros && (
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ThumbsUp className="h-5 w-5" />
                  Ưu điểm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {hasCons && (
            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <ThumbsDown className="h-5 w-5" />
                  Nhược điểm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 h-4 w-4 flex-shrink-0 text-center text-red-500">
                        •
                      </span>
                      {con}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Features Grid */}
      {hasFeatures && (
        <Card>
          <CardHeader>
            <CardTitle>Trang bị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(features).map(([category, items]) => {
                if (!Array.isArray(items) || items.length === 0) return null

                return (
                  <div key={category} className="rounded-lg border p-4">
                    <h4 className="mb-3 font-semibold capitalize">
                      {category.replace(/_/g, ' ')}
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {(items as string[]).map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
