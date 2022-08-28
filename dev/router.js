import home from './layout/home'

function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
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
                route.layout(this)
                break
            }
        }
    }

    to(name){
        for(let i = 0; i < this.__routes.length; i++){
            const route = this.__routes[i]
            if(route.path === name || route.name === name){
                window.location = route.path
            }
        }
    }
}

new Router([
    {
        name: "index",
        path: '/',
        layout: home
    }
])