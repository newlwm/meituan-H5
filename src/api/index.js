import http from '../utils/request'

//输出接口
export  const getData = () => {
    return http.get('/home/getData')
}
export  const getUser = (params) => {
    return http.get('/user/getUser',params)
}
export  const editUser = (data) => {
    return http.post('/user/edit',data)
}
export  const delUser = (data) => {
    return http.post('/user/del',data)
}
export  const addUser = (data) => {
    return http.post('/user/add',data)
}
export  const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
}
