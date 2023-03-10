import '../../utils/markdown';
import tabs from '../../components/icon';
import scrollIntoView from 'scroll-into-view-if-needed'




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