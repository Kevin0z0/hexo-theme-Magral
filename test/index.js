const isInstance = (instance, name) => {
    return Object.prototype.toString.call(instance).toLowerCase() === `[object ${name.toLowerCase()}]`
}

const instance = i => /\[object (.*)\]/.exec(Object.prototype.toString.call(i).toLowerCase())

const data = (scope) => {
    return {
        scope,
        "tag": "div", 
        "attr": { "class": "abc" }, 
        "type": "ElementNode", 
        "children": [
            { 
                "text": "{{i}}", 
                "type": "TextNode" 
            }
        ], 
        "props": [
            { 
                "local": ["i", "j"], 
                "var": "data", 
                "name": "for" 
            }
        ], 
        "dynamicAttr": {}
    }
}


function handleLocal(obj, local, variable){
    if(isInstance(variable, 'array')){
        if(local.length > 2) throw new Error('v-for variable are too many')
        return (index, count) => {
            switch(index){
                case 0:
                    obj[local[index]] = variable[count]
                    break
                case 1:
                    obj[local[index]] = count
                    break
            }
        }
    }else{
        if(local.length > 3) throw new Error('v-for variable are too many')
        const keys = Object.keys(variable)
        return (index, count) => {
            switch(index){
                case 0:
                    obj[local[index]] = variable[keys[count]]
                    break
                case 1:
                    obj[local[index]] = keys[count]
                    break
                case 2:
                    obj[local[index]] = count
                    break
            }
        }
    }
}

function getLength(obj){
    if(isInstance(obj, 'array')) return obj.length
    return Object.keys(obj).length
}

function handleNode(tree){
    const tag = document.createElement(tree.tag)
    if('attr' in tree){
        const attr = tree.attr
        for(const i in attr){
            tag.setAttribute(i, attr[i])
        }
    }
    return tag
}


function handleProps(node, tree){
    const props = tree.props
    const scope = tree.scope
    for(const i of props){
        if(i.name === 'for'){
            const variable = (new Function('scope', `return scope["${i.var}"]`)).call(null, scope)
            if(!typeof variable === 'object') throw new Error("v-for data type Error")
            const local = {}
            const handle = handleLocal(local, i.local, variable)
            for(let count = 0; count < getLength(variable); count++){
                for(let index = 0; index < i.local.length; index++){
                    handle(index, count)
                }
                node.appendChild(handleNode(tree))
            }
            
            
        }
    }
}

function createNode(node, tree) {
    const scope = tree.scope
    if(!('tag' in tree)){ throw new Error("tag attribute is required") }
    if(tree.props) {
        handleProps(node, tree)
    }else{
        
    }
    // if('children' in node){
    //     insertChildren(ele, node.children)
    // }
    // return tag
}

console.log(createNode(document.getElementById("main"), data({
    "data": {'a':1, 'b':'v', 'c': 'd'}
})));
