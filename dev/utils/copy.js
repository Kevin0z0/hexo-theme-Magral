import { isElement } from "./functions";

function copy(text){
    return new Promise((res, rej) => {
        if(navigator.clipboard){
            res(navigator.clipboard.writeText(text))
        }else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            try{
                document.execCommand('copy')
                res()
            }catch(e){
                rej(e)
            }
        }
        rej("该浏览器不支持复制操作，请使用其他浏览器")
    })
     
}

export default function(element, text){
    if(!text){
        text = ''
    }
    if(isElement(element)){
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
        const content = selection.toString()
        const status = copy(content + text)
        selection.removeAllRanges()
        return status
    }
}