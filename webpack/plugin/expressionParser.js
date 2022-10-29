const parser = require("@babel/parser")


class Node{
    constructor(type, data){
        this.type = type
        this.content = data
    }
}


// new ExpressionHandler({"a":1}, {"i": 2}, "i++")
const template = `data[name]`
const body = parser.parse(template, {
    sourceType: "module"
}).program.body

function handleIdentifier(node, content){
    content.push(new Node('var', node.name))
}

function handleCall(node, content){
    content.push
}

function handleExpression(node, content){
    switch(node.type){
        case "Identifier":
            handleIdentifier(node, content)
            break
        case "CallExpression":
            handleCall(node, content)
            break
    }
}

console.log(body[0]);
const content = []   
for(const i of body){
    handleExpression(i.expression, content)
}

console.log(content);