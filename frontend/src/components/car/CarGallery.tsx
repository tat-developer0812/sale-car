'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StrapiImage } from '@/types/strapi'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

// Strapi v5 compatible types
type ImageRelation = StrapiImage | { data: { id: number; attributes: StrapiImage } | null } | null
type GalleryRelation = StrapiImage[] | { data: Array<{ id: number; attributes: StrapiImage }> | null } | null

interface CarGalleryProps {
  mainImage: ImageRelation
  gallery?: GalleryRelation
  carName: string
}

// Helper to extract image data from v4 or v5 format
function resolveUploadUrl(rawUrl: string): string {
  // External URL (not localhost)
  if (rawUrl.startsWith('http') && !rawUrl.includes('localhost') && !rawUrl.includes('127.0.0.1')) {
    return rawUrl
  }
  // Strapi uploads -> use proxy
  if (rawUrl.startsWith('/uploads/')) {
    return `/strapi-uploads${rawUrl.replace('/uploads', '')}`
  }
  if (rawUrl.includes('/uploads/')) {
    const uploadsPath = rawUrl.substring(rawUrl.indexOf('/uploads/') + '/uploads'.length)
    return `/strapi-uploads${uploadsPath}`
  }
  return rawUrl
}

function extractImageData(image: ImageRelation, carName: string): { id: number; url: string; alt: string } | null {
  if (!image) return null

  // Strapi v5 format: direct image object
  if ('url' in image && image.url) {
    return {
      id: image.id || 0,
      url: resolveUploadUrl(image.url),
      alt: image.alternativeText || carName,
    }
  }

  // Strapi v4 format: nested data.attributes
  if ('data' in image && image.data) {
    return {
      id: image.data.id,
      url: resolveUploadUrl(image.data.attributes.url),
      alt: image.data.attributes.alternativeText || carName,
    }
  }

  return null
}

export function CarGallery({ mainImage, gallery, carName }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Combine main image with gallery
  const allImages: { id: number; url: string; alt: string }[] = []

  // Handle main image
  const mainImageData = extractImageData(mainImage, carName)
  if (mainImageData) {
    allImages.push(mainImageData)
  }

  // Handle gallery - could be v4 or v5 format
  if (gallery) {
    // Strapi v5 format: direct array of images
    if (Array.isArray(gallery)) {
      gallery.forEach((img, index) => {
        allImages.push({
          id: img.id || index,
          url: resolveUploadUrl(img.url),
          alt: img.alternativeText || carName,
        })
      })
    }
    // Strapi v4 format: nested data array
    else if ('data' in gallery && gallery.data) {
      gallery.data.forEach((img) => {
        allImages.push({
          id: img.id,
          url: resolveUploadUrl(img.attributes.url),
          alt: img.attributes.alternativeText || carName,
        })
      })
    }
  }

  if (allImages.length === 0) {
    return (
      <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Không có hình ảnh</span>
      </div>
    )
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={allImages[selectedIndex].url}
            alt={allImages[selectedIndex].alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
            <ZoomIn className="h-10 w-10 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
            {selectedIndex + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                  selectedIndex === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-muted-foreground/50'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl border-none bg-black/95 p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={allImages[selectedIndex].url}
              alt={allImages[selectedIndex].alt}
              fill
              className="object-contain"
            />

            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/50 px-3 py-1 text-white">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
