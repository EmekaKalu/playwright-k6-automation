import http from 'k6/http';
import { sleep, check } from 'k6';

// ENV variables required to run the test
const apiKey = __ENV.API_KEY;
const url = __ENV.GETWALLETNFTENDPOINT;
const nodeKey = __ENV.NODE_KEY;

// load test configuration
export const options = {
    stages: [
        { duration: '1m', target: 100 }, // below normal load
        { duration: '1m', target: 100 }, // normal load
        { duration: '1m', target: 0 }, // around the breaking point
    ],
};

export default function () {
  // getWalletNFTs()
    const response = http.get(`${url}`, {
        headers: {
            accept: 'application/json',
            'X-API-Key': apiKey
        },
        params: {
            chain: 'eth',
            format: 'decimal',
            media_items: 'false',
        },
    });

    check(response, {
      'NFTs fetched successfully': (r) => r.status === 200,
    });
    sleep(1);

    // rpc methods
    // getBlockByNumber()

    const response2 = http.post(
      nodeKey,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
        id: 1,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(response2, {
      'block information fetched successfully': (r) => r.status === 200,
    });
    sleep(1);

    // getTransactionByHash()

    const response3 = http.post(
      nodeKey,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: ['0x46ef988a5da9627f3a877f8e6adf065f9673a638c8c7e4e53ac787b4ecc01803'],
        id: 1,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(response3, {
      'transaction information fetched successfully': (r) => r.status === 200,
    });
    sleep(1);
}