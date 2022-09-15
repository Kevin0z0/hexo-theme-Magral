export const fillPath = (path) => {
    if(!path.startsWith('/')) return '/' + path
    return path
}

export const isInstance = (instance, name) => {
    return Object.prototype.toString.call(instance).toLowerCase() === `[object ${name.toLowerCase()}]`
}

export const isRegExp = (value) => {
    return isInstance(value, 'regexp')
}

export const isPromise = (value) => {
    return isInstance(value, 'promise')
}

export const isFunction = (value) => {
    return isInstance(value, 'function')
}

export const isStr = (value) => {
    return isInstance(value, 'string')
}

export const isNumber = (val) => {
    return isInstance(value, 'number')
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