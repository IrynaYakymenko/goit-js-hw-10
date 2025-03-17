import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('.form'),
    delay: document.querySelector('[name="delay"]'),
    state: document.querySelectorAll('[name="state"]'),
}

const handleSubmit = event => {
    event.preventDefault();

    const delayNow = parseInt(refs.delay.value);
    let stateNow = '';

    refs.state.forEach(el => {
        if (el.checked){
            stateNow = el.value;
        }
    });

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateNow === 'fulfilled'){
                resolve(delayNow);
            } else if (stateNow === 'rejected'){
                reject(delayNow);
            }
        }, delayNow);
    });

    promise.then(delayNow => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delayNow}ms`,
            position: 'topRight'
        });
    })
    .catch(delayNow => {
        iziToast.error({
            title: 'Success',
            message: `❌ Rejected promise in ${delayNow}ms`,
            position: 'topRight'
        });
    })
};

refs.form.addEventListener('submit', handleSubmit);