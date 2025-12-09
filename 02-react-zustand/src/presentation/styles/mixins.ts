/**
 * Styled Components Mixins
 * Reusable style patterns
 */

import { css } from 'styled-components';

/**
 * Transition mixins
 * Common transition animations
 */
export const transitions = {
  /** Default transition (0.2s) */
  default: css`
    transition: all 0.2s ease;
  `,
  /** Slow transition (0.3s) */
  slow: css`
    transition: all 0.3s ease;
  `,
  /** Transform-only transition */
  transform: css`
    transition: transform 0.3s ease;
  `,
  /** Color-only transition */
  color: css`
    transition: color 0.2s ease;
  `,
};

/**
 * Card container styles
 * Used in ImageCard, SkeletonCard, etc.
 */
export const cardContainer = css`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

/**
 * Button state styles
 * Handles hover, active, and disabled states
 */
export const buttonStates = css`
  cursor: pointer;
  ${transitions.default}

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

/**
 * Flexbox layout mixins
 */
export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * Responsive grid mixin
 */
export const responsiveGrid = (minWidth = '280px') => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minWidth}, 1fr));
`;

/**
 * Text ellipsis mixin
 */
export const textEllipsis = (lines = 1) =>
  lines === 1
    ? css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `
    : css`
        display: -webkit-box;
        -webkit-line-clamp: ${lines};
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      `;

/**
 * Absolute center positioning
 */
export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/**
 * Custom scrollbar styles
 */
export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.border};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
