hexo.extend.helper.register('fillPath', function(arg){
    if(arg && !arg.startsWith('/')) return '/' + arg
    return arg
});
