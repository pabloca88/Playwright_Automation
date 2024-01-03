import {test, expect} from '@playwright/test'

const BASE_URL = 'https://pokeapi.co';
const ID = 100;
const BERRYNAME = 'cheri';
const baseUrl2 = 'https://reqres.in/api';

test.describe('Feature: APIS ', async() => {

    test('GET https://pokeapi.co/api/v2/berry/{id or name}/, 200 Ok', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v2/berry/${BERRYNAME}`);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
    });

    test('GET https://pokeapi.co/api/v2/berry/{id or name}/, 404 Not Found', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v2/berry/cher`);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status(), responseBody.message).toBe(404);
    });
    
    test('POST Request - create new user 200 OK', async ({ request }) => {
        const response = await request.post(`${baseUrl2}/users`, {
        data: 
            {
                "name": "Pablo", 
                "job": "QA test"
            }
    });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody)
        expect(responseBody.name).toBe("Pablo");
        expect(responseBody.job).toBe("QA test");
        expect(responseBody.createdAt).toBeTruthy(); 
        expect(response.status()).toBe(201);
    })

    test('POST Request - create new user - Name error', async ({ request }) => {
        const response = await request.post(`${baseUrl2}/users`, {
        data: 
            {
                "name": "Pablo Fail", 
                "job": "QA test"
            }
    });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody)
        expect.soft(responseBody.name).toBe("Pablo");
        expect(responseBody.job).toBe("QA test");
        expect(responseBody.createdAt).toBeTruthy(); 
        expect(response.status()).toBe(201);
    })
    








})