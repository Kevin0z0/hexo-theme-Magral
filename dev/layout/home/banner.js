import anime from 'animejs/lib/anime.es.js';
import {fillPath, isNumber} from '../../utils/functions'

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
const imgData = bannerInfo.map(v=>v.img)

const sideAnime = (element, index) => {
    const oldImg = element.getElementsByClassName('banner__side__img')[0]
    const img = document.createElement('div')
    const title = element.getElementsByClassName('banner__side__title')[0]
    img.style = `background-image: url('${fillPath(imgData[index])}')`
    img.className = 'banner__side__img'
    element.appendChild(img)

    anime({
        targets: title,
        easing: 'linear',
        opacity: 0,
        duration: 200
    })
    anime({
        targets: oldImg,
        easing: 'easeOutQuad',
        duration: 400,
        marginTop: `-${oldImg.offsetHeight}`,
        complete(){
            title.innerText = bannerInfo[index].title
            title.setAttribute("href", bannerInfo[index].path)
            element.removeChild(oldImg)

            anime({
                targets: title,
                easing: 'linear',
                opacity: 1,
                duration: 200
            })
        }
    })
}

const calcIndex = (index, all) => {
    if(index < 0) return (all + index) % all
    return index % all
}
const bannerListDot = document.getElementsByClassName('banner__main__dot-item')
const above = symbol => symbol > 0

let listDotIndex = 0
const active = (index) => {
    bannerListDot[listDotIndex].className = 'banner__main__dot-item'
    listDotIndex = index
    bannerListDot[index].className = 'banner__main__dot-item banner__main__dot-active'
}

const bannerAnime = (addNum, symbol) => {
    if(timeout) {
        if(bannerCount) return
        return bannerCount++
    }
    const len = bannerInfo.length
    const imgBox = document.createElement('div')
    const nextBanner = calcIndex(currentBannerIndex + addNum * symbol, len)
    const bannerMainImg = document.getElementsByClassName('banner__main__img')[0]
    imgBox.style = `background-image: url('${fillPath(imgData[nextBanner])}')`
    imgBox.className = 'banner__main__img-' + (above(symbol) ? "next" : "prev")
    bannerPic.appendChild(imgBox)


    for(let i = 0; i < sideBanner.length; i++){
        if(sideBanner[i].getElementsByClassName('banner__side__img')[0].getAttribute('style').includes(imgData[nextBanner]))
        sideAnime(sideBanner[i], currentBannerIndex)
    }
    
    active(nextBanner)
    currentBannerIndex = nextBanner
    
    anime({
        targets: bannerWrap,
        easing: 'linear',
        opacity: 0,
        duration: 200
    })

    anime({
        targets: bannerMainImg,
        translateX: (above(symbol) ? '-' : "") + '100%',
        easing: 'easeOutQuad',
        duration: 500
    })

    const runNext = () => {
        const temp = bannerCount
        bannerCount = 0
        timeout = 0
        bannerAnime(temp, symbol)
    }

    timeout = setTimeout(()=>{
        anime({
            targets: imgBox,
            translateX: (above(symbol) ? '-' : "") + '100%',
            easing: 'easeOutQuad',
            duration: 500,
            complete(){
                imgBox.className = 'banner__main__img'
                imgBox.style.transform = ''
                bannerPic.removeChild(bannerMainImg)
                if(bannerCount) return runNext()
                replaceBannerMainContent(nextBanner)
                anime({
                    targets: bannerWrap,
                    easing: 'linear',
                    opacity: 1,
                    duration: 200,
                    complete(){
                        if(bannerCount) return runNext()
                        timeout = 0
                    }
                })  
            }
        })
    }, 25)
}

bannerArrowRight.addEventListener('mousedown', () => {
    bannerAnime(1, 1)
})

bannerArrowLeft.addEventListener('mousedown', () => {
    bannerAnime(1, -1)
})

setInterval(()=>{
    bannerAnime(1, 1)
}, 6000)