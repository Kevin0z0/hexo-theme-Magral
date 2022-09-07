import '../../components/icon'
import LazyLoad from "vanilla-lazyload"
import banner from './banner'
import Typed from 'typed.js';


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

if(typedConfig.enable){
    new Typed('.typed-main', {
        strings: typedConfig.sentences,
        typeSpeed: typedConfig.typeSpeed,
        loop: typedConfig.loop,
        backSpeed: typedConfig.backSpeed,
        showCursor: typedConfig.showCursor,
        startDelay: typedConfig.startDelay
      });
}
