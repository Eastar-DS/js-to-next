/**
 * Image 엔티티
 * Pixabay API 응답 데이터를 나타내는 도메인 엔티티
 */

/**
 * Image 엔티티 인터페이스
 * Pixabay API의 hits 배열 각 항목 구조
 */
export interface Image {
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
 * 타입 가드 함수: 객체가 유효한 Image 타입인지 검증
 * @param value - 검증할 값
 * @returns Image 타입 여부
 */
export function isImage(value: unknown): value is Image {
  // null 또는 undefined 체크
  if (value == null) {
    return false;
  }

  // 객체 타입 체크
  if (typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;

  // 필수 필드 검증
  return (
    typeof obj.id === 'number' &&
    typeof obj.tags === 'string' &&
    typeof obj.previewURL === 'string' &&
    typeof obj.largeImageURL === 'string' &&
    typeof obj.user === 'string' &&
    typeof obj.likes === 'number' &&
    typeof obj.views === 'number' &&
    typeof obj.downloads === 'number'
  );
}

/**
 * Image 엔티티 팩토리 함수
 * 외부 데이터로부터 유효한 Image 엔티티 생성
 * @param data - 이미지 데이터
 * @returns Image 엔티티
 * @throws {Error} 유효하지 않은 데이터인 경우
 */
export function createImage(data: unknown): Image {
  // 타입 가드를 사용한 유효성 검증
  if (!isImage(data)) {
    throw new Error('Invalid image data');
  }

  // 유효한 Image 엔티티 반환
  return data;
}
