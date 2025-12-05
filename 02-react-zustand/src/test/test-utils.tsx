/**
 * 테스트 유틸리티 함수
 * React Testing Library를 확장한 커스텀 렌더 함수 및 헬퍼
 */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * 기본 렌더 함수 (추후 Provider 등으로 확장 가능)
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
