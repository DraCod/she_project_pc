import request from '@/utils/request'

export function feedbackList(){
    return request({
        url:'/pc/feedback-list',
        method:'get'
    })
}