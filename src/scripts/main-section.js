
var menuCatalogOpen = false;
var currentMenuItemParent;

const menuCatalogItemsParent = document.querySelectorAll('.menu-catalog__item--parent');
const menuCatalogItems = document.querySelectorAll('.menu-catalog__item');


const sideDrop = document.querySelector('.side__drop');

// 'hide' == свернуто боковое выпадающее меню
// 'hiding' == сворачивается 
// 'showing' == разворачивается
// 'show' == развернуто
var sideDropState = 'hide';

const buttonMenuCatalogOpen = document.querySelector('.burger');

const menuCatalog = document.querySelector('.menu-catalog');
const catalog = document.querySelector('.catalog');

const switchSaleButtons = document.querySelectorAll('.switch-sale__button');

const captionSearch = document.querySelector('.caption-search');
const categoriesSearch = document.querySelector('.categories-search');
const categoriesSearchItems = document.querySelectorAll('.categories-search__item');
var countOfSearch = 0;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const dropMenuProductsDay = document.querySelectorAll('.drop-menu__product-day');

const sideCatalogContainer = document.querySelector('.side__catalog-container');

for (const categoriesSearchItem of categoriesSearchItems) {
  categoriesSearchItem.onclick = e => {
    e.preventDefault();
    e.currentTarget.classList.contains('checked') ?
      countOfSearch-- : countOfSearch++;
    //console.log(countOfSearch);
    countOfSearch ?
      captionSearch.childNodes[3].innerText = 'Выбрано ' + countOfSearch
      : captionSearch.childNodes[3].innerText = 'Везде';
    e.currentTarget.classList.toggle('checked');
  }
}

categoriesSearch.style.height = '0px';

captionSearch.onclick = e => {
  e.preventDefault();
  if (categoriesSearch.style.height === '0px') {
    categoriesSearch.style.height = '220px';
    categoriesSearch.style.borderBottom = "4px solid #f68038";
  }
  else {
    categoriesSearch.style.height = '0px';
    setTimeout(() => { categoriesSearch.style.borderBottom = "none"; }, 1000);
  }
  //const open=captionSearch.classList.contains('--open');
  captionSearch.classList.toggle('--open');
}

function getElIndex(el) {  //Функция возвращает индекс Dom-элемента у его родителя 
  // for (var i = 0; el = el.previousElementSibling; i++);
  // return i;
  return [...el.parentElement.children].indexOf(el);
}

// function containsClassClosest(el, className) { //Функция проверяет, есть ли у Dom-элемента либо у его родителей нужный класс
//   try { 
//     while (!el.classList.contains(className)) el=el.parentElement;
//   }
//   finally{ return Boolean(el); }
// }

buttonMenuCatalogOpen.onclick = e => {  //Раскрывание Side-меню
  e.preventDefault();
  // menuCatalogOpen ? menuCatalog.style.display = 'none' :
  //   menuCatalog.style.display = 'block';
  if (menuCatalogOpen) {
    sideDrop.style.position = 'absolute';
    menuCatalog.style.height = '0';
  }
  else {
    menuCatalog.style.height = '600px';
    // let clientWidth=window.innerWidth;  //Ширина окна браузера вместе с полосами прокрутки
    // console.log('clientWidth= ',clientWidth);
    // if (clientWidth<=768) setTimeout(()=>{ sideDrop.style.position='static'}, 500); 
  }
  menuCatalogOpen = !menuCatalogOpen;
}

sideDrop.onmouseleave = (e) => { // Покидание мышью Доп-меню
  //sideDrop.style.display = 'none'; 
  console.log('sideDrop_mouseLeave_sideDropState= ', sideDropState);
  console.log();
  currentMenuItemParent.style.backgroundColor = null;
  //let toMenuCatalogItems=containsClassClosest(e.relatedTarget, 'menu-catalog__item');
  let toMenuCatalogItems = Boolean(e.relatedTarget.closest('.menu-catalog__item'));
  console.log('sideDrop_onMOuseLeave_toMenuCatalogItems= ', toMenuCatalogItems);
  console.log('sideDrop_onMouseLeave_e.relatedTarget.parentElement= ', e.relatedTarget.parentElement);
  console.log('sideDrop_onMouseLeave_e.relatedTarget= ', e.relatedTarget);
  if ((sideDropState == 'show' || sideDropState == 'showing') && !toMenuCatalogItems) {
    // Доп меню в состоянии открыто или открывается и мышь переходит не на пункт меню
    sideDropState = 'hiding';   //Прячем Доп меню
    setTimeout(() => {
      if (sideDropState == 'hiding') {
        sideDropState = 'hide';
        sideDrop.style.border = null;
      }
    }, 500);
    sideDrop.style.transform = 'translateX(-100%)';
    sideDrop.style.width = '0px';
  }
}

for (let item of menuCatalogItemsParent) {    //Пункт Side-меню со стрелочкой
  item.onmouseleave = (e) => {             //Покидание мышью пункта Side-меню со стрелочкой
    console.log('MenuCAtalogItemParents__mouseLeave');
    console.log('menuCatalogItemParent_relatedTarget= ', e.relatedTarget);
    let toSideDrop = sideDrop.contains(e.relatedTarget);                      //true - Мышь перемещается на Доп меню
    console.log('menuCatalogItemsParent_toSideDrop= ', toSideDrop);
    if (toSideDrop) currentMenuItemParent.style.backgroundColor = '#098494' //Нужно оставить подсвеченным пункт меню
    else {
      //if (!e.relatedTarget.parentElement.classList.contains('menu-catalog__item')) //Мышь переходит не на пункт меню
      //if (!containsClassClosest(e.relatedTarget, 'menu-catalog__item')) //Мышь переходит не на пункт меню
      if (!Boolean(e.relatedTarget.closest('menu-catalog__item'))) //Мышь переходит не на пункт меню
      {
        sideDropState = 'hiding'; //Мышь перемещается не на Доп меню и не на другой пункт меню--> Прячем доп меню
        setTimeout(() => {
          if (sideDropState == 'hiding') {  //Проверяем, не изменилось ли состояние за отведенное время
            sideDropState = 'hide';
            sideDrop.style.border = null;
          }
        }, 500);
        sideDrop.style.transform = 'translateX(-100%)';
        sideDrop.style.width = '0px';
        currentMenuItemParent.style.backgroundColor = null;
      }
    }
  }
}

for (let item of menuCatalogItems) { //Любой пункт Side-меню
  item.onclick = e => {
    e.preventDefault();
  }
  item.onmouseenter = e => {  // Вход мыши на пункт Side-меню

    let offsetX = e.offsetX; //, offsetY=e.offsetY;
    console.log('MenuCatalogItems_offsetX= ', offsetX);
    if (e.currentTarget.classList.contains('menu-catalog__item--parent')) { //Пункт меню со стрелочкой
      console.log('menuCatalogItems_sideDropState= ', sideDropState);
      if (sideDropState == 'show' || sideDropState == 'showing') {  //Доп меню открыто или открывается уже
        let dataAttr = e.currentTarget.dataset.linked;    //меняем контент Доп меню
        currentMenuItemParent = e.currentTarget;
        for (dropMenuPoductDay of dropMenuProductsDay)
          if (dropMenuPoductDay.dataset.linked === dataAttr)
            dropMenuPoductDay.classList.add('active');
          else dropMenuPoductDay.classList.remove('active');
      }
      if (sideDropState == 'hide' || sideDropState == 'hiding') {  //Доп меню скрыто или скрывается
        let clientWidth = window.innerWidth;  //Ширина окна браузера вместе с полосами прокрутки
        console.log('clientWidth= ', clientWidth);
        let widthMenuCatalogItem = e.currentTarget.clientWidth;
        let percentOffsetX = offsetX * 100 / widthMenuCatalogItem;
        console.log('percentOffsetX= ', percentOffsetX);
        if (clientWidth <= 768) {   //На экранах шириной меньше 768
          sideDrop.style.position = 'static';    //Доп-меню внутри Side-меню флекс-элементом
          sideDrop.style.height = 'auto';
          if (percentOffsetX < 40) sideCatalogContainer.style.flexDirection = 'row-reverse'; //Доп-меню появляется справа или слева в зависимости от положения мыши на пункте Side-меню
          else sideCatalogContainer.style.flexDirection = 'row';
        } else {
          sideDrop.style.position = 'absolute';  //На экранах шириной больше 768 абсолютим Доп-меню
          sideDrop.style.height = '100%';
          //sideCatalogContainer.style.flexDirection='row';
        }
        console.log('widthMenuCataloItem= ', widthMenuCatalogItem);
        sideDropState = 'showing'; //Показываем дополнительное меню
        sideDrop.style.border = '2px solid #098494';
        setTimeout(() => {
          if (sideDropState == 'showing') {  //Проверяем, не изменилось ли состояние за отведенное время
            sideDropState = 'show';
          }
        }, 500);
        let widthCatalog = catalog.clientWidth;  //Ширина Бокового меню, чтобы раположить Доп меню рядом справа
        //let widthSideDrop=sideDrop.clientWidth; 
        //let widthSideDrop=parseInt(getComputedStyle(document.documentElement).fontSize)*23.3333; //Вычисляем ширину Доп меню, для мобильной версии
        //let clientWidth=document.documentElement.clientWidth;  //Ширина окна браузера
        //let clientWidth=document.body.clientWidth;  //Ширина окна браузера
        //let clientWidth=window.innerWidth;  //Ширина окна браузера вместе с полосами прокрутки
        //console.log(clientWidth);
        //let sideDropTranslateX;
        //if (clientWidth>768) sideDropTranslateX=widthCatalog; //Десктопная версия
        //else sideDropTranslateX=widthCatalog-widthSideDrop;    //Мобильная версия, Доп меню прилипает к правой стороне Меню Каталога
        if (clientWidth > 768) sideDrop.style.transform = `translateX(${widthCatalog}px)`;
        else sideDrop.style.transform = `translateX(0px)`;
        sideDrop.style.width = '23.3333rem';
        let dataAttr = e.currentTarget.dataset.linked;  // Задаем контент Доп меню согласно пункту меню
        currentMenuItemParent = e.currentTarget;      //Выделенный пункт Side-меню, с которого мышь перешла на Доп-меню
        for (dropMenuPoductDay of dropMenuProductsDay)
          if (dropMenuPoductDay.dataset.linked === dataAttr)
            dropMenuPoductDay.classList.add('active');
          else dropMenuPoductDay.classList.remove('active');
      }
    }
    else {  // Вход мыши на пункт Side-меню без стрелочки
      console.log('menuCataloItemsNoParent__enterMOuse');
      if (sideDropState == 'show' || sideDropState == 'showing') { //Доп меню в состоянии открыто илбо открывается
        sideDropState = 'hiding'; //Прячем доп меню
        setTimeout(() => {
          if (sideDropState == 'hiding') {  //Проверяем, не изменилось ли состояние за отведенное время
            sideDropState = 'hide';
            sideDrop.style.border = null;
          }
        }, 500);
        sideDrop.style.width = '0';
        sideDrop.style.transform = 'translateX(-100%)';
      }

    }
  }
}

const slider = $('.slider').bxSlider({
  pager: false,
  controls: false,
  preventDefaultSwipeX: false,
  preventDefaultSwipeY: false,
  touchEnabled: false,
  //swipeThreshold: 50,
  onSlideBefore: function (slideElement, oldIndex, newIndex) {
    for (const swBut of switchSaleButtons)
      newIndex === getElIndex(swBut) ? swBut.classList.add('active') :
        swBut.classList.remove('active');
    //console.log("123");  
  }
});

for (const switchSaleBut of switchSaleButtons) {
  switchSaleBut.onclick = e => {
    e.preventDefault();
    slider.goToSlide(getElIndex(e.currentTarget));
  }
}

const pagginPhotoButtons = document.querySelectorAll('.paggin-photo__button');

const photoSlider = $('.photo-product__slider').bxSlider({
  pager: false,
  controls: false,
  preventDefaultSwipeX: false,
  preventDefaultSwipeY: false,
  //touchEnabled: false,
  //swipeThreshold: 50,
  onSlideBefore: function (slideElement, oldIndex, newIndex) {
    for (const pagginPhotoButton of pagginPhotoButtons)
      newIndex === getElIndex(pagginPhotoButton) ? pagginPhotoButton.classList.add('--active') :
        pagginPhotoButton.classList.remove('--active');
    //console.log("123");  
  }
});

for (const pagginPhotoButton of pagginPhotoButtons) {
  pagginPhotoButton.onclick = e => {
    e.preventDefault();
    photoSlider.goToSlide(getElIndex(e.currentTarget));
  }
}