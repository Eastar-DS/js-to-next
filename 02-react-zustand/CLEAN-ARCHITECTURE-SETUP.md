# Clean Architecture 설정 가이드

## 디렉토리 구조

```
src/
├── domain/          - 비즈니스 로직 및 엔티티
├── application/     - 유즈케이스 및 애플리케이션 서비스
├── infrastructure/  - 외부 의존성 (API, 저장소 등)
└── presentation/    - UI 컴포넌트 및 뷰
```

## Path Alias 설정

TypeScript와 Vite에서 다음과 같은 path alias를 사용할 수 있습니다:

- `@domain/*` → `src/domain/*`
- `@application/*` → `src/application/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@presentation/*` → `src/presentation/*`

### 사용 예시

```typescript
// 상대 경로 대신
import { ExampleEntity } from '../../domain/example.entity';

// Path alias 사용
import { ExampleEntity } from '@domain/example.entity';
```

## 레이어별 역할

### 1. Domain (도메인 레이어)
- **역할**: 순수 비즈니스 로직, 엔티티, Value Object
- **의존성**: 없음 (다른 레이어에 의존하지 않음)
- **예시**: User, Product, Order 엔티티

### 2. Application (애플리케이션 레이어)
- **역할**: 유즈케이스, 비즈니스 규칙 조율
- **의존성**: Domain 레이어만 의존
- **예시**: LoginUseCase, CreateOrderUseCase

### 3. Infrastructure (인프라 레이어)
- **역할**: 외부 시스템 연동 (API, DB, LocalStorage 등)
- **의존성**: Domain, Application 레이어 의존 가능
- **예시**: UserRepository, HttpClient, LocalStorageService

### 4. Presentation (프레젠테이션 레이어)
- **역할**: UI 컴포넌트, 뷰, 상태 관리
- **의존성**: 모든 레이어 의존 가능
- **예시**: LoginPage, UserList, ProductCard

## 의존성 규칙

```
Presentation → Application → Domain
     ↓             ↓
Infrastructure ←--/
```

- **Domain**: 다른 레이어에 의존하지 않음
- **Application**: Domain에만 의존
- **Infrastructure**: Domain, Application에 의존 가능
- **Presentation**: 모든 레이어에 의존 가능

## 설정 파일

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"]
    }
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, './src/domain'),
      '@application': path.resolve(__dirname, './src/application'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@presentation': path.resolve(__dirname, './src/presentation'),
    },
  },
});
```

## 테스트

Path alias가 정상적으로 작동하는지 확인:

```bash
# 빌드 테스트
npm run build

# 개발 서버 실행
npm run dev

# ESLint 검사
npm run lint
```

## 다음 단계

1. 각 레이어에 실제 비즈니스 로직 구현
2. Zustand를 활용한 상태 관리 설정
3. TDD 방식으로 기능 개발 시작
