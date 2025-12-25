import { httpClient } from '@/shared/api/httpClient';

describe('httpClient', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET 요청', () => {
    it('기본 GET 요청을 성공적으로 수행해야 한다', async () => {
      const mockData = { message: 'success' };
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await httpClient.get('/test');

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockData);
    });

    it('query params를 자동으로 인코딩해야 한다', async () => {
      const mockData = { results: [] };
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await httpClient.get('/search', { q: 'hello world', page: '1' });

      const callArg = (globalThis.fetch as jest.Mock).mock.calls[0][0];
      expect(callArg).toContain('q=hello');
      expect(callArg).toContain('page=1');
    });

    it('JSON 응답을 자동으로 파싱해야 한다', async () => {
      const mockData = { id: 1, name: 'test' };
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await httpClient.get('/data');

      expect(result).toEqual(mockData);
      expect(typeof result).toBe('object');
    });
  });

  describe('POST 요청', () => {
    it('기본 POST 요청을 성공적으로 수행해야 한다', async () => {
      const mockData = { success: true };
      const postData = { name: 'test' };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await httpClient.post('/submit', postData);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/submit'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(postData),
        })
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('에러 핸들링', () => {
    it('네트워크 에러 시 NetworkError를 throw해야 한다', async () => {
      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failed'));

      await expect(httpClient.get('/test')).rejects.toThrow('Network failed');
    });

    it('HTTP 에러 응답 시 에러를 throw해야 한다', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(httpClient.get('/notfound')).rejects.toThrow();
    });
  });
});
