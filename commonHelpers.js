import{S as P,a as $,i as l}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();let m;function g(e){const t=document.querySelector("#gallery"),a=e.map(({webformatURL:i,largeImageURL:r,tags:s,likes:u,views:v,comments:w,downloads:E})=>`
    <a class="gallery-link" href="${r}">
    <img src="${i}" class="gallery-image" alt="${s}" loading="lazy"/>
    <div class="inform">
    <p><b>Likes</b>: ${u}</p>
    <p><b>Views</b>: ${v}</p>
    <p><b>Comments</b>: ${w}</p>
    <p><b>Downloads</b>: ${E}</p>
    </div>
    </a>
    `).join("");t.insertAdjacentHTML("beforeend",a),m?m.refresh():m=new P(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250})}function O(){const e=document.querySelector(".gallery");e.innerHTML=""}const y="is-hidden";function d(e){e.classList.add(y)}function p(e){e.classList.remove(y)}function b(e,t){e.disabled=!0,t.classList.remove(y)}function f(e,t){e.disabled=!1,t.classList.add(y)}const H="44717269-26bd411e987b6b0139d6ec9c5";async function L(e,t=1){const a=`https://pixabay.com/api/?key=${H}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=15`;try{return(await $.get(a)).data}catch{l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}}let c=1,q="";const h=document.querySelector(".form"),n=document.querySelector(".loader"),o=document.querySelector(".load-more");d(o);f(o,n);h.addEventListener("submit",M);async function M(e){e.preventDefault(),O();const t=e.currentTarget.elements.query.value.trim();if(!t){l.error({title:"Error",message:"❌ Please enter a search query"});return}b(o,n),q=t,c=1;try{const a=await L(t,c);a.hits.length===0?(l.warning({title:"No Results",message:"Sorry, there are no images matching your search query."}),d(o)):(g(a.hits),a.totalHits>c*15?(p(o),f(o,n)):(d(o),l.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})))}catch{S()}finally{f(o,n),h.reset()}}function S(e){l.error({title:"Error",message:"❌ No pictures found"})}o.addEventListener("click",N);async function N(){b(o,n),d(o),c+=1;try{const e=await L(q,c);g(e.hits),e.totalHits>c*15?(p(o),f(o,n)):(d(o),l.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})),x()}catch{S()}finally{f(o,n),h.reset()}}function x(){const{height:e}=document.querySelector(".gallery").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
