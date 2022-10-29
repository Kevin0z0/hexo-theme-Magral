import { addNode } from '../utils/node'
import {resizeRegister, True} from '../utils/windowResize'


const RECOMMEND_BOX  = "recommend__body__box"
const RECOMMEND_BODY = "recommend__body"
const GAP = 80


const recommend__body = document.getElementsByClassName(RECOMMEND_BODY)[0]
let index = 0

const addBox = (content) => {
    addNode(recommend__body, {
        ele: 'div',
        attr:{
            class: RECOMMEND_BOX + " radius"
        },
        children: [
            {
                ele: 'div',
                attr: {
                    "class": 'recommend__body__box-img cover lazy',
                    "style": `background-image: url("${content.img}");`
                }
            },
            {
                ele: 'div',
                attr: {
                    class: 'clearfix recommend__body__box-tags',
                },
                children: [
                    {
                        ele: 'span',
                    }
                ]
            },
            {
                ele: 'div',
                attr: {
                    "class": 'recommend__body__box-bg cover lazy',
                    "style": `background-image: url("${content.img}");`
                } 
            }
        ]
    })
}

resizeRegister(True, () => {
    const box = document.getElementsByClassName(RECOMMEND_BOX)
    const padding = parseInt(window.getComputedStyle(recommend__body).paddingLeft) * 2
    const boxWidth = box[0].offsetWidth
    const wrapWidth = recommend__body.offsetWidth
    const len = box.length
    if(boxWidth * len + (len - 1) * GAP + padding < wrapWidth) {
        const addNum = parseInt((wrapWidth - GAP) / boxWidth) - len
        for(let i = index + 1; i <= Math.min(addNum + index, recommendInfo.length); i++){
            addBox(recommendInfo[i])
        }
        return
    }
    let temp = box[0].offsetTop
    for(let i = 1; i < len; i++){
        if(box[i].offsetTop !== temp){
            const tempEle = document.getElementsByClassName(RECOMMEND_BODY)[0]
            for(let j = len - 1; j >= i; j--){
                tempEle.removeChild(box[j])
            }
            break
        }
    }
})

