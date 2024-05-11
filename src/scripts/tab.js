// const recordsProductTabs = document.querySelectorAll('.records-product__tab');
// const recordsProductItems = document.querySelectorAll('.records-product__item');

// //console.log('recordsProductTabs= ', recordsProductTabs);

// if (recordsProductTabs.length>0) {
//   recordsProductTabs[0].classList.add('--active');
//   recordsProductTabs[1].classList.remove('--active');

//   recordsProductItems[0].classList.add('--active');
//   recordsProductItems[1].classList.remove('--active');

//   for (const recordsProductTab of recordsProductTabs) {
//     recordsProductTab.onclick = function () {
//       const elIndex = getElIndex(this);
//       console.log('elIndex= ', elIndex);
//       recordsProductTabs.forEach(e => e.classList.remove('--active'));
//       recordsProductItems.forEach(e => e.classList.remove('--active'));
//       this.classList.add('--active');
//       recordsProductItems[elIndex].classList.add('--active');
//     }
//   }
// }

const tabNavs=document.querySelectorAll('.tab-nav');

for (tabNav of tabNavs) {
  const recordsProductTabs = tabNav.querySelectorAll('.tab');
  const tabBody=tabNav.nextElementSibling;
  const recordsProductItems = tabBody.querySelectorAll('.tab-item');

  recordsProductTabs[0].classList.add('--active');
  recordsProductTabs[1].classList.remove('--active');

  recordsProductItems[0].classList.add('--active');
  recordsProductItems[1].classList.remove('--active');

  for (const recordsProductTab of recordsProductTabs) {
    recordsProductTab.onclick = function () {
      const elIndex = getElIndex(this);
      console.log('elIndex= ', elIndex);
      recordsProductTabs.forEach(e => e.classList.remove('--active'));
      recordsProductItems.forEach(e => e.classList.remove('--active'));
      this.classList.add('--active');
      recordsProductItems[elIndex].classList.add('--active');
    }
  }
}