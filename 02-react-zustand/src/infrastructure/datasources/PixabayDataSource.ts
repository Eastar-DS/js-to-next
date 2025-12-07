/**
 * PixabayDataSource
 * Pixabay API와 통신하여 DTO 형태의 데이터를 반환하는 Data Source
 */

import type { PixabayApiResponseDto } from './dto/PixabayDto';
import { isPixabayApiResponseDto } from './dto/PixabayDto';

/**
 * Pixabay API와 통신하는 DataSource 클래스
 * HTTP 요청을 담당하고 DTO 형태로 데이터를 반환합니다.
 */
export class PixabayDataSource {
  private readonly apiKey: string;

  private readonly baseUrl = 'https://pixabay.com/api/';

  private readonly perPage = 20; // 페이지당 결과 수

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * 이미지 검색 (첫 페이지)
   * @param query - 검색 쿼리
   * @returns Promise<PixabayApiResponseDto> - API 응답 DTO
   */
  async search(query: string): Promise<PixabayApiResponseDto> {
    return this.getByPage(query, 1);
  }

  /**
   * 페이지별 이미지 조회
   * @param query - 검색 쿼리
   * @param page - 페이지 번호 (1부터 시작)
   * @returns Promise<PixabayApiResponseDto> - API 응답 DTO
   */
  async getByPage(query: string, page: number): Promise<PixabayApiResponseDto> {
    const url = this.buildUrl(query, page);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Pixabay API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // DTO 타입 검증
    if (!isPixabayApiResponseDto(data)) {
      throw new Error('Invalid Pixabay API response format');
    }

    return data;
  }

  /**
   * API URL 생성
   * @param query - 검색 쿼리
   * @param page - 페이지 번호
   * @returns string - 완성된 API URL
   */
  private buildUrl(query: string, page: number): string {
    const params = new URLSearchParams({
      key: this.apiKey,
      q: query,
      page: page.toString(),
      per_page: this.perPage.toString(),
      image_type: 'photo',
    });

    return `${this.baseUrl}?${params.toString()}`;
  }
}
