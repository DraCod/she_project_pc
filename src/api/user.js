import request from '@/utils/request'

export function login(data) {//登录
  return request({
    url: '/pc/login',
    method: 'post',
    data
  })
}

export function getInfo() {//获取用户信息
  return request({
    url: '/pc/get-user-info',
    method: 'get'
  })
}

export function logout() { //推出登录
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


export function userList(){
  return request({
    url:'/pc/user-list',
    method:'get'
  })
}

export function giveWallet(data){
  return request({
    url:'/pc/give-wallet',
    method:'post',
    data
  })
}