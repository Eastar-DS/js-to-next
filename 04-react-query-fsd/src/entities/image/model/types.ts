// Pixabay API 응답 구조 (DTO)
export interface ImageDTO {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

// 도메인 모델 (필요한 필드만)
export interface Image {
  id: number;
  tags: string[];
  previewURL: string;
  webformatURL: string;
  largeImageURL: string;
  user: string;
  likes: number;
  views: number;
  downloads: number;
}

// Pixabay API 응답 타입
export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: ImageDTO[];
}

// DTO를 도메인 모델로 변환
export function toImage(dto: ImageDTO): Image {
  return {
    id: dto.id,
    tags: dto.tags.split(',').map((tag) => tag.trim()),
    previewURL: dto.previewURL,
    webformatURL: dto.webformatURL,
    largeImageURL: dto.largeImageURL,
    user: dto.user,
    likes: dto.likes,
    views: dto.views,
    downloads: dto.downloads,
  };
}

// 배치 변환
export function toImages(dtos: ImageDTO[]): Image[] {
  return dtos.map(toImage);
}

// 타입 가드
export function isImage(obj: unknown): obj is Image {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const image = obj as Record<string, unknown>;

  return (
    typeof image.id === 'number' &&
    Array.isArray(image.tags) &&
    typeof image.previewURL === 'string' &&
    typeof image.webformatURL === 'string' &&
    typeof image.largeImageURL === 'string' &&
    typeof image.user === 'string' &&
    typeof image.likes === 'number' &&
    typeof image.views === 'number' &&
    typeof image.downloads === 'number'
  );
}
