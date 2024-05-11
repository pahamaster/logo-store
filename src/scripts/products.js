
const nextButtonProductsSlides = document.querySelectorAll('.controls-paggin__arrow-right');
const prevButtonProductsSlides = document.querySelectorAll('.controls-paggin__arrow-left');
const nextButtonProducts = document.querySelector('.controls-products__arrow-right');
const prevButtonProducts = document.querySelector('.controls-products__arrow-left');

const controlsPagginLists = document.querySelectorAll('.controls-paggin__list');

const controlsProductsLabel = document.querySelector('.controls-products__label');

const nextButtonBrandsSlide = document.querySelector('.brands__arrow-right');
const prevButtonBrandsSlide = document.querySelector('.brands__arrow-left');

// console.log(controlsProductsLabel);
// console.log(controlsProductsLabel.innerText);
// console.log(controlsProductsLabel.childNodes);
// console.log(controlsProductsLabel.children);

let sliderProductsCatalog;
let pagginPerSide=1;  //По сколько номеров слайдов будет с каждой стороны активного номера паггинации

$(document).ready(function () {
  sliderProductsCatalog = $('.slider-products_catalog').bxSlider({
    pager: false,
    controls: false,
    infiniteLoop: false,
    adaptiveHeight: true,
    preventDefaultSwipeY: true,
    //oneToOneTouch: true,
    touchEnabled: false,
    onSlideAfter: function (slideElement, oldIndex, newIndex) {
      const slideCount = this.getSlideCount();
      if (newIndex == 0) for (let prevButtonProductsSlide of prevButtonProductsSlides) prevButtonProductsSlide.classList.remove('--active');
      else for (let prevButtonProductsSlide of prevButtonProductsSlides) prevButtonProductsSlide.classList.add('--active');
      if (newIndex == slideCount - 1) for (let nextButtonProductsSlide of nextButtonProductsSlides) nextButtonProductsSlide.classList.remove('--active');
      else for (let nextButtonProductsSlide of nextButtonProductsSlides) nextButtonProductsSlide.classList.add('--active');
      console.log('onSlideAfter this= ', this);
      changePagginHTML(slideCount, newIndex + 1, pagginPerSide);
      console.log('newIndex=', newIndex);
    },
    onSliderLoad: function () {
      const slideCount = this.getSlideCount();
      //controlsProductsLabel.childNodes[2].textContent = '/ ' + slideCount;
      changePagginHTML(slideCount, 1, pagginPerSide);
      for (let nextButtonProductsSlide of nextButtonProductsSlides)
        nextButtonProductsSlide.onclick = e => {
          //const self=this;
          //console.log('nextButtonProductSlide this= ', this);
          e.preventDefault();
          this.goToNextSlide();
        }

      for (let prevButtonProductsSlide of prevButtonProductsSlides)
        prevButtonProductsSlide.onclick = e => {
          e.preventDefault();
          this.goToPrevSlide();
        }
    }
  });
  const sliderProducts = $('.slider-products').bxSlider({
    pager: false,
    controls: false,
    infiniteLoop: false,
    adaptiveHeight: true,
    preventDefaultSwipeY: true,
    //oneToOneTouch: true,
    touchEnabled: false,
    onSlideAfter: function (slideElement, oldIndex, newIndex) {
      controlsProductsLabel.childNodes[1].innerText = newIndex + 1+' ';
    },
    onSliderLoad: function () {
      const slideCount = this.getSlideCount();
      controlsProductsLabel.childNodes[2].textContent = '/ ' + slideCount;
      nextButtonProducts.onclick = e => {
        e.preventDefault();
        this.goToNextSlide();
      }
      
      prevButtonProducts.onclick = e => {
        e.preventDefault();
        this.goToPrevSlide();
      }
    }
  });
  const brandsSlider = $('.slider-brands').bxSlider({
    pager: false,
    controls: false,
    //slideMargin: 10,
    maxSlides: 5,
    moveSlides: 1,
    slideWidth: 210,
    //shrinkItems: true,
    onSliderLoad: function () {
      nextButtonBrandsSlide.onclick = e => {
        e.preventDefault();
        this.goToNextSlide();
      }
      prevButtonBrandsSlide.onclick = e => {
        e.preventDefault();
        this.goToPrevSlide();
      }
    }
  });
});

function changePagginHTML(count, current, countPerSide) {
  for (controlsPagginList of controlsPagginLists) {
    let arr = constructArrPaggin(count, current, countPerSide);
    let pagginList = constructListPaggin(arr, current);
    controlsPagginList.innerHTML = pagginList.innerHTML;
    //console.log('changePagginHTML this= ', this);
    for (item of controlsPagginList.children) {
      console.log('controlsPagginList item= ', item);
      //item.onclick=clickItem.bind(this);
      let link = parseInt(item.dataset.link, 10) - 1;
      item.onclick = () => sliderProductsCatalog.goToSlide(link);
    }
  }
  // function clickItem(){
  //   console.log('click this= ', this);
  //   console.log('parseInt(item.dataset.link, 10)= ', parseInt(item.dataset.link, 10));
  //   self.goToSlide(parseInt(item.dataset.link, 10)-1);
  // }
}

function constructListPaggin(a, current) {  //
  const list = document.createElement('div');
  for (let i = 0; i < a.length; i++) {
    let liItem = document.createElement('li');
    liItem.classList.add('controls-paggin__item');
    liItem.innerText = a[i][0];
    liItem.dataset.link = a[i][1];
    if (current == a[i][1]) liItem.classList.add('--active');
    // liItem.onclick = e =>{
    //   console.log('this=', this);
    //   this.goToSlide(a[i][1]-1);
    // }
    // liItem.addEventListener('click', () =>{
    //   console.log('this=', this);
    //   this.goToSlide(a[i][1]-1);
    // })
    list.appendChild(liItem);
  }
  //console.log('current= ', current); //console.log('list= ', list);
  return list;
}

function constructArrPaggin(count, current, countPerSide) {  //Формирование массива чисел для паггинации с троеточиями внутри, если чисел много
  if (current<1 || current>count) throw('Current out of Count in constructArrPaggin');
  let a = [];    //console.log('count - countPerSide * 2= ', count - countPerSide * 2);

  if ((count - countPerSide * 2) < 4) { //Чисел мало, парится не нужно
    for (let i = 0; i < count; i++) 
      a.push([String(i + 1), i + 1]);
  }
  else {
    let i = current - countPerSide;  //сдвигаем влево
    if (i < 1) i = 1;               //Начинаем все-равно с единицы
    let n = countPerSide * 2 + 1; //Количество чисел вокруг текущего + само текущее число

    let diff = i + n - count - 1;   // Проверяем, выйдем ли за границу количества //console.log('diff= ', diff);

    if (diff > 0) i = i - diff;     //Если вышли за границу, опять сдвигаем, при это общее кол-во чисел (countPerSide*2), окружающих текущее, не изменится, а числа сдвинутся на другую сторону  // console.log('i= ', i);// console.log('current-i= ', current - i);

    if (i > 1) a.push(['1', 1]); //Первое всегда добавляем
    if (i == 3) a.push(['2', 2]); //Если начинаем с трех, два тогда тоже добавляем
    else if (i > 3) a.push(['...', i - 1]); //Если начинаем с числа большего, чем 3, добавляем троеточие, второе число массива при этом говорит, что это троеточие указывает на соседнее число числа справа
    while (n > 0 && i <= count) { a.push([String(i), i]); n--; i++ }
    if ((count - i) > 1) a.push(['...', i]); // В конце делаем так-же, как в начале, только в обратном порядке
    if (i == count - 1) a.push([String(count - 1), count - 1]);
    if (i <= count) a.push([String(count), count]);       //console.log('i= ', i);
  }
  //console.log('a= ', a);
  return a;
}

const showingSortTile=document.querySelector('.showing-sort__item_tile');
const showingSortList=document.querySelector('.showing-sort__item_list');
const contentProducts=document.querySelector('.content-products');

if (showingSortTile) showingSortTile.onclick=function(e) {
  showingSortTile.classList.add('--active');
  showingSortList.classList.remove('--active');
  contentProducts.classList.remove('--list');
  sliderProductsCatalog.redrawSlider();
}

if (showingSortList) showingSortList.onclick=function(e) {
  showingSortTile.classList.remove('--active');
  showingSortList.classList.add('--active');
  contentProducts.classList.add('--list');
  sliderProductsCatalog.redrawSlider();
}

