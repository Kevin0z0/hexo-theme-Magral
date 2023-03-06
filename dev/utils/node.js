import { isInstance, isStr } from "./functions";

function insertChildren(element, node){
    if(isInstance(node, 'array')){
        for(const i of node){
            element.appendChild(createNode(i))
        }
    }else if(isInstance(node, 'object')){
        element.appendChild(createNode(node))
    }else if(isInstance(node, 'string')){
        element.innerHTML += node
    }else{
        element.appendChild(node)
    }
    return element
}


export function createNode(node){
    if(!('ele' in node)){ throw new Error("ele attribute is required") }
    const ele = document.createElement(node.ele)
    if('attr' in node){
        const attr = node.attr
        for(const i in attr){
            ele.setAttribute(i, attr[i])
        }
    }
    if('children' in node){
        insertChildren(ele, node.children)
    }
    return ele
}

export function addNode(field, node){
    if(isStr(field)){
        field = document.querySelectorAll(field)
    }
    return insertChildren(field, node)
}

