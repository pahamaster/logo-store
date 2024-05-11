const overlay=document.querySelector("#overlay");
const hamburgerBtn=document.querySelector("#hamburger");
const closeOverlayBtn=document.querySelector("#closeOverlay");

//console.log(hamburgerBtn);

hamburgerBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.style.display="flex";
  allowScroll=false;
});

closeOverlayBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.style.display="none";
  allowScroll=true;
})
