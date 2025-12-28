import type { Image } from '@/entities/image/model/types';

interface ImageCardProps {
  image: Image;
}

const formatNumber = (num: number): string => num.toLocaleString('en-US');

export function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-[8px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[ease] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:-translate-y-[4px] cursor-pointer">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f8f9fa]">
        <img
          src={image.previewURL}
          alt={image.tags.join(', ')}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-[ease] group-hover:scale-105"
        />
      </div>
      <div className="p-[16px] flex flex-col gap-[8px]">
        <p className="m-0 text-[12px] font-medium text-[#2c3e50]">
          by {image.user}
        </p>
        <div className="flex gap-[16px] items-center">
          <span className="text-[12px] text-[#7f8c8d] flex items-center gap-[4px]">
            👁️ {formatNumber(image.views)}
          </span>
          <span className="text-[12px] text-[#7f8c8d] flex items-center gap-[4px]">
            ⬇️ {formatNumber(image.downloads)}
          </span>
          <span className="text-[12px] text-[#7f8c8d] flex items-center gap-[4px]">
            ❤️ {formatNumber(image.likes)}
          </span>
        </div>
      </div>
    </div>
  );
}
