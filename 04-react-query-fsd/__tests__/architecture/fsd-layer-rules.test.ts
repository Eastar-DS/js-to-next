import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve(__dirname, '../../src');

/**
 * FSD 레이어 의존성 규칙:
 * app -> pages -> widgets -> features -> entities -> shared
 * 상위 레이어는 하위 레이어만 import 가능
 * 같은 레이어 간 import 금지
 */

// 파일 내용에서 import 경로 추출
function extractImports(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importRegex = /from\s+['"]@\/([\w/-]+)['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

// 디렉토리 내 모든 .ts, .tsx 파일 찾기
function findAllFiles(dir: string, extensions = ['.ts', '.tsx']): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && entry.name !== 'node_modules') {
        walk(fullPath);
      } else if (
        entry.isFile() &&
        extensions.some((ext) => entry.name.endsWith(ext))
      ) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// 레이어 추출
function getLayer(importPath: string): string | null {
  const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
  for (const layer of layers) {
    if (importPath.startsWith(layer + '/')) {
      return layer;
    }
  }
  return null;
}

describe('FSD 레이어 의존성 규칙', () => {
  const layerOrder = ['shared', 'entities', 'features', 'widgets', 'pages', 'app'];
  const files = findAllFiles(SRC_DIR);

  it('상위 레이어는 하위 레이어만 import 해야 한다', () => {
    const violations: string[] = [];

    for (const file of files) {
      const relativePath = path.relative(SRC_DIR, file);
      const fileLayer = getLayer(relativePath);

      if (!fileLayer) continue;

      const imports = extractImports(file);

      for (const importPath of imports) {
        const importLayer = getLayer(importPath);

        if (!importLayer) continue;

        const fileLayerIndex = layerOrder.indexOf(fileLayer);
        const importLayerIndex = layerOrder.indexOf(importLayer);

        // 상위 레이어가 하위 레이어를 import하는지 확인
        if (fileLayerIndex < importLayerIndex) {
          violations.push(
            `${relativePath} (${fileLayer}) imports ${importPath} (${importLayer})`
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('같은 slice 내부에서만 직접 import가 허용되어야 한다 (shared와 app 제외)', () => {
    const violations: string[] = [];

    for (const file of files) {
      const relativePath = path.relative(SRC_DIR, file);
      const fileLayer = getLayer(relativePath);

      if (!fileLayer) continue;

      // shared와 app 레이어는 cross-segment import 허용
      if (fileLayer === 'shared' || fileLayer === 'app') continue;

      const imports = extractImports(file);

      for (const importPath of imports) {
        const importLayer = getLayer(importPath);

        if (fileLayer === importLayer) {
          // 같은 slice 내부는 허용 (예: entities/image/ui -> entities/image/model)
          const fileSlice = relativePath.split('/').slice(0, 2).join('/');
          const importSlice = importPath.split('/').slice(0, 2).join('/');

          if (fileSlice !== importSlice) {
            violations.push(
              `${relativePath} imports ${importPath} (different slice in same layer)`
            );
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('import 경로가 명확한 구조를 가져야 한다', () => {
    const violations: string[] = [];

    for (const file of files) {
      const relativePath = path.relative(SRC_DIR, file);
      const imports = extractImports(file);

      for (const importPath of imports) {
        const layer = getLayer(importPath);
        if (!layer) continue;

        // 레이어/slice/segment 구조 확인
        const parts = importPath.split('/');
        if (parts.length < 2) {
          violations.push(
            `${relativePath} has incomplete import path: ${importPath}`
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('entities 레이어는 shared만 import 해야 한다', () => {
    const violations: string[] = [];
    const entitiesFiles = files.filter((f) =>
      path.relative(SRC_DIR, f).startsWith('entities/')
    );

    for (const file of entitiesFiles) {
      const imports = extractImports(file);

      for (const importPath of imports) {
        const importLayer = getLayer(importPath);

        if (importLayer && importLayer !== 'shared' && importLayer !== 'entities') {
          violations.push(
            `${path.relative(SRC_DIR, file)} imports ${importPath} (${importLayer})`
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('features 레이어는 entities와 shared만 import 해야 한다', () => {
    const violations: string[] = [];
    const featuresFiles = files.filter((f) =>
      path.relative(SRC_DIR, f).startsWith('features/')
    );

    for (const file of featuresFiles) {
      const imports = extractImports(file);

      for (const importPath of imports) {
        const importLayer = getLayer(importPath);

        if (
          importLayer &&
          importLayer !== 'shared' &&
          importLayer !== 'entities' &&
          importLayer !== 'features'
        ) {
          violations.push(
            `${path.relative(SRC_DIR, file)} imports ${importPath} (${importLayer})`
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
