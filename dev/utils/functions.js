export const fillPath = (path) => {
    if(!path.startsWith('/')) return '/' + path
    return path
}

export const isNumber = (val) => {
    return typeof val === 'number'
}