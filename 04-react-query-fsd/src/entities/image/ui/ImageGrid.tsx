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
      className="grid w-full
                 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[24px] px-[24px] pb-[24px]
                 max-[768px]:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-[768px]:gap-[16px] max-[768px]:px-[16px] max-[768px]:pb-[16px]
                 max-[480px]:grid-cols-1 max-[480px]:gap-[8px] max-[480px]:px-[8px] max-[480px]:pb-[8px]"
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
