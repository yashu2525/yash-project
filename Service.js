const STATIC_USERNAME = 'admin';
const STATIC_PASSWORD = '1234';

export function login(username, password) {
  return username === STATIC_USERNAME && password === STATIC_PASSWORD;
}
