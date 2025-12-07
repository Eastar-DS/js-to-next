# Architecture Guide

## 프로젝트 아키텍처 개요

이 프로젝트는 **Clean Architecture + DataSource 패턴 + Mapper 패턴**을 적용한 프로덕션급 React 애플리케이션입니다.

## 핵심 패턴

### 1. Mapper 패턴
**위치**: `src/infrastructure/mappers/`

**역할**: DTO(Data Transfer Object)와 Domain Entity 간의 변환을 담당

**장점**:
- DTO → Entity 변환 로직이 한 곳에 집중됨
- 테스트 용이성 (Mapper만 독립적으로 테스트 가능)
- 재사용성 (여러 Repository에서 같은 Mapper 사용 가능)
- 양방향 변환 지원 (toEntity, toDto)

**예시**:
```typescript
// infrastructure/mappers/PixabayImageMapper.ts
export class PixabayImageMapper {
  static toEntity(dto: PixabayImageDto): Image {
    return {
      id: dto.id,
      tags: dto.tags,
      // ... 필드 매핑
    };
  }

  static toEntities(dtos: PixabayImageDto[]): Image[] {
    return dtos.map(dto => this.toEntity(dto));
  }
}
```

### 2. DataSource 패턴
**위치**: `src/infrastructure/datasources/`

**역할**: HTTP 통신만 담당, DTO 형태로 데이터 반환

**책임 분리**:
- DataSource: HTTP 요청/응답, DTO 반환
- Repository: DTO → Entity 변환, Result 패턴 적용

**장점**:
- 단일 책임 원칙 (SRP)
- HTTP 라이브러리 변경 시 DataSource만 수정
- Repository 테스트 시 DataSource 모킹 용이

**예시**:
```typescript
// infrastructure/datasources/PixabayDataSource.ts
export class PixabayDataSource {
  async search(query: string): Promise<PixabayApiResponseDto> {
    const response = await fetch(url);
    return await response.json(); // DTO 반환
  }
}

// infrastructure/repositories/PixabayImageRepository.ts
export class PixabayImageRepository implements ImageRepository {
  async search(query: string): Promise<Result<Image[]>> {
    const dto = await this.dataSource.search(query);
    const entities = PixabayImageMapper.toEntities(dto.hits);
    return { success: true, data: entities }; // Result 반환
  }
}
```

### 3. 에러 타입 체계화
**위치**: `src/domain/errors/`

**큰 프로젝트에서 필수적인 패턴**:
- 에러를 타입별로 구분 (NotFoundError, ValidationError, NetworkError 등)
- 에러 코드를 통한 일관된 에러 처리
- 타입 가드로 에러 타입 구분

**예시**:
```typescript
// domain/errors/DomainError.ts
export class NotFoundError extends DomainError {
  constructor(resource: string, identifier?: string) {
    super(`${resource} not found`, 'NOT_FOUND');
  }
}

// 사용
if (isNotFoundError(error)) {
  // 404 처리
} else if (isNetworkError(error)) {
  // 네트워크 에러 처리
}
```

### 4. 로깅 시스템
**위치**: `src/infrastructure/logging/`

**프로덕션 환경에서 필수**:
- 환경별 로그 레벨 설정 (DEBUG, INFO, WARN, ERROR)
- 콘솔 + 원격 로깅 (Sentry, DataDog 등) 지원
- 타임스탬프, 로그 레벨 자동 기록

**예시**:
```typescript
// 개발 환경
Logger.configure({ level: LogLevel.DEBUG });

// 프로덕션 환경
Logger.configure({
  level: LogLevel.ERROR,
  enableRemote: true
});

// 사용
Logger.info('Image search started', { query: 'cats' });
Logger.error('API request failed', error);
```

### 5. 환경변수 타입 안전 관리
**위치**: `src/infrastructure/config/`

**큰 프로젝트에서의 환경변수 관리**:
- 타입 안전한 환경변수 접근
- 필수 환경변수 검증
- 환경별 기본값 설정

**예시**:
```typescript
// infrastructure/config/env.ts
export const env = new EnvConfig();

// 사용 (타입 안전)
const apiKey = env.get('PIXABAY_API_KEY'); // string 타입
const isProduction = env.isProduction(); // boolean 타입
```

## 데이터 흐름

```
UI (Presentation)
    ↓
Store / Hook (Application)
    ↓
UseCase (Domain) ← Result<Image[]>
    ↓
Repository Interface (Domain)
    ↑ implements
Repository Impl (Infrastructure) ← DTO → Entity 변환
    ↓ uses
Mapper (Infrastructure) ← toEntity(), toEntities()
    ↑ uses DTO
DataSource (Infrastructure) ← HTTP 통신, DTO 반환
    ↓
External API (Pixabay)
```

## 레이어별 책임

### Domain Layer
- **순수 비즈니스 로직**만 존재
- 외부 의존성 없음 (UI, Framework, DB 모름)
- Entities, UseCases, Repository Interfaces, Errors

### Application Layer
- **애플리케이션 흐름 제어**
- Store(Zustand), Hooks
- Domain Layer 사용

### Infrastructure Layer
- **외부 시스템 연동**
- DataSource (HTTP), Repository 구현체, Mappers
- Logger, Config 등

### Presentation Layer
- **UI 렌더링**
- React Components
- Application Layer 사용

## 프로덕션 체크리스트

### ✅ 이미 적용된 것
- [x] Clean Architecture 레이어 분리
- [x] Mapper 패턴
- [x] DataSource 패턴
- [x] Result 패턴 (타입 안전한 에러 처리)
- [x] 에러 타입 체계화
- [x] 로깅 시스템
- [x] 환경변수 타입 안전 관리
- [x] TypeScript strict 모드
- [x] TDD (Test-Driven Development)

### 🔜 추후 적용할 것 (Phase가 진행되면)
- [ ] Dependency Injection Container (InversifyJS, TSyringe)
- [ ] API Response Caching (React Query)
- [ ] 에러 모니터링 (Sentry 연동)
- [ ] 성능 모니터링 (Web Vitals)
- [ ] CI/CD 파이프라인

## 추천 학습 순서

1. **현재 구조 이해** (이미 완료)
   - Mapper, DataSource, Repository 관계 파악

2. **에러 처리 패턴 학습**
   - DomainError 상속 구조
   - 타입 가드 활용법

3. **로깅 시스템 활용**
   - 환경별 로그 레벨 설정
   - 원격 로깅 통합 방법

4. **의존성 주입 학습** (Phase가 진행되면)
   - IoC Container 개념
   - 생성자 주입 vs 메서드 주입

## 참고 자료

### 아키텍처 패턴
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

### TypeScript Best Practices
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)
