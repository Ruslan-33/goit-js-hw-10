import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const delay = event.currentTarget.elements.delay.value;
    const btnRadio = event.currentTarget.elements.state.value;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (btnRadio === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    promise
        .then(delay => {
            iziToast.success({         
                position: "topRight",
                message: `✅ Fulfilled promise in ${delay}ms`
            });
        })
        .catch(delay => {
            iziToast.error({
                position: "topRight",
                message: `❌ Rejected promise in ${delay}ms`
            });
        });
    
    formEl.reset();
    
});
