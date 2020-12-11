import request from '@/utils/request'

export function classifyList(data) {
    return request({
        url: '/pc/classify-list',
        method: 'get',
        data
    })
}

export function classifyAdd(data) {
    return request({
        url: '/pc/add-classify',
        method: 'post',
        data
    })
}

export function classifyEdit(data){
    return request({
        url:'/pc/edit-classify',
        method:'post',
        data
    })
}