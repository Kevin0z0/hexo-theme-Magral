import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

tippy('.tippy-right', {
  theme: 'magral-right',
  arrow: false,
  allowHTML: true,
  // trigger: 'click'
})

tippy('.tippy-top', {
  theme: 'magral-top',
  arrow: false,
  allowHTML: true,
  // trigger: 'click'
})

export default function(element){
  const menuList = document.getElementsByClassName(element)
  for(const i of menuList){
    const next = i.nextElementSibling
    if(next){
      tippy(i, {
        theme: 'magral-menu',
        arrow: false,
        allowHTML: true,
        content: next,
        interactive: true,
        // trigger: 'click'
      })
    }
  }
}

