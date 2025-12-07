/**
 * Domain Layer 에러 타입 정의
 * 큰 프로젝트에서는 에러를 타입별로 구분하여 처리합니다.
 */

/**
 * 기본 Domain Error 클래스
 */
export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    // Error 스택 트레이스 유지
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 리소스를 찾을 수 없을 때 발생하는 에러
 */
export class NotFoundError extends DomainError {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier
      ? `${resource} with id "${identifier}" not found`
      : `${resource} not found`;
    super(message, 'NOT_FOUND');
  }
}

/**
 * 유효성 검증 실패 에러
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string
  ) {
    super(message, 'VALIDATION_ERROR');
  }
}

/**
 * 네트워크 에러
 */
export class NetworkError extends DomainError {
  constructor(
    message: string,
    public readonly statusCode?: number
  ) {
    super(message, 'NETWORK_ERROR');
  }
}

/**
 * 인증/인가 에러
 */
export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED');
  }
}

/**
 * 서버 에러
 */
export class ServerError extends DomainError {
  constructor(
    message: string = 'Internal server error',
    public readonly statusCode?: number
  ) {
    super(message, 'SERVER_ERROR');
  }
}

/**
 * 에러 타입 가드
 */
export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}
