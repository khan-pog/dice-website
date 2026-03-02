"use client"

import { useState } from "react"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
        <img
          src={images[selectedIndex]}
          alt={`${name} - Image ${selectedIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === i
                ? "border-primary ring-1 ring-primary/30"
                : "border-border hover:border-muted-foreground"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
