/**
 * 예제 도메인 엔티티
 * Clean Architecture path alias (@domain/*) 테스트용 파일
 */

export interface ExampleEntity {
  id: string;
  name: string;
}

export const createExampleEntity = (name: string): ExampleEntity => ({
  id: crypto.randomUUID(),
  name,
});
