/**
 * Query Key 팩토리 테스트
 * Application Layer - React Query Query Keys
 */

import { imageKeys } from '@application/queries/queryKeys';

describe('Query Key 팩토리', () => {
  describe('imageKeys', () => {
    it('all 메서드는 모든 이미지 쿼리의 베이스 키를 반환해야 함', () => {
      const key = imageKeys.all;

      expect(key).toEqual(['images']);
    });

    it('list 메서드는 특정 검색어의 이미지 목록 키를 반환해야 함', () => {
      const query = 'cats';
      const key = imageKeys.list(query);

      expect(key).toEqual(['images', 'list', { query }]);
    });

    it('page 메서드는 특정 검색어와 페이지의 키를 반환해야 함', () => {
      const query = 'dogs';
      const page = 2;
      const key = imageKeys.page(query, page);

      expect(key).toEqual(['images', 'page', { query, page }]);
    });

    it('동일한 파라미터로 호출 시 동일한 키를 반환해야 함 (참조 동일성)', () => {
      const query = 'birds';
      const page = 3;

      const key1 = imageKeys.page(query, page);
      const key2 = imageKeys.page(query, page);

      expect(key1).toEqual(key2);
    });

    it('다른 파라미터로 호출 시 다른 키를 반환해야 함', () => {
      const key1 = imageKeys.page('cats', 1);
      const key2 = imageKeys.page('dogs', 1);
      const key3 = imageKeys.page('cats', 2);

      expect(key1).not.toEqual(key2);
      expect(key1).not.toEqual(key3);
      expect(key2).not.toEqual(key3);
    });
  });
});
