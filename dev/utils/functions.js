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
