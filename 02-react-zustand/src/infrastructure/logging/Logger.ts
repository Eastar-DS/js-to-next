/**
 * Logger
 * 큰 프로젝트에서는 로깅 시스템이 필수입니다.
 * 개발/스테이징/프로덕션 환경별로 다른 로그 레벨 적용 가능
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean; // 프로덕션에서는 Sentry, DataDog 등으로 전송
}

/**
 * 애플리케이션 로거
 */
export class Logger {
  private static config: LoggerConfig = {
    level: LogLevel.INFO,
    enableConsole: true,
    enableRemote: false,
  };

  /**
   * 로거 설정
   */
  static configure(config: Partial<LoggerConfig>): void {
    Logger.config = { ...Logger.config, ...config };
  }

  /**
   * 디버그 로그
   */
  static debug(message: string, data?: unknown): void {
    Logger.log(LogLevel.DEBUG, message, data);
  }

  /**
   * 정보 로그
   */
  static info(message: string, data?: unknown): void {
    Logger.log(LogLevel.INFO, message, data);
  }

  /**
   * 경고 로그
   */
  static warn(message: string, data?: unknown): void {
    Logger.log(LogLevel.WARN, message, data);
  }

  /**
   * 에러 로그
   */
  static error(message: string, error?: Error | unknown): void {
    Logger.log(LogLevel.ERROR, message, error);
  }

  /**
   * 내부 로그 처리
   */
  private static log(level: LogLevel, message: string, data?: unknown): void {
    if (level < Logger.config.level) {
      return;
    }

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];

    if (Logger.config.enableConsole) {
      Logger.logToConsole(level, timestamp, levelName, message, data);
    }

    if (Logger.config.enableRemote) {
      Logger.logToRemote(level, timestamp, message, data);
    }
  }

  /**
   * 콘솔 로그 출력
   */
  private static logToConsole(
    level: LogLevel,
    timestamp: string,
    levelName: string,
    message: string,
    data?: unknown
  ): void {
    const prefix = `[${timestamp}] [${levelName}]`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, message, data ?? '');
        break;
      case LogLevel.INFO:
        console.info(prefix, message, data ?? '');
        break;
      case LogLevel.WARN:
        console.warn(prefix, message, data ?? '');
        break;
      case LogLevel.ERROR:
        console.error(prefix, message, data ?? '');
        break;
      default:
        // NONE 레벨은 로그 출력 안함
        break;
    }
  }

  /**
   * 원격 로깅 서비스로 전송 (Sentry, DataDog 등)
   */
  private static logToRemote(
    _level: LogLevel,
    _timestamp: string,
    _message: string,
    _data?: unknown
  ): void {
    // 실제 프로젝트에서는 여기서 Sentry, DataDog 등으로 전송
    // 예: Sentry.captureMessage(message, { level, extra: data });
  }
}
