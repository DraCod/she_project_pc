import request from '@/utils/request'


// export function upload(data){
//     return request({
//         url: '/pc/upload',
//         method: 'post',
//         data,
//         headers:{'Content-Type':'multipart/form-data'}
//     })
// }

export function addGood(data){//添加商品
    return request({
        url:'/pc/add-good',
        method:'post',
        data
    })
}

export function goodList(data){//商品列表
    return request({
        url:'/pc/good-list',
        method:'get',
        data
    })
}

export function getImg(data){//获取图片
    return request({
        url:`/pc/get-img?img=${data.img}`,
        method:'get',
    })
}

export function editGood(data){
    return request({
        url:'/pc/edit-good',
        method:'post',
        data
    })
}