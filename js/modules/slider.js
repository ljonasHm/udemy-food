function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide);
    const sliderDiv = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
    const indicators = document.createElement('ol');
    const dots = [];

    let sliderIndex = 0;
    let offset = 0;

    total.innerHTML = zeroNum(slides.length);
    current.innerHTML = zeroNum(sliderIndex + 1);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.widht = width;
    });

    sliderDiv.style.position = 'relative';
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    sliderDiv.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if(offset == toStingWithoutDigit(width) * (slides.length - 1)) { 
            offset = 0;
        } else {
            offset += toStingWithoutDigit(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        sliderIndex += 1;
        if(sliderIndex > slides.length - 1) {
            sliderIndex = 0;
        }
        current.innerHTML = zeroNum(sliderIndex + 1);

        installActiveDot();
    });

    prev.addEventListener('click', () => {
        if(offset == 0) { 
            offset = toStingWithoutDigit(width) * (slides.length - 1);
        } else {
            offset -= toStingWithoutDigit(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        sliderIndex -= 1;
        if(sliderIndex < 0) {
            sliderIndex = slides.length - 1;
        }
        current.innerHTML = zeroNum(sliderIndex + 1);
        installActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo - 1;
            offset = toStingWithoutDigit(width) * (slideTo - 1);

            current.innerHTML = zeroNum(sliderIndex + 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            installActiveDot();
        })
    })

    function installActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex].style.opacity = 1;
    }

    function zeroNum(num) {
        if(num < 10) {
            return '0' + num;
        }
        return num;
    }

    function toStingWithoutDigit(string) {
        return +string.replace(/\D/g, '');
    } 

    function zeroNum(num) {
        if(num < 10) {
            return '0' + num;
        }
        return num;
    }
}

export default slider;