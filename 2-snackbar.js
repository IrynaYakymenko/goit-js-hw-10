import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i}from"./assets/vendor-Dno44jU7.js";const o={form:document.querySelector(".form"),delay:document.querySelector('[name="delay"]'),state:document.querySelectorAll('[name="state"]')},r=c=>{c.preventDefault();const t=parseInt(o.delay.value);let s="";o.state.forEach(e=>{e.checked&&(s=e.value)}),new Promise((e,m)=>{setTimeout(()=>{s==="fulfilled"?e(t):s==="rejected"&&m(t)},t)}).then(e=>{i.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{i.success({title:"Success",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})};o.form.addEventListener("submit",r);
//# sourceMappingURL=2-snackbar.js.map
