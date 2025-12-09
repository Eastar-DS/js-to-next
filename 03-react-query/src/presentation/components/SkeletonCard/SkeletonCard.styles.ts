/**
 * SkeletonCard 스타일 컴포넌트
 * Presentation Layer - SkeletonCard Styled Components
 */

import styled, { keyframes } from 'styled-components';

/**
 * 펄스 애니메이션 정의
 */
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const SkeletonCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.hover};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SkeletonInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonLine = styled.div<{ width?: string }>`
  height: 12px;
  width: ${({ width }) => width || '100%'};
  background-color: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SkeletonStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;
