"use strict";(self.webpackChunkmagral=self.webpackChunkmagral||[]).push([[708],{16:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var o=n(949),c=n.n(o),r=(n(770),n(223));function d(e,t){if(t||(t=""),(0,r.kK)(e)){const n=window.getSelection(),o=document.createRange();o.selectNodeContents(e),n.removeAllRanges(),n.addRange(o);const c=function(e){return new Promise(((t,n)=>{if(navigator.clipboard)t(navigator.clipboard.writeText(e));else if(document.queryCommandSupported&&document.queryCommandSupported("copy"))try{document.execCommand("copy"),t()}catch(e){n(e)}n("该浏览器不支持复制操作，请使用其他浏览器")}))}(n.toString()+t);return n.removeAllRanges(),c}}var a=n(291);function l(e){console.log(1)}!function(){for(const e of document.querySelectorAll(".md p img"))(0,a.g)(e.parentNode,{ele:"div",attr:{class:"img__title"},children:{ele:"span",children:e.getAttribute("alt")}});for(const e of document.querySelectorAll(".md > h1,h2,h3,h4,h5,h6")){const t=e.innerText;e.innerHTML="",(0,a.g)(e,{ele:"a",attr:{href:"#"+t},children:"# "+t})}for(const e of document.querySelectorAll(".md > pre[class*='language-']")){const t=e.getAttribute("data-language")||"",n=(0,a.d)({ele:"div",attr:{class:"md__code"}});n.innerHTML=`<div class="md__code__head"><span class="md__code__btn"></span><span class="md__code__language">${t}</span><span class="iconfont icon-copy md__code__copy"></span></div>`,n.getElementsByClassName("md__code__copy")[0].addEventListener("click",(()=>{d(e).then((()=>{console.log("copy success")})).catch((()=>{console.log("copy failed")}))})),e.parentNode.insertBefore(n,e),n.appendChild(e)}new(c())(document.getElementsByClassName("md")[0],{toolbar:{zoomIn:1,zoomOut:1,prev:1,play:{size:"large"},next:1,rotateLeft:4,rotateRight:4}})}()},291:(e,t,n)=>{n.d(t,{d:()=>r,g:()=>d});var o=n(223);function c(e,t){if((0,o.$O)(t,"array"))for(const n of t)e.appendChild(r(n));else(0,o.$O)(t,"object")?e.appendChild(r(t)):(0,o.$O)(t,"string")?e.innerText=t:e.appendChild(t)}function r(e){if(!("ele"in e))throw new Error("ele attribute is required");const t=document.createElement(e.ele);if("attr"in e){const n=e.attr;for(const e in n)t.setAttribute(e,n[e])}return"children"in e&&c(t,e.children),t}function d(e,t){(0,o.d8)(e)&&(e=document.querySelectorAll(e)),c(e,t)}},527:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC"}}]);