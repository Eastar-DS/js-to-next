/**
 * Jest + TypeScript 설정 검증 테스트
 * 테스트 환경이 정상적으로 작동하는지 확인합니다
 */

describe('Jest + TypeScript 설정 검증', () => {
  test('TypeScript가 정상적으로 작동함', () => {
    const sum = (a: number, b: number): number => a + b;
    expect(sum(1, 2)).toBe(3);
  });

  test('@testing-library/jest-dom이 정상적으로 로드됨', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello World';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();

    // 정리
    document.body.removeChild(element);
  });

  test('Jest 설정이 정상적으로 작동함', () => {
    expect(true).toBe(true);
  });
});
