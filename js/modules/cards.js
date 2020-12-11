import {getResource} from '../services/servises';

function cards() {

    class MenuElement {
        constructor(subtitle, description, image, alt, price, parentSelector, ...classes) {
            this.subtitle = subtitle;
            this.description = description;
            this.image = image;
            this.price = price;
            this.alt = alt;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.cangeToUAH();
        }

        cangeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src=${this.image} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
            // data.forEach(({title, descr, img, alt, price}) => {
            //     new MenuElement(title, descr, img, alt, price, '.menu .container').render();
            // });
    //     })

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({title, descr, img, alt, price}) => {
                new MenuElement(title, descr, img, alt, price, '.menu .container').render();
            });
        });
}

export default cards;