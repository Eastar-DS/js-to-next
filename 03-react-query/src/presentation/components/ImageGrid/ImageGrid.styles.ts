/**
 * ImageGrid 스타일 컴포넌트
 * Presentation Layer - ImageGrid Styled Components
 */

import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
    padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: 0 ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  }
`;
