function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
}

function isPromise(value) {
    return Object.prototype.toString.call(value) === '[object Promise]'
}


class Router{
    constructor(routes){
        this.__routes = routes
        this.__path = decodeURIComponent(window.location.pathname)
        this.__run()
    }

    testPath(path){
        if(isRegExp(path)) return path.test(this.__path)
        return path === this.__path
    }

    __run(){
        for(let i = 0; i < this.__routes.length; i++){
            const route = this.__routes[i]
            if(this.testPath(route.path)){
                const temp = route.layout(this)
                if(isPromise(temp)) temp.then(v=>{v.default(this)})
                break
            }
        }
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
        path: '/',
        layout: () => import('./layout/home')
    }
])