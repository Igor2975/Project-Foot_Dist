window.addEventListener('DOMContentLoaded', () => {

    //создаем табы
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach((item) => {
            // item.style.display = 'none';
            item.classList.add('hidden');
            item.classList.remove('show','fade');
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





    hideTabContent()
    showTabContent()
});