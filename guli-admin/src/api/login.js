import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/guliedu/edu-teacher/login',
    method: 'get',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/guliedu/edu-teacher/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
