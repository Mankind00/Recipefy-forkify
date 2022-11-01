import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // 'https://forkify-api.herokuapp.com/api/search?q=pizza';
    // 35477
    // console.log(res.json());
    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // 'https://forkify-api.herokuapp.com/api/search?q=pizza';
    // 35477
    // console.log(res.json());
    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
