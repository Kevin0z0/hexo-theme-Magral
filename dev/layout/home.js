import '../components/icon'
import LazyLoad from "vanilla-lazyload"
import anime from 'animejs/lib/anime.es.js';
import {fillPath} from '../utils/functions'


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

const bannerWrap = document.getElementById("banner-wrap")
const bannerArrowLeft = document.getElementById("banner-arrow-left")
const bannerArrowRight = document.getElementById("banner-arrow-right")
const bannerPic = document.getElementById("banner-pic")

let currentBannerIndex = 0

// const 

bannerArrowRight.addEventListener('click', ()=>{
    const imgBox = document.createElement('div')
    const nextBanner = (currentBannerIndex + 1) % bannerInfo.length
    currentBannerIndex = nextBanner
    const bannerMainImg = document.getElementsByClassName('banner__main__img')[0]
    imgBox.style = `background-image: url('${fillPath(bannerInfo[nextBanner].img)}')`
    imgBox.className = 'banner__main__img-next'
    bannerPic.appendChild(imgBox)

    anime({
        targets: bannerWrap,
        easing: 'linear',
        opacity: 0,
        duration: 200
    })

    anime({
        targets: bannerMainImg,
        translateX: '-100%',
        easing: 'linear',
        duration: 400
    })

    anime({
        targets: imgBox,
        translateX: '-100%',
        easing: 'linear',
        duration: 400,
        complete(){
            imgBox.className = 'banner__main__img'
            imgBox.style.transform = ''
            bannerPic.removeChild(bannerMainImg)
            anime({
                targets: bannerWrap,
                easing: 'linear',
                opacity: 1,
                duration: 200
            })
        }
    })
})

