import request from '@/utils/request'

export function orderList(data){
    let url=[];
    for (const key in data) {
        url.push(key+'='+data[key])
    }
    return request({
        url:`/pc/order-list?${url.join('&')}`,
        method:'get'
    })
}


export function eidtOrder(data){
    return request({
        url:'/mb/edit-order',
        method:'post',
        data
    })
}