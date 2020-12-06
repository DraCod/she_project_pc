export function getToken() {
  return localStorage.getItem('authorization')
}

export function setToken(token) {
  return localStorage.setItem('authorization', token)
}

export function removeToken() {
  return localStorage.setItem('authorization', '')
}
