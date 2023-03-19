import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import copy from './copy';
import { addNode, createNode } from './node'

function init(){
    for(const i of document.querySelectorAll('.md p img')){    
        addNode(i.parentNode, {
            ele: 'div',
            attr: {class: 'img__title'},
            children: {
                ele: 'span',
                children: i.getAttribute('alt')
            }
        })
    }

    for(const i of document.querySelectorAll('.md > h1,h2,h3,h4,h5,h6')){
        const content = i.innerHTML
        const text = i.innerText
        i.innerHTML = "# "
        addNode(i, {
            ele: 'a',
            attr:{ href: "#" + text },
            children: content
        })
    }

    for(const i of document.querySelectorAll(".md pre[class*='language-']")){
        const language = i.getAttribute('data-language') || ''
        const wrapper = createNode({
            ele: 'div',
            attr: {class: 'md__code'},
        })
        wrapper.innerHTML = `<div class="md__code__head"><span class="md__code__btn"></span><span class="md__code__language">${language}</span><span class="iconfont icon-copy md__code__copy"></span></div>`
        wrapper.getElementsByClassName('md__code__copy')[0].addEventListener('click', ()=>{
            copy(i).then(()=>{
                console.log('copy success');
            }).catch(()=>{
                console.log('copy failed');
            })
        })
        i.parentNode.insertBefore(wrapper, i);
        wrapper.appendChild(i);
    }

    const gallery = new Viewer(document.getElementsByClassName('md')[0], {
        toolbar: {
            zoomIn: 1,
            zoomOut: 1,
            prev: 1,
            play: {
                size: 'large',
            },
            next: 1,
            rotateLeft: 4,
            rotateRight: 4,
        },
    });
}

init()