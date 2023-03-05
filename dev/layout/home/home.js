import '../../components/icon'
import LazyLoad from "vanilla-lazyload"
import banner from './banner'
import Typed from 'typed.js';


if(recommend) import('../../components/recommend')

const menu = document.getElementsByClassName("header-big__center__list-name")
for(const i of menu){
    let href = i.getAttribute('href')
    if(!href.endsWith('/')) href += '/'
    if(href === decodeURIComponent(window.location.pathname)){
        i.setAttribute('style', "color: var(--primary-color)")
    }
}

const lazyLoadInstance = new LazyLoad({
    container: document.getElementById("main")
});


banner()



const typed = document.getElementsByClassName('typed')[0]
let typedHeight
if(typedConfig.enable){
    const typedSentences = new Typed('.typed-main', {
        strings: typedConfig.sentences,
        typeSpeed: typedConfig.typeSpeed,
        loop: typedConfig.loop,
        backSpeed: typedConfig.backSpeed,
        showCursor: typedConfig.showCursor,
        startDelay: typedConfig.startDelay,
        onBegin(){
            setTimeout(()=>{
                typedHeight = typed.offsetHeight
            },50)
        },
        onStringTyped(){
            const height = typed.offsetHeight
            if(typedHeight < height){
                typedHeight = height
                typed.style = `min-height: ${height}px`
            }
        },
        onComplete(){
            typed.style = ""
            typedHeight = typed.offsetHeight
            typed.style = `min-height: ${typedHeight}px`
        }
      });      
    typed.addEventListener("dblclick", ()=>{
        if(!typedSentences.pause.status) typedSentences.stop()
        else typedSentences.start()
    })
}