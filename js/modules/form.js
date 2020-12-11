import {closeModal, showModal} from './modal';
import {postData} from '../services/servises';

function form(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector);
    
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'success',
        failure: 'failure'
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);



            //request.setRequestHeader('Content-type', 'aplication/json');
            // при xml запросе и использовании форм-даты заголовок устанавливать не нужно, он устанавливается сам
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const object = {a: 23, b: 50};
            // console.log(Object.entries(object));

            const obj = {};
            formData.forEach(function(value, key){
                obj[key] = value;
            });

//            const json = JSON.stringify(obj);

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

export default form;