const TAG_START            = "<"
const TAG_END              = ">"
const USELESS_CHAR         = " \t\n"
const TAG_CHAR             = /[\w\-]/
const SELF_CLOSING_TAG_END = "/"
const SELF_CLOSING_TAG     = ['meta', 'input', 'img', 'hr', 'br', 'link', 'embed', 'source', 'keygen', 'base']
const STRING_QUOTES        = `"'`
const EQUAL                = '='
const EMPTY                = ""

const isUselessChar        = char => USELESS_CHAR.includes(char)
const isTagChar            = char => TAG_CHAR.test(char)

let   PARSE_ENUM           = 0           
const PARSE_DEFAUTE        = PARSE_ENUM++
const PARSE_START          = PARSE_ENUM++
const PARSE_TAG            = PARSE_ENUM++
const PARSE_ATTR           = PARSE_ENUM++
const MAIN_TAG_END         = PARSE_ENUM++
const PARSE_TEXT           = PARSE_ENUM++
const TEXT_END             = PARSE_ENUM++
const PARSE_CLOSING_TAG    = PARSE_ENUM++
const PARSE_END            = PARSE_ENUM++

const isInstance = (instance, name) => {
    return Object.prototype.toString.call(instance).toLowerCase() === `[object ${name.toLowerCase()}]`
}

const addItem = (key, value, obj) => {
    if(key in obj){
        if(value === EMPTY) return
        const data = obj[key]
        if(isInstance(data, 'array')){
            data.push(value)
        }else{
            obj[key] = [data, value]
        }
    }else{
        obj[key] = value
    }
}


class ElementNode {
    constructor(tag=undefined) {
       this.tag = tag;
       this.attr = {};
       this.children = [];
       this.selfClosing = false
       this.comment = false
    }

    toJSON(){
        return {
            tag: this.tag,
            attr: this.attr,
            type: 'ElementNode',
            children: this.children
        }
    }
}

class TextNode {
    constructor(content){
        this.content = content
    }

    toJSON(){
        return {
            text: this.content,
            type: 'TextNode',
        }
    }
}

class HTMLParse{
    constructor(source, pos){
        this.source = source
        this.pos = pos
        this.status = PARSE_START
    }

    jumpUselessChar(){
        let pos = this.pos
        let char = this.source[pos]
        while(isUselessChar(char)){
            pos++
            char = this.source[pos]
        }
        this.pos = pos
    }

    parse(){
        const node = new ElementNode()
        let flag = true
        while(flag){
            switch(this.status){
                case PARSE_START:
                    this.parseStart()
                    break
                case PARSE_TAG:
                    this.parseTag(node)
                    break
                case PARSE_ATTR:
                    this.parseAttr(node)
                    break
                case MAIN_TAG_END:
                    this.mainTagEnd(node)
                    break
                case PARSE_TEXT:
                    this.parseText(node)
                    break
                case PARSE_CLOSING_TAG:
                    this.parseClosingTag(node)
                    break
                case PARSE_END:
                    this.parseEnd(node)
                    break
                case PARSE_DEFAUTE:
                default:
                    flag = false
                    break
            }
        }
        return node
    }

    parseStart(){
        this.jumpUselessChar()
        if(this.getChar() !== TAG_START){
            throw new Error("Unexpected HTML format")
        }
        this.pos++
        this.status = PARSE_TAG
    }

    getTagName(){
        let char = this.getChar()
        let strArr = []
        while(!isUselessChar(char) && char !== TAG_END){
            if(isTagChar){
                strArr.push(char)
                char = this.next()
            }else{
                throw new Error("Unexpexted charcode in the tag name")
            }
        }
        return strArr.join(EMPTY)
    }

    parseTag(node){
        this.jumpUselessChar()
        const str = this.getTagName()
        if(str.startsWith('!--')){
            node.comment = true
        }
        if(SELF_CLOSING_TAG.includes(str) || str.startsWith('!')){
            node.selfClosing = true
        }
        this.status = this.getChar() === TAG_END ? MAIN_TAG_END : PARSE_ATTR
        this.pos++
        node.tag = str
    }

    mainTagEnd(node){
        this.jumpUselessChar()
        let char = this.getChar()
        if(char === TAG_START){
            char = this.next()
            if(char === '/'){
                this.status = PARSE_CLOSING_TAG
                this.pos++
                return
            }
            this.parseNewNode(node)
        }
        this.status = PARSE_TEXT
    }

    parseNewNode(node){
        const parser = new HTMLParse(this.source, this.pos-1)
        node.children.push(parser.parse())
        this.pos = parser.pos + 1
    }

    parseText(node){
        let char = this.getChar()
        const arr = []
        let flag = true
        while(true){
            if(char === TAG_START) {
                char = this.next()
                if(char === '/') {
                    this.status = PARSE_CLOSING_TAG
                    this.pos++
                    flag = false
                    break
                }
                else {
                    node.children.push(new TextNode(arr.join('')))
                    this.parseNewNode(node)
                    this.pos--
                    arr.length = 0
                }
            }else{
                arr.push(char)
            }
            char = this.next()
        }
        
        arr.length && node.children.push(new TextNode(arr.join('')))
        if(flag){
            this.status = PARSE_DEFAUTE
        }
    }

    parseClosingTag(node){
        if(this.getTagName() !== node.tag){
            throw new Error(`Element <${node.tag}> closing tag required`)
        }
        this.jumpUselessChar()
        if(this.getChar() !== TAG_END){
            throw new Error(`<${node.tag}> closing tag ERROR`)
        }
        this.pos++
        this.status = PARSE_END
    }

    parseEnd(node){
        // this.jumpUselessChar()
        // let char = this.getChar()
        this.status = PARSE_DEFAUTE
    }

    stringStart(char){
        return this.stringStatus === NONE_STATUS && STRING_QUOTES.includes(char)
    }

    getChar = () => this.source[this.pos]

    next(num=1, pos=undefined){
        this.pos = (pos || this.pos) + num
        return this.getChar()
    }

    prev = () => this.source[this.pos - 1]

    parseAttr(node){
        this.jumpUselessChar()
        let char = this.getChar()
        if(char === TAG_END){
            this.pos++
            this.status = MAIN_TAG_END
            return
        }else if(char === SELF_CLOSING_TAG_END){
            if(!SELF_CLOSING_TAG.includes(node.tag)){
                throw new Error(`The ${node.tag} tag is not self closing tag`)
            }
            char = this.next()
            if(isUselessChar(char)){
                this.jumpUselessChar()
                char = this.next()
            }
            if(char === TAG_END){
                this.status = PARSE_TEXT
                return
            }
        }
        
        let attrKey = []
        while(
            !isUselessChar(char) && 
            char !== EQUAL && 
            char !== TAG_END
        ){
            attrKey.push(char)
            char = this.next()
        }
        attrKey = attrKey.join(EMPTY)
        this.jumpUselessChar()
        if((char = this.getChar()) !== EQUAL){
            addItem(attrKey, EMPTY, node.attr)
            this.status = PARSE_ATTR
            return
        }else{
            this.next()
            this.jumpUselessChar()
        }
        let attrValue = this.parseAttrValue()
        addItem(attrKey, attrValue, node.attr)
        this.status = PARSE_ATTR
    }

    parseAttrValue(){
        let char = this.getChar()
        let quote
        if(STRING_QUOTES.includes(char)){
            quote = char
            char = this.next()
        }
        const strArr = []
        while(true){
            if(char === '\\'){
                strArr.push(this.source.substring(this.pos, this.pos+2))
                char = this.next(2)
            }else if(
                (quote && char === quote) || 
                (!quote && (isUselessChar(char) || char === TAG_END))
            ){
                quote && this.next()
                return strArr.join(EMPTY)
            }
            strArr.push(char)
            char = this.next(1)
        }
    }
}

module.exports = HTMLParse

if(module.id === '.'){
    const template = `<div class="abc"> <span>1</span></div>`
    
    console.log(JSON.stringify(new HTMLParse(template, 0).parse()));
    // console.log(new HTMLParse(template, 0).parse());
}

const a = ()=>{
    const scope = {
        data: ['1','2','3']
    }
    return {
        scope,
        "tag": "div",
        "attr": {
            "class": "abc",
            "v-for": "i in data"
        },
        "type": "ElementNode",
        "children": [{
            "text": "{{i}}",
            "type": "TextNode"
        }]
    }
}

var getter = function(expression){
    const a = 1
    return new Function('scope, i', 'return i')
}

var model = {
    message: "data from res getter"
}

console.log((getter.call(null, 'message'))(model));