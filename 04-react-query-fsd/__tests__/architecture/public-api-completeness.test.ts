import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve(__dirname, '../../src');

/**
 * Public API 완전성 검증:
 * - 각 slice는 index.ts를 통해서만 export
 * - DTO 타입은 외부에 노출되지 않음
 * - 필요한 타입과 컴포넌트/함수가 모두 export됨
 */

// index.ts 파일 읽기
function readIndexFile(indexPath: string): string {
  if (!fs.existsSync(indexPath)) {
    return '';
  }
  return fs.readFileSync(indexPath, 'utf-8');
}

// export된 항목 추출
function extractExports(content: string): string[] {
  const exports: string[] = [];

  // export { ... } from '...'
  const namedExportRegex = /export\s+\{([^}]+)\}\s+from/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim().split(' as ')[0].trim());
    exports.push(...names);
  }

  // export type { ... } from '...'
  const typeExportRegex = /export\s+type\s+\{([^}]+)\}\s+from/g;
  while ((match = typeExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim().split(' as ')[0].trim());
    exports.push(...names);
  }

  // export * from '...'
  const wildcardExportRegex = /export\s+\*\s+from/g;
  if (wildcardExportRegex.test(content)) {
    exports.push('*');
  }

  // export const/function
  const directExportRegex = /export\s+(const|function|class)\s+(\w+)/g;
  while ((match = directExportRegex.exec(content)) !== null) {
    exports.push(match[2]);
  }

  return exports;
}

describe('Public API 완전성 검증', () => {
  describe('entities/image', () => {
    const indexPath = path.join(SRC_DIR, 'entities/image/index.ts');
    const content = readIndexFile(indexPath);
    const exports = extractExports(content);

    it('index.ts 파일이 존재해야 한다', () => {
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('Image 타입을 export 해야 한다', () => {
      expect(content).toContain('Image');
      expect(exports.some((e) => e.includes('Image'))).toBe(true);
    });

    it('ImageDTO는 export하지 않아야 한다 (내부 구현 detail)', () => {
      // export type { ... ImageDTO ... } 패턴을 찾음
      const exportImageDTORegex = /export\s+type\s+\{[^}]*ImageDTO[^}]*\}/;
      expect(exportImageDTORegex.test(content)).toBe(false);
    });

    it('ImageCard와 ImageGrid 컴포넌트를 export 해야 한다', () => {
      expect(content).toContain('ImageCard');
      expect(content).toContain('ImageGrid');
    });

    it('imageApi의 함수들을 export 해야 한다', () => {
      // getImages, getImagesByPage가 export되어야 함
      expect(content).toMatch(/getImages/);
      expect(content).toMatch(/getImagesByPage/);
    });
  });

  describe('features/search-images', () => {
    const indexPath = path.join(SRC_DIR, 'features/search-images/index.ts');

    it('index.ts 파일이 존재해야 한다', () => {
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('useImageSearch 훅을 export 해야 한다', () => {
      if (fs.existsSync(indexPath)) {
        const content = readIndexFile(indexPath);
        expect(content).toContain('useImageSearch');
      }
    });

    it('SearchForm 컴포넌트를 export 해야 한다', () => {
      if (fs.existsSync(indexPath)) {
        const content = readIndexFile(indexPath);
        expect(content).toContain('SearchForm');
      }
    });
  });

  describe('features/paginate-images', () => {
    const indexPath = path.join(SRC_DIR, 'features/paginate-images/index.ts');

    it('index.ts 파일이 존재해야 한다', () => {
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('useImagesByPage 훅을 export 해야 한다', () => {
      if (fs.existsSync(indexPath)) {
        const content = readIndexFile(indexPath);
        expect(content).toContain('useImagesByPage');
      }
    });

    it('Pagination 컴포넌트를 export 해야 한다', () => {
      if (fs.existsSync(indexPath)) {
        const content = readIndexFile(indexPath);
        expect(content).toContain('Pagination');
      }
    });
  });

  describe('widgets/image-gallery', () => {
    const indexPath = path.join(SRC_DIR, 'widgets/image-gallery/index.ts');

    it('index.ts 파일이 존재해야 한다', () => {
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('ImageGallery 컴포넌트를 export 해야 한다', () => {
      if (fs.existsSync(indexPath)) {
        const content = readIndexFile(indexPath);
        expect(content).toContain('ImageGallery');
      }
    });
  });

  describe('pages/search', () => {
    const indexPath = path.join(SRC_DIR, 'pages/search/index.ts');

    it('index.ts 파일이 존재해야 한다', () => {
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('SearchPage 컴포넌트를 export 해야 한다', () => {
      if (fs.existsSync(indexPath)) {
        const content = readIndexFile(indexPath);
        expect(content).toContain('SearchPage');
      }
    });
  });
});
