
const countProducts=document.querySelectorAll('.count-products');
for (countProduct of countProducts) {
  let countProductValue=parseInt(countProduct.dataset.value, 10) || 1;
  let countProductMaxValue=parseInt(countProduct.dataset.maxvalue, 10) || 99;
  countProduct.dataset.value=countProductValue;
  countProduct.dataset.maxvalue=countProductMaxValue;
  const countProductLabel=countProduct.querySelector('.count-products__label');
  //console.log('countProductLabel.innerText= ', countProductLabel.innerText);
  countProductLabel.innerText=countProductValue;
  const countProductPrevButton=countProduct.querySelector('.count-products__arrow-left');
  const countProductNextButton=countProduct.querySelector('.count-products__arrow-right');
  countProductNextButton.onclick=function (e) {
    e.preventDefault();
    countProductValue=parseInt(countProduct.dataset.value, 10);
    countProductMaxValue=parseInt(countProduct.dataset.maxvalue, 10);
    if (++countProductValue>=countProductMaxValue) {
      countProductValue=countProductMaxValue;
      countProductNextButton.classList.remove('--active');
    }
    countProductLabel.innerText=countProductValue;
    countProduct.dataset.value=countProductValue;
    countProductPrevButton.classList.add('--active');
  }
  countProductPrevButton.onclick=function (e) {
    e.preventDefault();
    countProductValue=parseInt(countProduct.dataset.value, 10);
    if (--countProductValue<=1) {
      countProductValue=1;
      countProductPrevButton.classList.remove('--active');
    }
    countProductNextButton.classList.add('--active');
    countProductLabel.innerText=countProductValue;
    countProduct.dataset.value=countProductValue;
  }
}
