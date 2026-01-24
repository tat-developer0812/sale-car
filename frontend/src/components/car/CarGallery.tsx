'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StrapiImage } from '@/types/strapi'
import { getStrapiImageUrl } from '@/lib/strapi'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarGalleryProps {
  mainImage: { data: { id: number; attributes: StrapiImage } | null }
  gallery?: { data: Array<{ id: number; attributes: StrapiImage }> | null }
  carName: string
}

export function CarGallery({ mainImage, gallery, carName }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Combine main image with gallery
  const allImages: { id: number; url: string; alt: string }[] = []

  if (mainImage?.data) {
    const url = getStrapiImageUrl(mainImage)
    if (url) {
      allImages.push({
        id: mainImage.data.id,
        url,
        alt: mainImage.data.attributes.alternativeText || carName,
      })
    }
  }

  if (gallery?.data) {
    gallery.data.forEach((img) => {
      const url = img.attributes.url.startsWith('http')
        ? img.attributes.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${img.attributes.url}`
      allImages.push({
        id: img.id,
        url,
        alt: img.attributes.alternativeText || carName,
      })
    })
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
