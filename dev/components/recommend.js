import {resizeRegister} from '../utils/window'

const bigDesktop = (width) => {
    return width > 1800
}

const laptop = (width) => {
    return width > 1200 && width < 1800
}

resizeRegister(bigDesktop, function(){
    console.log(222);
})

resizeRegister(laptop, function(){
    console.log(111);
})
