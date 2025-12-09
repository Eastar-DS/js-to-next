/**
 * ErrorMessage 컴포넌트
 * Presentation Layer - Error Message Component
 */

import type { ErrorMessageProps } from '@presentation/components/types';
import {
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  RetryButton,
} from './ErrorMessage.styles';

/**
 * 에러 메시지 컴포넌트
 * 에러 발생 시 메시지와 재시도 버튼을 표시합니다.
 */
export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <ErrorContainer role="alert">
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorText>{message}</ErrorText>
    {onRetry && <RetryButton onClick={onRetry}>다시 시도</RetryButton>}
  </ErrorContainer>
);
