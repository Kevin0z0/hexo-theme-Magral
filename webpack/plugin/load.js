const parser = require("@babel/parser")

module.exports = function(source) {
    try{
        const body = parser.parse(source, {
            sourceType: "module"
        }).program.body
        
    }catch(e){
        console.log(e.loc);
    }
    return
    let pos = 0
    for(const i of body){
        if(i.type !== 'ImportDeclaration'){
            pos = i.start
            break
        }
    }
    
    const compiled = `${source.substring(0, pos)}\nexport default function(router){${source.substring(pos)}\n}`
    return compiled
};