function initialSetup() {
  if (document.getElementById("start") != null) {
      document.getElementById('start').style.display = 'none';
      setTimeout(function () {
          document.getElementById('start').style.display = 'block';
      }, 3000);
  }
}
initialSetup();
setTimeout(() => {
  const box = document.getElementById('img');
  box.style.display = 'none';
}, 3000); 

const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
cancelBtn.onclick = ()=>{
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
searchBtn.onclick = ()=>{
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
const btn1 = document.getElementById("clk1");
btn1.onclick = function () {
  document.getElementById("uploade").style.display = "none";
    document.getElementById("h2").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("myorder").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementsByTagName("form")[0].style.display = "none";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#292f36";
}
let click = document.getElementById("click");
click.onclick = function () {
  document.getElementById("uploade").style.display = "block";
  document.getElementById("h2").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementsByTagName("body")[0].style.backgroundColor = "#F4F4F2";
  document.getElementById("myorder").style.display = "none";
}
let click1 = document.getElementById("click1");
click1.onclick = function () {
  document.getElementById("uploade").style.display = "none";
  document.getElementById("h2").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementsByTagName("body")[0].style.backgroundColor = "#F4F4F2";
  document.getElementById("myorder").style.display = "block";
}
