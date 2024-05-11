
const dotSliders = document.querySelectorAll('.dot-price');

document.addEventListener('DOMContentLoaded', ()=>{
  for (let dotSlider of dotSliders){
    const minValue = 0;    //Минимальное значение ползунка
    const maxValue = 200000;  //Максимальное значение ползунка
    const step = 2000;         //Шаг ползунка
    const useData = dotSlider.dataset.use;  //Хранит from или to
    dotSlider.dataset.minvalue = minValue;
    dotSlider.dataset.maxvalue = maxValue;
    dotSlider.dataset.step = step;
    let startValue;
    if (useData === 'from') startValue= minValue;
         else startValue = maxValue;
    dotSlider.style.setProperty('--label-value', ` '${startValue}'`);
    const rangeFilterInputs = document.querySelectorAll('.range-filter__input');
    for (let rangeFilterInput of rangeFilterInputs)
      if (rangeFilterInput.dataset.use==='from') rangeFilterInput.value=minValue;
      else rangeFilterInput.value=maxValue;
  }
});

for (let dotSlider of dotSliders) {
  dotSlider.ondragstart = function () {
    return false;
  };
  
  dotSlider.onmousedown = function (e) { // 1. отследить нажатие
    // подготовить к перемещению
    document.body.style.cursor = "pointer";
    const self = this;  //Сохраним this
    const useData = self.dataset.use;  //Хранит from или to
    
    const rangeFilterInputs = document.querySelectorAll('.range-filter__input');
    const stripSlider = self.parentElement.querySelector('.slider-price__strip');
    const startX = e.pageX;

    const minValue = parseInt(self.dataset.minvalue, 10);;    //Минимальное значение ползунка

    const maxValue = parseInt(self.dataset.maxvalue, 10);;  //Максимальное значение ползунка
    const step = parseInt(self.dataset.step, 10);         //Шаг ползунка

    let otherValue;                   //Значение другого ползунка
    if (useData === 'from') {
      const otherDotSlider=self.parentElement.querySelector('div[data-use=to]');
      console.log('otherDotSlider= ', otherDotSlider);
      otherValue= parseInt(otherDotSlider.dataset.value, 10);
      if (!otherValue) otherValue=maxValue; 
    }
    else {
      const otherDotSlider=self.parentElement.querySelector('div[data-use=from]');
      console.log('otherDotSlider= ', otherDotSlider);
      otherValue= parseInt(otherDotSlider.dataset.value, 10);
      if (!otherValue) otherValue=minValue; 
    }

    let startValue;

    const valueDataset=parseInt(self.dataset.value, 10);
    console.log(valueDataset);
    if (valueDataset) startValue = valueDataset;      //Стартовое значение ползунка при нажатии
    else if (useData === 'from') startValue= minValue;
         else startValue = maxValue;
    // self.style.setProperty('--label-value', ` '${startValue}'`);
    console.log('starttValue= ', startValue);
    let value;        //Текущее значение ползунка

    let fract = step / (maxValue - minValue);  //Минимальный относительный дискрет ползунка
    console.log('fract= ', fract);
    const widthScrollBar = self.parentElement.getBoundingClientRect().width;  //Ширина ползунка
    let segment = widthScrollBar * fract;         //Минимальный отрезок изменения ползунка
    let startLeftDot = parseFloat(getComputedStyle(self).left);  //Начальное положение ползунка
    console.log('startLeftDot= ', startLeftDot);
    console.log('segment= ', segment);
    console.log('widthScrollBar= ', widthScrollBar);

    document.onmousemove = function (e) {          // перемещение
      let offsetX = e.pageX - startX;

      //let leftDot=div(offsetX, segment)*segment+startLeftDot;
      let countFractPassed = (offsetX - offsetX % segment) / widthScrollBar;        //Количество относительных пройденных дискретов
      console.log('fractPassed= ', countFractPassed);
      value = startValue + Math.round(countFractPassed * (maxValue - minValue));      //Текущее значение ползунка
      if (value > maxValue) value = maxValue;  //Не выходим за рамки
      if (value < minValue) value = minValue;
      let fMove=true;
      if (useData==='from') {
        if (value>otherValue) { value=otherValue; fMove=false; }
      }
      else {
        if (value<otherValue) { value=otherValue; fMove=false; }
      }
      self.style.setProperty('--label-value', ` '${value}'`);   //Надпись со значением
      for (let rangeFilterInput of rangeFilterInputs)
      {
        if (rangeFilterInput.dataset.use===useData) rangeFilterInput.value=value;
        //console.log('rangeFilterInput= ', rangeFilterInput); 
      }
      let leftDot = offsetX - offsetX % segment + startLeftDot;

      console.log('value= ', value);
      //console.log('leftDot= ', leftDot);
      if (leftDot < 0) leftDot = 0;           //Не выходим за рамки
      if (leftDot > widthScrollBar) leftDot = widthScrollBar;
      let leftDotPercent=leftDot / widthScrollBar * 100;
      if (fMove) {
        self.style.left = `${leftDotPercent}%`;
        if (self.dataset.use === 'from') stripSlider.style.left = `${leftDotPercent}%`;
        else stripSlider.style.right = `${100-leftDotPercent}%`;
      }
    }
    // 4. отследить окончание переноса
    document.onmouseup = function (e) {
      // let offsetX=e.pageX-startX;
      // let fractPassed=(offsetX-offsetX % segment)/widthScrollBar;
      // console.log('fractPassed= ', fractPassed); 
      // currentValue = currentValue+((fractPassed*(endValue-startValue)) | 0);
      // if (currentValue>endValue) currentValue=endValue;
      // //currenttValue=endValue;
      // if (currentValue<startValue) currentValue=startValue;
      //currentValue=value;
      self.dataset.value = value;
      console.log('onmouseup_value= ', value);
      document.onmousemove = null;
      self.onmouseup = null;
      document.body.style.cursor = "auto";
    }
  }
}

const spoilerFilters=document.querySelectorAll('.spoiler-filter');

for (let spoilerFilter of spoilerFilters){
  spoilerFilter.onclick=function (e){
    e.preventDefault();
    const sectionFilter=spoilerFilter.closest('.section-filter');
    //console.log('sectionFilter= ', sectionFilter); 
    sectionFilter.classList.toggle('--open');
  }
}
