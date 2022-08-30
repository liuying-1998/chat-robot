const API = (function () {
  const BASE_URL = 'https://study.duyiedu.com';
  TOKEN_KEY = 'token';

  async function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL + path, { headers });
  };

  async function post(path, obj) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL + path, { headers, method: 'POST', body: JSON.stringify(obj) });
  }

  async function reg(userInfo) {
    const resp = await post('/api/user/reg', userInfo)
    const res = await resp.json();
    return res;
  }

  async function login(loginInfo) {
    const resp = await post('/api/user/login', loginInfo)
    const res = await resp.json();
    if (res.code === 0) {
      // 保存token
      const token = resp.headers.get('authorization');
      localStorage.setItem(TOKEN_KEY, token)
    }
    return res;
  }

  async function exists(loginId) {
    const resp = await get('/api/user/exists?loginId=' + loginId);
    const res = await resp.json();
    return res;
  }

  async function profile() {
    const resp = await get('/api/user/profile');
    return await resp.json();

  }

  async function sendChat(txt) {
    const resp = await post('/api/chat', { content: txt });
    const res = await resp.json();
    return res;

  }

  async function getHistory() {
    const resp = await get('/api/chat/history');
    const res = await resp.json();
    return res
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut
  }
})()


