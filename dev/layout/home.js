import '../components/icon'
import LazyLoad from "vanilla-lazyload"
import anime from 'animejs/lib/anime.es.js';
import {fillPath, isNumber} from '../utils/functions'


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


const mainContentTitle = document.getElementsByClassName('banner__main__wrap-title')[0]
const mainContentDate = document.getElementById('banner__main__date')
const mainTags = document.getElementsByClassName('banner__main__wrap-info-right')[0]
const sideBanner = document.getElementsByClassName('banner__side__pic')

const setATag = (tag, title, href) => {
    tag.innerText = title
    tag.setAttribute('href', href)
}

const replaceBannerMainContent = (index) => {
    setATag(mainContentTitle, bannerInfo[index].title, bannerInfo[index].path)
    mainContentDate.innerText = bannerInfo[index].date
    mainTags.innerHTML = ''
    let flag = true
    for(const i of bannerInfo[index].tags){
        const tag = document.createElement('a')
        tag.className = 'tag'
        if(flag){
            tag.className += ' tag__hover'
            flag = false
        }
        setATag(tag, i.name, i.path)
        mainTags.appendChild(tag)
    }
}

let bannerCount = 0

let timeout
let bannerSideIndex = 0

const sideAnime = (element, index) => {
    const oldImg = element.getElementsByClassName('banner__side__img')[0]
    const img = document.createElement('div')
    img.style = `background-image: url('${fillPath(bannerInfo[index].img)}')`
    img.className = 'banner__side__img'
    element.appendChild(img)
    anime({
        targets: oldImg,
        easing: 'easeOutQuad',
        duration: 400,
        marginTop: `-${oldImg.offsetHeight}`,
        complete(){
            element.removeChild(oldImg)
        }
    })
}

const calcIndex = (index, all) => {
    if(index >= 0) return index
    return all + index
}
let test = 0
const bannerAnime = (addNum) => {
    if(timeout) return bannerCount++
    const len = bannerInfo.length
    const imgBox = document.createElement('div')
    const nextBanner = (currentBannerIndex + addNum) % len
    const bannerMainImg = document.getElementsByClassName('banner__main__img')[0]
    imgBox.style = `background-image: url('${fillPath(bannerInfo[nextBanner].img)}')`
    imgBox.className = 'banner__main__img-next'
    bannerPic.appendChild(imgBox)

    bannerSideIndex = (bannerSideIndex + addNum) % (len - 1)
    sideAnime(sideBanner[test++ % (len - 1)], calcIndex(nextBanner-1, len))

    currentBannerIndex = nextBanner
    anime({
        targets: bannerWrap,
        easing: 'linear',
        opacity: 0,
        duration: 200
    })

    anime({
        targets: bannerMainImg,
        translateX: '-100%',
        easing: 'easeOutQuad',
        duration: 500
    })

    const runNext = () => {
        const temp = bannerCount
        bannerCount = 0
        timeout = 0
        bannerAnime(temp)
    }

    timeout = setTimeout(()=>{
        anime({
            targets: imgBox,
            translateX: '-100%',
            easing: 'easeOutQuad',
            duration: 500,
            complete(){
                imgBox.className = 'banner__main__img'
                imgBox.style.transform = ''
                bannerPic.removeChild(bannerMainImg)
                if(bannerCount) {
                    // for()
                    return runNext()
                }
                replaceBannerMainContent(nextBanner)
                anime({
                    targets: bannerWrap,
                    easing: 'linear',
                    opacity: 1,
                    duration: 200,
                    complete(){
                        if(bannerCount) return runNext()
                        timeout = 0
                        const imgList = []
                        imgList.add(imgBox.getAttribute('style'))
                        for(const i of sideBanner){
                            const data = i.getElementsByClassName('banner__side__img')[0].getAttribute('style')
                            if(imgList.has(data)){
                                // sideAnime(i, )
                            }
                        }
                    }
                })  
            }
        })
    }, 25)
}

bannerArrowRight.addEventListener('click', () => {
    bannerAnime(1)
})

