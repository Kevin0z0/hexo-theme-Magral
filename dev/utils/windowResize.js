import {isFunction, throttle} from './functions'

const immediateMap = new Map()
const delayMap     = new Map()


const run = (map=immediateMap) => {
    const width = window.innerWidth
    const height = window.innerHeight
    map.forEach((set, key) => key(width, height) && set.forEach(item => item()))
}

const runDelay = throttle(()=>{
    run(delayMap)
}, 300)


window.addEventListener('resize', ()=>{
    run()
    runDelay()
})


const addAction = (map, sizeFunc, method) => {
    if(map.has(sizeFunc))
        map.get(sizeFunc).add(method)
    else{
        map.set(sizeFunc, new Set([method]))
    }
}


export function resizeRegister(sizeFunc, action){
    const isImmediate = !!action.immediate
    const method = isFunction(action) ? action : action.method
    if(!method){
        throw new Error("A method function required")
    }
    if(isImmediate){
        addAction(immediateMap, sizeFunc, method)
    }else{
        addAction(delayMap, sizeFunc, method)
    }
}

export function resizeUnregister(sizeFunc, action){

}

export const True = () => true