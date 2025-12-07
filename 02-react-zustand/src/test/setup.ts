/**
 * Jest 테스트 환경 설정 파일
 * 모든 테스트 실행 전에 자동으로 로드됩니다
 */

import '@testing-library/jest-dom';

// React 19 및 Testing Library를 위한 전역 설정
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
};

// console 경고 억제 (필요한 경우)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
