import router from "./index";
//路由守护
router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        if (to.path === '/login') {
            next()
        }
        else {
            var tokenStr = window.localStorage.getItem('token')

            if (!tokenStr) {
                return next('/login')
            }
            else {
                next()
            }
        }
    }
    else {
        next();
    }
})