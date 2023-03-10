function fillPath(arg){
    if(arg && !arg.startsWith('/')) return '/' + arg
    return arg
}
hexo.extend.helper.register('fillPath', fillPath);
hexo.extend.helper.register('banner', function(img){
    if(!img) return fillPath(this.theme.default_banner)
    return fillPath(img)
})