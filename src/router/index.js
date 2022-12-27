import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',//改为history模式，去除url里的#
	routes
});

const quanxian = sessionStorage.getItem("type")
console.log(quanxian)
router.beforeEach((to, from, next) => {
	console.log("to")
	console.log(to)
	if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
		if (sessionStorage.getItem('token')) { // vuex.state判断token是否存在,后台会校验是否过期
			if(to.meta.roles.includes(quanxian)){
				console.log("存在")
				next()	//放行
			}else{
				router.push({name: 'NotFound'})
				// next({path:"/404"})	//跳到404页面
			}
		} else {
			next({
				path: '/login',
				query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		if(to.meta.roles.includes(quanxian)){

			console.log("存在")
			next()	//放行
		}else{
			router.push({name: 'NotFound'})

			// next({path:"/404"})	//跳到404页面
		}
	}
})
export default router;
