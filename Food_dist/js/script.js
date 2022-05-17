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

    const deadline = '2022-05-18';

    function getTimeRemaining(endtime) {
        let days,hours,minutes,seconds
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

            // function endClock(timeValue,elem) {
            //     if (timeValue > 0) {
            //         elem.innerHTML = getZero(v.elem);
            //     } else {
            //         elem.innerHTML = '00'
            //     }
            // }
            // endClock(v.days, days);
            // endClock(v.hours, hours);
            // endClock(v.minutes, minutes);
            // endClock(v.seconds, seconds);

            days.innerHTML = getZero(v.days);
            hours.innerHTML = getZero(v.hours);
            minutes.innerHTML = getZero(v.minutes);
            seconds.innerHTML = getZero(v.seconds);

            if (v.total < 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', deadline)

});