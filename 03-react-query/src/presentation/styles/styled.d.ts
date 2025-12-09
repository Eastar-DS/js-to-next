/**
 * Styled Components TypeScript 타입 확장
 * DefaultTheme을 우리의 Theme 타입으로 확장
 */

import 'styled-components';
import type { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
