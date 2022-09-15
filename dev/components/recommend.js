import { addNode } from '../utils/node'
import {resizeRegister, True} from '../utils/windowResize'
const RECOMMEND_BOX = "recommend__body__box"
const RECOMMEND_BODY = "recommend__body"
// const bigDesktop = (width) => {
//     console.log(recommendItem[0].offsetWidth);
//     return 0
// }


// resizeRegister(bigDesktop, function(){
//     console.log(222);
// })
const recommend__body = document.getElementsByClassName(RECOMMEND_BODY)[0]

resizeRegister(True, () => {
    const box = document.getElementsByClassName(RECOMMEND_BOX)
    const padding = parseInt(window.getComputedStyle(recommend__body).paddingLeft) * 2
    if(box[0].offsetWidth * box.length + (box.length - 1) * 80 + padding < recommend__body.offsetWidth) {
        console.log('add');
        return
    }
    let temp = box[0].offsetTop
    for(let i = 1; i < box.length; i++){
        if(box[i].offsetTop !== temp){
            const tempEle = document.getElementsByClassName(RECOMMEND_BODY)[0]
            const arr = []
            for(let j = i; j < box.length; j++){
                arr.push(box[j])
            }
            for(const e of arr){
                tempEle.removeChild(e)
            }
            break
        }
    }
})

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
                "data-bg": '/images/article-banner/QQ截图20220424203532.jpg'
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
                "data-bg": '/images/article-banner/QQ截图20220424203532.jpg'
            } 
        }
    ]
})