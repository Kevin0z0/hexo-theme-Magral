export const fillPath = (path) => {
    if(!path.startsWith('/')) return '/' + path
    return path
}

