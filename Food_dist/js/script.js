window.addEventListener('DOMContentLoaded', () => {

    //создаем табы
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach((item) => {
            // item.style.display = 'none';
            item.classList.add('hidden');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hidden')
        tabs[i].classList.add('tabheader__item_active')
    }
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    hideTabContent();
    showTabContent();

    //создаем Timer

    const deadline = '2022-06-30';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / (1000 * 60) % 60)),
                seconds = Math.floor((t / 1000) % 60);

        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock() //убираем моргание при перезагрузке

        function updateClock() {
            const v = getTimeRemaining(endtime);

            days.innerHTML = getZero(v.days);
            hours.innerHTML = getZero(v.hours);
            minutes.innerHTML = getZero(v.minutes);
            seconds.innerHTML = getZero(v.seconds);

            if (v.total < 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', deadline);

    //создаем Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
      

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    })

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('show');
        document.body.style.overflow = ''
    }
    

    modal.addEventListener('click', (e) => {
        if (e.target === modal|| e.target.getAttribute('data-closed')=== '') {
            closeModal()
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 30;
            this.changeToRub();
        }

        changeToRub() {
            this.price = this.price * this.transfer;
        }

        render() {
            let elem = document.createElement('div');
            if (this.classes.length === 0) {
                this.el = 'menu__item';
                elem.classList.add(this.el)
            } else {
                this.classes.forEach(className => {
                    elem.classList.add(className)
                })
            }
            elem.innerHTML = `
                <img src= ${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `
            this.parent.append(elem)
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        30,
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        40,
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков',
        20,
        '.menu .container'
    ).render();
    //  ОТПРАВКА FORMS 

    const forms = document.querySelectorAll('form');

    //создаем  оповещение  
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо,мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    }
    forms.forEach(item => {
        postData(item);
    })

    //1.создаем функцию отправки
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //отмена перезагрузки

            //2.создаем блок оповещения
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style. cssText = `
                display:block;
                matgin:0 auto;            
            `;
            form.insertAdjacentElement('afterend',statusMessage)


             //3.создаем сборщик данных из формы  
             const formData = new FormData(form);

             const object = {};
             formData.forEach(function (value, key) {
                 object[key] = value
             })
             
 
            //4.создаем новый запрос
             fetch('server.php', {
                 method: 'POST',
                 headers: {
                     'Content-type': 'application/json'
                 },
                 body:JSON.stringify(object)
             }).then(data =>data.text())
                 .then(data => {
                   console.log(data);
                   showThanksModal(message.success);
                   statusMessage.remove()
             }).catch(() => {
                 showThanksModal(message.failure);
             }).finally(() => {
                 form.reset()//очистка формы
             })
 
         })
     }
     //создаем оповещение пользователя в новом модальном окне
 
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
         prevModalDialog.classList.add('hidden');
         openModal();
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
         <div class = 'modal__content'>
             <div class="modal__close" data-closed >&times;</div>
             <div class="modal__title">${message}</div>
         </div>
         `
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hidden');
             closeModal();
         },4000)
    }
 
     // Пример GET запроса через fetch
 
     // fetch('https://jsonplaceholder.typicode.com/todos/1')
     //     .then(response => response.json())
     //     .then(json => console.log(json));
     
      // Пример POST запроса через fetch
     
     // fetch('https://jsonplaceholder.typicode.com/posts', {
     //     method: "POST",
     //     body: JSON.stringify({ name: 'Alex' }),
     //     headers: {
     //         'Content-type': 'application/json'
     //     }
     //  })
     //  .then(response => response.json())
     //  .then(json => console.log(json))
 
});