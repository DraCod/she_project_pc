import request from '@/utils/request'

export function editText(data){
    return request({
        url:"/pc/edit-text",
        method:'post',
        data
    })
}

export function getText(data){
    return request({
        url:`/pc/get-text?id=${data.id}`,
        method:'get',
    })
}