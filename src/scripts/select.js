const selects = document.querySelectorAll('.select');

for (select of selects) {
  const selectList = select.querySelector('ul.select__list_main');
  const selectListDrop = selectList.nextElementSibling;
  selectListDrop.innerHTML = selectList.innerHTML;
  selectList.querySelector('li').classList.add('--active');
  //const borderSelectListDrop=selectListDrop.style.border;
  //console.log('borderSelectListDrop= ', borderSelectListDrop);

  //console.log('selectList= ', selectList);
  //console.log('selectListDrop= ', selectListDrop);

  const onDocumentClick=function (e) {
    //self.dataset.value = value;
    const onSelect = Boolean(e.target.closest('.select'));
    //console.log('e.target=', e.target);
    if (!onSelect) {          //Щелчок вне элемента, закрываем выпадашку
      //selectListDrop.classList.toggle('--open');
      selectList.classList.toggle('--open');
      document.removeEventListener("click", onDocumentClick);
      setTimeout(() => { selectListDrop.style.border = "none"; }, 500);
    }
    //console.log('document.onclick');
  }

  const listItems = selectListDrop.children; //выпадающий список
  for (listItem of listItems) {
    // elementChildrens - коллекция детей списка
    // child - последовательно, каждый из элементов elementChildrens
    listItem.onclick = function (e) {
      const index = getElIndex(this);
      //console.log('index= ', index);
      const itemActive = selectList.querySelector('.--active');
      //console.log('itemActive= ', itemActive);
      itemActive.classList.toggle('--active');
      selectList.children[index].classList.toggle('--active');
      //selectListDrop.classList.toggle('--open');
      selectList.classList.toggle('--open');
      document.removeEventListener("click", onDocumentClick);
      setTimeout(() => { selectListDrop.style.border = "none"; }, 500);
    }
  }

  selectList.onclick = function (e) {
    //e.preventDefault();
    const opened = selectList.classList.contains('--open');
    //console.log('open=', open);
    //selectListDrop.classList.toggle('--open');
    selectList.classList.toggle('--open');
    if (opened) {                 //Выпадашка была открыта, закрываем
      document.removeEventListener("click", onDocumentClick);
      setTimeout(() => { selectListDrop.style.border = "none"; }, 500);
    }
    else {          //Выпадашка была закрыта, открываем
      selectListDrop.style.border = "2px solid #f3f3f3";
      //targetSelect=e.target;
      document.addEventListener("click", onDocumentClick);  //навешиваем клик на документ
    }
  };
}