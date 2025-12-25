import { Card, CardContent } from '@/shared/ui/card';
import type { Image } from '@/entities/image/model/types';

interface ImageCardProps {
  image: Image;
}

export function ImageCard({ image }: ImageCardProps) {
  return (
    <Card className="w-full overflow-hidden transition-transform hover:scale-105">
      <CardContent className="p-0">
        <img
          src={image.webformatURL}
          alt={image.tags.join(', ')}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-sm font-semibold mb-2">By {image.user}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>❤️ {image.likes}</span>
            <span>👁️ {image.views}</span>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500">{image.tags[0]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
