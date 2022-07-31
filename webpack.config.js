const fs = require('fs')
const path = require('path');
const webpack = require('webpack');

const dir = path.resolve(__dirname,'./source/js/')

function deleteMap(){
    fs.readdirSync(dir).forEach(function(item){
        const fullPath = path.join(dir, item)
        if(fs.statSync(fullPath).isDirectory()) return deleteMap(fullPath)
        if(item.endsWith('.js.map')) fs.unlink(fullPath,()=>{})
    })
}

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development'
    if(!isDev) deleteMap()

    return {
        entry: {
            index: './dev/index.js',
        },
        output: {
            filename: '[name].js',
            path: dir
        },
        devtool: isDev ? 'source-map' : false,
        mode: argv.mode,
        module: {},
        resolve: {
            extensions: ['.js']
        },
        devServer: {
            liveReload: true,
            port: 60002,
            setupMiddlewares: (middlewares, devServer) => {
                devServer.app.use("*", (req, res, next) => {
                    res.header("Access-Control-Allow-Credentials", "true")
                    res.header("Access-Control-Allow-Origin", "*")
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept")
                    res.header("Access-Control-Allow-Methods", "POST, GET")
                    next()
                })
                return middlewares;
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}