import '../../utils/markdown';
import tabs from '../../components/icon';
import scrollIntoView from 'scroll-into-view-if-needed'
import tocbot from 'tocbot'
import _ from 'lodash'



tabs('header-small__right__list-name')
const title = document.getElementsByClassName("post-banner__wrap-title")[0]
const main = document.getElementsByClassName("post")[0]
title.addEventListener('click', () =>{
    scrollIntoView(main, { behavior: 'smooth', scrollMode: 'always', block: 'start', inline: 'start'})
})

window.addEventListener("load", () => {
    const hash = decodeURI(location.hash).substring(1)
    const item = document.getElementById(hash)
    if(item) scrollIntoView(item, { behavior: 'smooth', scrollMode: 'always', block: 'start', inline: 'start'})
})

tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.md',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    headingLabelCallback: (e)=>{return e.substring(2)}
})

const markdownMain = document.getElementsByClassName('post')[0]
const toc = document.getElementsByClassName('toc')[0]
function setTocFixed(){
    const top = markdownMain.getBoundingClientRect().top
    if (top < 85) {
        toc.className = "toc toc__fixed"
    }else{
        toc.className = "toc"
    }
}

window.addEventListener('scroll', _.throttle(setTocFixed, 100))