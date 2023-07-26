import router from "@/router";
import Cookies from "js-cookie";
export default {
    state : {
        isCollapse: false,
        tabsList :[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              },
        ],
        menu: []
    },
    mutations:{
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        //更新面包屑数据
        selectMenu(state,val) {
            console.log(val,'val');
            if(val.name !== 'home') {
                // 是空或者连续按，就不操作
                const index = state.tabsList.findIndex(item => item.name === val.name);
                if(index === -1) { 
                    // 如果按到了其他的路由就添加到页面当中
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state,item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)
        },
        // 设置menu的数据
        setMenu(state,val) {
            state.menu = val
            Cookies.set('menu',JSON.stringify(val)) 
        },
        addMenu(state,router) {
            if (!Cookies.get('menu'))  return
            // 有数据的话就更新menu
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map( item =>  {
                        item.component = () => import(`../View/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../View/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 动态路由的添加
            // console.log(menuArray,'menuArray');
                menuArray.forEach(item => {
                router.addRoute('Main',item)
            });
        }
    }
    
}