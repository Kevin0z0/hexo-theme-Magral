const parser = require("@babel/parser")
const HTMLParse = require('./htmlParse')

module.exports = function(source) {
    let body
    while(true){
        try{
            body = parser.parse(source, {
                sourceType: "module"
            }).program.body
            break
        }catch(e){
            const parse = new HTMLParse(source, e.loc.index)
            source = `${source.substring(0, e.loc.index)}${JSON.stringify(parse.parse())}${source.substring(parse.pos)}`
        }
    }

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