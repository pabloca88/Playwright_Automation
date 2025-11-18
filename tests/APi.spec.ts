import { APIResponse, expect, test, TestInfo } from '@playwright/test';

const baseUrl = 'https://reqres.in/api';
const apiKey = process.env.REQRES_API_KEY ?? 'reqres-free-v1';
const authHeaders = {
  'x-api-key': apiKey,
  accept: 'application/json',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
} as const;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestWithRetry(
  requester: () => Promise<APIResponse>,
  expectedStatuses: number[],
  retries = 3
): Promise<APIResponse> {
  let lastResponse: APIResponse | undefined;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    const response = await requester();
    lastResponse = response;
    if (expectedStatuses.includes(response.status())) {
      return response;
    }
    if (attempt < retries - 1) {
      await sleep(300 * (attempt + 1));
    }
  }
  const status = lastResponse?.status();
  const url = lastResponse?.url() ?? 'unknown url';
  throw new Error(`Unexpected status ${status} from ${url}`);
}

test.describe('API Testing', async () => {
  const skipIfNotPrimaryProject = (testInfo: TestInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Run API suite once per test run.');
  };

  test('GET List Users - https://reqres.in/api/users/2 - 200 OK', async ({ request }, testInfo) => {
    skipIfNotPrimaryProject(testInfo);
    const response = await requestWithRetry(
      () => request.get(`${baseUrl}/users/2`, { headers: authHeaders }),
      [200]
    );
    const body = (await response.json()) as { data: { id: number } };
    expect(response.status()).toBe(200);
    expect(body.data.id).toBe(2);
  });

  test('Single User not found - https://reqres.in/api/users/23 - 404 Not Found ', async ({ request }, testInfo) => {
    skipIfNotPrimaryProject(testInfo);
    const response = await requestWithRetry(
      () => request.get(`${baseUrl}/users/23`, { headers: authHeaders }),
      [404]
    );
    expect(response.status()).toBe(404);
  });

  test('List <RESOURCE> - https://reqres.in/api/unknown', async ({ request }, testInfo) => {
    skipIfNotPrimaryProject(testInfo);
    const response = await requestWithRetry(
      () => request.get(`${baseUrl}/unknown`, { headers: authHeaders }),
      [200]
    );
    const body = (await response.json()) as { data: Array<{ year: number }> };
    expect(response.status()).toBe(200);
    console.log(body.data[0].year);
  });

  test('POST Request - create new user/resource 201 OK', async ({ request }, testInfo) => {
    skipIfNotPrimaryProject(testInfo);
    const response = await requestWithRetry(
      () =>
        request.post(`${baseUrl}/users`, {
          headers: authHeaders,
          data: {
            name: 'Pablo',
            job: 'QA test',
          },
        }),
      [201]
    );
    const body = (await response.json()) as {
      name: string;
      job: string;
      createdAt: string;
    };
    expect(body.name).toBe('Pablo');
    expect(body.job).toBe('QA test');
    expect(body.createdAt).toBeTruthy();
    expect(response.status()).toBe(201);
  });
});
