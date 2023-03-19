import './router'
import _ from 'lodash'

const getHeader = () => {
    const small = document.getElementsByClassName('header-small')[0]
    if(!small) return document.getElementsByClassName('header-big')[0]
    return small
}

const body = document.getElementsByTagName('body')[0]
const setHeaderFixed = () => {
    const header = getHeader()
    const top = body.getBoundingClientRect().top
    if(!flag && top < -100){
        header.className += ' header-fix'
        flag = true
    }else if(flag && top >= -100){
        header.className = header.className.split(' ')[0]
        flag = false
    }
}
let flag = false
window.addEventListener('scroll', _.throttle(setHeaderFixed, 50))