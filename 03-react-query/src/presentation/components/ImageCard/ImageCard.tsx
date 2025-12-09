/**
 * ImageCard 컴포넌트
 * Presentation Layer - Image Card Component
 */

import type { ImageCardProps } from '@presentation/components/types';
import {
  Card,
  ImageContainer,
  StyledImage,
  InfoContainer,
  UserName,
  StatsContainer,
  StatItem,
} from './ImageCard.styles';

/**
 * 숫자를 천단위 구분자로 포맷팅
 */
const formatNumber = (num: number): string => num.toLocaleString('en-US');

/**
 * 이미지 카드 컴포넌트
 * Image 엔티티 데이터를 카드 형태로 표시합니다.
 */
export const ImageCard = ({ image }: ImageCardProps) => (
  <Card>
    <ImageContainer>
      <StyledImage src={image.previewURL} alt={image.tags} loading="lazy" />
    </ImageContainer>
    <InfoContainer>
      <UserName>by {image.user}</UserName>
      <StatsContainer>
        <StatItem>👁️ {formatNumber(image.views)}</StatItem>
        <StatItem>⬇️ {formatNumber(image.downloads)}</StatItem>
        <StatItem>❤️ {formatNumber(image.likes)}</StatItem>
      </StatsContainer>
    </InfoContainer>
  </Card>
);
