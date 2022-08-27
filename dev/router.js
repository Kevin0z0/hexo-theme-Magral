import home from './layout/home'

class Router{
    constructor(routes){
        this.__routes = routes
        this.__run()
    }

    __run(){
        const path = decodeURIComponent(window.location.pathname)
        for(let i = 0; i < this.__routes.length; i++){
            const route = this.__routes[i]
            if(route.path === path){
                route.layout(this)
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