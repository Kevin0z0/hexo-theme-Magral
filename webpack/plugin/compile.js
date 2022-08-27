const {NormalModule, Compilation} = require('webpack')
const PLUGIN_NAME = 'CompilePlugin'

class CompilePlugin {
    constructor() {

    }
  
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
            const modifiedModules = []
            const tapCallback = (_, normalModule) => {
                const userRequest = normalModule.userRequest.replace(/\\/g, '/') || '';
                if(!/dev\/layout\/.*.js$/.test(userRequest)) return
                if (modifiedModules.includes(userRequest)) return
                normalModule.loaders = [
                    {
                        loader: require.resolve('./load'),
                        options: {
                            path: userRequest
                        }
                    }
                ]

                modifiedModules.push(userRequest)
            }
            NormalModule.getCompilationHooks(compilation).beforeLoaders.tap(
                PLUGIN_NAME,
                tapCallback
              );
          });
    }
  }

module.exports = CompilePlugin