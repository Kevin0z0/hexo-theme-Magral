export const fillPath = (path) => {
    if(!path.startsWith('/')) return '/' + path
    return path
}

export const isNumber = (val) => {
    return typeof val === 'number'
}

export const isRegExp = (value) => {
    return Object.prototype.toString.call(value) === '[object RegExp]'
}

export const isPromise = (value) => {
    return Object.prototype.toString.call(value) === '[object Promise]'
}

export const isFunction = (value) => {
    return Object.prototype.toString.call(value) === '[object Function]'
}

export const throttle = (fn, delay) => {
    let valid = true
    return () => {
        if(!valid) return
        valid = false
        setTimeout(() => {
            fn && fn()
            valid = true;
        }, delay)
    }
}