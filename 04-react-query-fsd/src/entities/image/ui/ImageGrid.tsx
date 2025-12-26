import { ImageCard } from '@/entities/image/ui/ImageCard';
import type { Image } from '@/entities/image/model/types';

interface ImageGridProps {
  images: Image[];
}

export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-semibold mb-2">No images found</p>
        <p className="text-sm">Try searching for something</p>
      </div>
    );
  }

  return (
    <div
      data-testid="image-grid"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
