import mockjs from 'mockjs'
import homeApi from '../api/mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// 模拟一个数据接口，模拟前后端的交互
// 定义mock请求拦截
mockjs.mock('/api/home/getData',homeApi.getStatisticalData)

mockjs.mock('/api/user/edit', 'post' , user.updateUser)
mockjs.mock('/api/user/add', 'post' , user.createUser)
mockjs.mock('/api/user/del', 'post' , user.deleteUser)
mockjs.mock(/api\/user\/getUser/, user.getUserList)
mockjs.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)