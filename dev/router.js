import {isPromise, isRegExp} from './utils/functions'

class Router{
    constructor(routes){
        this.__routes = routes
        this.__path = decodeURIComponent(window.location.pathname)
        this.__run()
        window.$__router__$ = this
    }

    testPath(path){
        if(isRegExp(path)) return path.test(this.__path)
        return path === this.__path
    }

    __run(){
        let flag = false
        for(let i = 0; i < this.__routes.length; i++){
            const route = this.__routes[i]
            if(this.testPath(route.path)){
                const temp = route.layout(this)
                if(isPromise(temp)) temp.then(v=>{v.default(this)})
                flag = true
                break
            }
        }
        // if(!flag){
        //     window.location = '/'
        // }
    }

    to(name, cb){
        for(let i = 0; i < this.__routes.length; i++){
            const route = this.__routes[i]
            if(route.path === name || route.name === name){
                cb && cb()
                window.location = route.path
            }
        }
    }
}

new Router([
    {
        name: "index",
        path: /^\/(index\.html)?(page\/\d+\/)?$/,
        layout: () => import('./layout/home/home')
    },
    {
        name: "post",
        path: /^\/\d{4}\/\d{2}\/\d{2}\/*/,
        layout: () => import("./layout/post/index")
    }
])