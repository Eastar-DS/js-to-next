/**
 * Pixabay API DTO (Data Transfer Object)
 * API 응답 구조를 나타내는 타입 정의
 */

/**
 * Pixabay API에서 반환하는 개별 이미지 객체의 DTO
 */
export interface PixabayImageDto {
  id: number;
  tags: string;
  previewURL: string;
  largeImageURL: string;
  user: string;
  likes: number;
  views: number;
  downloads: number;
}

/**
 * Pixabay API 전체 응답의 DTO
 */
export interface PixabayApiResponseDto {
  total: number;
  totalHits: number;
  hits: PixabayImageDto[];
}

/**
 * PixabayImageDto 타입 가드 함수
 * 런타임에 객체가 올바른 DTO 구조인지 검증합니다.
 */
export function isPixabayImageDto(obj: unknown): obj is PixabayImageDto {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto.id === 'number' &&
    typeof dto.tags === 'string' &&
    typeof dto.previewURL === 'string' &&
    typeof dto.largeImageURL === 'string' &&
    typeof dto.user === 'string' &&
    typeof dto.likes === 'number' &&
    typeof dto.views === 'number' &&
    typeof dto.downloads === 'number'
  );
}

/**
 * PixabayApiResponseDto 타입 가드 함수
 * 런타임에 객체가 올바른 API 응답 구조인지 검증합니다.
 */
export function isPixabayApiResponseDto(
  obj: unknown
): obj is PixabayApiResponseDto {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const response = obj as Record<string, unknown>;

  // total, totalHits 필드 검증
  if (
    typeof response.total !== 'number' ||
    typeof response.totalHits !== 'number'
  ) {
    return false;
  }

  // hits 배열 검증
  if (!Array.isArray(response.hits)) {
    return false;
  }

  // hits 배열의 모든 요소가 PixabayImageDto인지 검증
  return response.hits.every((hit) => isPixabayImageDto(hit));
}
