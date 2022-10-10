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

const DEBUG = false

const isInstance = (instance, name) => {
    return Object.prototype.toString.call(instance).toLowerCase() === `[object ${name.toLowerCase()}]`
}


Array.prototype.extend = function(data){
    if(isInstance(data, "array")){
        this.push.apply(this, data)
    }else if(isInstance(data, "string")){
        this.push(data)
    }
}

function debug(){
    DEBUG && console.debug(...arguments)
}

const PROPS = ['v-if', 'v-for']


const handleProps = (key, value, props) => {
    const temp = key.substring(2)
    for(const item of props){
        if(item.name === temp){
            throw new Error('Props confliction')
        }
    }
    switch(key){
        case 'v-for':
            props.push(new VFor(value))
            break
        default:
            break
    }
}

const addItem = (key, value, obj) => {
    if(PROPS.includes(key)){
        return handleProps(key, value, obj.props)
    }
    const attr = obj.attr
    if(key in attr){
        if(value === EMPTY) return
        const data = attr[key]
        if(isInstance(data, 'array')){
            data.push(value)
        }else{
            attr[key] = [data, value]
        }
    }else{
        attr[key] = value
    }
}


class ElementNode {
    constructor(tag=undefined) {
       this.tag = tag;
       this.attr = {};
       this.children = [];
       this.selfClosing = false
       this.comment = false
       this.props = []
       this.dynamicAttr = {}
    }

    toJSON(){
        return {
            tag: this.tag,
            attr: this.attr,
            type: 'ElementNode',
            children: this.children,
            props: this.props,
            dynamicAttr: this.dynamicAttr
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


const VAR_CHAR = /\w+/
const START_PARENTHESE = '('
const CLOSE_PARENTHESE = ')'


class BaseExpressionHandler{
    constructor(expression){
        this.expression = expression
        this.pos = 0
    }

    getChar(){
        return this.expression[this.pos]
    }

    getCharAndNext(){
        return this.expression[this.pos++]
    }

    jumpUselessChar(){
        let char = this.getChar()
        while(isUselessChar(char)){
            this.pos++
            char = this.getChar()
        }
    }

    __getVars(){
        this.jumpUselessChar()
        let char = this.getChar()
        const arr = []
        while(char !== CLOSE_PARENTHESE){
            if(char === ','){
                this.jumpUselessChar()
                char = this.getChar()
                continue 
            }
            this.jumpUselessChar()
            arr.push(this.getVariable())
            this.jumpUselessChar()
            char = this.getCharAndNext()
        }
        return arr
    }

    getVariable(){
        let char = this.getChar()
        if(char === START_PARENTHESE){
            this.pos++
            return this.__getVars()
        }
        let strArr = []
        while(char && VAR_CHAR.test(char)){
            strArr.push(char)
            this.pos++
            char = this.getChar()
        }
        return strArr.join(EMPTY)
    }

    handle(){
        throw new Error("Function handle must be overwrited")
    }
}

class VFor extends BaseExpressionHandler{
    constructor(expression){
        super(expression)
        this.local = []
        this.var = null
        this.handle()
    }
    handle(){
        this.jumpUselessChar()
        this.local.extend(this.getVariable())
        this.pos++
        if(this.getVariable() !== 'in'){
            throw new Error("v-for expression must use in")
        }
        this.pos++
        this.var = this.expression.substring(this.pos)
    }

    toJSON(){
        return {
            local: this.local,
            var: this.var,
            name: 'for'
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
                    debug('PARSE_START')
                    this.parseStart()
                    break
                case PARSE_TAG:
                    debug('PARSE_TAG')
                    this.parseTag(node)
                    break
                case PARSE_ATTR:
                    debug('PARSE_ATTR')
                    this.parseAttr(node)
                    break
                case MAIN_TAG_END:
                    debug('MAIN_TAG_END')
                    this.mainTagEnd(node)
                    break
                case PARSE_TEXT:
                    debug('PARSE_TEXT')
                    this.parseText(node)
                    break
                case PARSE_CLOSING_TAG:
                    debug('PARSE_CLOSING_TAG')
                    this.parseClosingTag(node)
                    break
                case PARSE_END:
                    debug('PARSE_END')
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
        this.pos = parser.pos
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
            addItem(attrKey, EMPTY, node)
            this.status = PARSE_ATTR
            return
        }else{
            this.next()
            this.jumpUselessChar()
        }
        let attrValue = this.parseAttrValue()
        addItem(attrKey, attrValue, node)
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
    const template = `<div class="abc" v-for="i in data">{{i}}</div>`
    // const template = `<div class="abc"></div>`
    
    console.log(JSON.stringify(new HTMLParse(template, 0).parse()));
    // console.log(new HTMLParse(template, 0).parse());
}

const a = (scope)=>{
    return {
        "tag":"div",
        "attr":{
            "class":"abc",
            "v-for":"i in data"
        },
        "type":"ElementNode","children":[
            {"text":"{{i}}","type":"TextNode"}
        ]
    }
}


// console.log(new VFor("(item, key, index) in data"));


// var getter = function(expression){
//     const a = 1
//     return new Function('scope, i', 'return i')
// }

// var model = {
//     message: "data from res getter"
// }

// console.log((getter.call(null, 'message'))(model));