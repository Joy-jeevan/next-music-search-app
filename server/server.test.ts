import request from 'supertest';
import app from '.';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET /api/search', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return results when term and limit are provided', async () => {
        const mockData = {
            resultCount: 5,
            results: Array(5).fill({ trackName: 'Test Track' })
        };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const response = await request(app).get('/api/search?term=test&limit=5');

        expect(response.status).toBe(200);
        expect(response.body.results).toHaveLength(5);
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('itunes.apple.com'), expect.objectContaining({
            params: expect.objectContaining({
                term: 'test',
                limit: 5,
                media: 'music'
            })
        }));
    });

    it('should return default number of results (10) when limit is not provided', async () => {
        const mockData = {
            resultCount: 10,
            results: Array(10).fill({ trackName: 'Test Track' })
        };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const response = await request(app).get('/api/search?term=test');

        expect(response.status).toBe(200);
        expect(response.body.results).toHaveLength(10);
        // Verify that fetchLimit was calculated correctly (0 + 10 = 10)
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('itunes.apple.com'), expect.objectContaining({
            params: expect.objectContaining({
                limit: 10
            })
        }));
    });

    it('should handle pagination correctly', async () => {
        const mockData = {
            resultCount: 20,
            results: Array(20).fill(null).map((_, i) => ({ trackId: i }))
        };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const response = await request(app).get('/api/search?term=test&limit=5&offset=5');

        expect(response.status).toBe(200);
        expect(response.body.results).toHaveLength(5);
        expect(response.body.results[0].trackId).toBe(5); // Should start from index 5

        // fetchLimit should be offset + limit = 10
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('itunes.apple.com'), expect.objectContaining({
            params: expect.objectContaining({
                limit: 10
            })
        }));
    });

    it('should handle API errors gracefully', async () => {
        mockedAxios.get.mockRejectedValue(new Error('API Error'));

        const response = await request(app).get('/api/search?term=test');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal Server Error');
    });
});
