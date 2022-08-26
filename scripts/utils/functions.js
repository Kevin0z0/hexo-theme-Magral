hexo.extend.helper.register('fillPath', function(arg){
    if(!arg.startsWith('/')) return '/' + arg
    return arg
});

hexo.extend.helper.register('getUrl', function(url){
    return url.replace("http://example.com", "")
});
