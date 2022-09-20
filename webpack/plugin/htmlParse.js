const template = `
<img src="/" / >

</div>`

class ElementNode {
    constructor(tag=undefined) {
       this.tag = tag;
       this.attr = {};
       this.text = '';
       this.children = [];
       this.selfClosing = false
       this.comment = false
    }
}

const TAG_START        = "<"
const TAG_END          = ">"
const USELESS_CHAR     = " \t\n"
const TAG_CHAR         = /[\w\-]/
const SELF_CLOSING_TAG_END = "/"
const SELF_CLOSING_TAG = ['meta', 'input', 'img', 'hr', 'br', 'link', 'embed', 'source', 'keygen', 'base']
const STRING_QUOTES    = `"'`
const EQUAL            = '='
const EMPTY            = ""

const START_STATUS     = Symbol('start')
const END_STATUS       = Symbol('end')
const NONE_STATUS      = Symbol('none')

const isUselessChar = char => USELESS_CHAR.includes(char)

const isTagChar = char => TAG_CHAR.test(char)

const PARSE_START = 1
const PARSE_TAG = 2
const PARSE_ATTR = 3
const MAIN_TAG_END = 4
const PARSE_TEXT = 5
const TEXT_END = 6
const PARSE_CLOSING_TAG = 7
const PARSE_CHILD = 8
const PARSE_END = 9

class HTMLParse{
    constructor(source, pos){
        this.source = source
        this.pos = pos
        this.stringStatus = NONE_STATUS
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
        let flag = false
        while(true){
            if(flag) break
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
                case PARSE_END:
                default:
                    flag = true
                    break
            }
        }
        console.log(node);
    }

    parseStart(){
        this.jumpUselessChar()
        if(this.getChar() !== TAG_START){
            throw new Error("Unexpected HTML format")
        }
        this.pos++
        this.status = PARSE_TAG
    }

    parseTag(node){
        this.jumpUselessChar()
        let char = this.getChar()
        let strArr = []
        while(!isUselessChar(char)){
            if(isTagChar){
                strArr.push(char)
                char = this.next()
            }else{
                throw new Error("Unexpexted charcode in the tag name")
            }
        }
        strArr = strArr.join(EMPTY)
        if(strArr.startsWith('!--')){
            node.comment = true
        }
        if(SELF_CLOSING_TAG.includes(strArr) || strArr.startsWith('!')){
            node.selfClosing = true
        }
        this.pos++
        node.tag = strArr
        this.status = PARSE_ATTR
    }

    stringStart(char){
        return this.stringStatus === NONE_STATUS && STRING_QUOTES.includes(char)
    }

    getChar = () => this.source[this.pos]

    next(num=1, pos=undefined){
        if(pos === undefined){
            this.pos += num
        }else{
            this.pos = pos + num
        }
        return this.getChar()
    }

    prev = () => this.source[this.pos - 1]

    parseAttr(node){
        this.jumpUselessChar()
        let char = this.getChar()
        if(char === TAG_END){
            this.status = 11
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
            node.attr[attrKey] = EMPTY
            this.status = PARSE_ATTR
            return
        }else{
            this.next()
            this.jumpUselessChar()
        }
        let attrValue = this.parseAttrValue()
        node.attr[attrKey] = attrValue
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

new HTMLParse(template, 0).parse()