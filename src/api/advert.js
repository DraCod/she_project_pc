import request from '@/utils/request'

export function advertList(data){
    return request({
        url:`/pc-advert-list?type=${data.type}`,
        method:'get',
    })
// /pc/advert-list
}

export function addAdvert(data){
    return request({
        url:'/pc/add-advert',
        method:'post',
        data
    })
}

export function removeAdvert(data){
    return request({
        url:'/pc/remove-advert',
        method:'post',
        data
    })
}