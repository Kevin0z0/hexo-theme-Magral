const EXPRESSION_CHAR = /\w+/
const USELESS_CHAR = " \t\n"

const isUselessChar = char => USELESS_CHAR.includes(char)

class ExpressionHandler{
    constructor(global, local, expression){
        this.global = global
        this.local = local
        this.expression = expression
        this.pos = 0
        this.len = expression.length
        this.handle()
    }

    getChar(){
        return this.expression[this.pos]
    }

    jumpUselessChar(){
        let char = this.getChar()
        while(isUselessChar(char)){
            this.pos++
            char = this.getChar()
        }
    }

    handle(){
        const contents = []
        while(this.pos < this.len){
            this.jumpUselessChar()
            contents.push(this.getVariable())
        }
        console.log(contents);
    }

    getVariable(){
        let char = this.getChar()
        const strArr = []
        while(char && EXPRESSION_CHAR.test(char)){
            strArr.push(char)
            this.pos++
            char = this.getChar()
        }
        return strArr.join('')
    }
}

new ExpressionHandler({"a":1}, {"i": 2}, "i")