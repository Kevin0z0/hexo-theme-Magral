import './icon'

const menu = document.getElementsByClassName("header-big__center__list-name")
for(const i of menu){
    let href = i.getAttribute('href')
    if(!href.endsWith('/')) href += '/'
    if(href === decodeURIComponent(window.location.pathname)){
        i.setAttribute('style', "color: var(--primary-color)")
    }
}