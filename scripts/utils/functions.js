hexo.extend.helper.register('fillPath', function(arg){
    if(!arg.startsWith('/')) return '/' + arg
    return arg
});
