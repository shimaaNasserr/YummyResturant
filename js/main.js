let myRow = document.getElementById("myRow")
let searchHome = document.getElementById("searchHome")
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
closeNav()
function openNav() {
    $(".side-nav").animate({ left: "0px" }, 500)
    $(".open-close-icon").addClass("fa-x")
    $(".open-close-icon").removeClass("fa-align-justify")
    // for (let i = 0; i < 5; i++) {
    //     $(".links li").animate({
    //         top: "0px"
    //     }, (i + 5) * 100)
    // }
    for (let i = 0; i < 5; i++) {
        $(".links .list li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeNav() {
    let width = $(".side-nav .nav-left").outerWidth(true)
    $(".side-nav").animate({ left: `-${width}px` }, 500)

    $(".open-close-icon").addClass("fa-align-justify")
    $(".open-close-icon").removeClass("fa-x")
    $(".links li").animate({
        top: 300
    }, 500)
}


$(".open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()
    }
    else {
        openNav()
    }
})

// function displayMeals(){
//    let temp=""

//    for(let i=0; i<arr.length; i++){
//     temp += ``
//    }
// }











let responseList = {}
async function getCategories() {
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await api.json()
    console.log(response.categories);
    console.log();
    displayCategories(response.categories)
    $(".loading").fadeOut(300)
}
// getCategories()

function displayCategories(arr) {
    let temp = ""
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
  <div onclick="getCategoryMeals('${arr[i].strCategory}')" class= "meal position-relative rounded overflow-hidden ">
  <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 ">
  <div class="catLayer position-absolute p-2 text-center text-black">
<h3>${arr[i].strCategory}</h3>
<p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
</div>
  </div>
</div>`
    }
    myRow.innerHTML = temp
}

async function getArea() {
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response = await api.json()
    console.log(response.meals);
    displayArea(response.meals)
    $(".loading").fadeOut(300)
}
function displayArea(arr) {
    let temp = ""
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
  <div onclick= "getAreaMeals('${arr[i].strArea}')" class="meal text-center text-white">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${arr[i].strArea}</h3>
  </div>
</div>`
    }
    myRow.innerHTML = temp
}
async function getIngredients() {
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response = await api.json()
    console.log(response.meals);
    displayIngredients(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)
}

function displayIngredients(arr) {
    let temp = ""
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
</div>`
    }
    myRow.innerHTML = temp
}

async function getCategoryMeals(category) {
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let response = await api.json()
    displayMeals(response.meals)
    $(".loading").fadeOut(300)
}

function displayMeals(arr) {
    let temp = ""
    for (let i = 0; i < arr.length; i++) {
        temp +=`
        <div class="col-md-3">
  <div onclick="getCategoryMealDeatails('${arr[i].idMeal}')" class= "meal position-relative rounded overflow-hidden ">
  <img src="${arr[i].strMealThumb}" alt="" class="w-100 ">
  <div class="catLayer position-absolute p-2 text-center text-black">
<h3 >${arr[i].strMeal}</h3>
</div>
  </div>
</div>`
    }
    myRow.innerHTML = temp
}

async function getCategoryMealDeatails(id) {
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let response = await api.json()
    // console.log("seafood");
    // console.log(response);
    // displayMeals(response.meals)
    displayCategoryMealDeatails(response.meals[0])
    $(".loading").fadeOut(300)
}
//  getCategoryMealDeatails();
function displayCategoryMealDeatails(meal) {
    let ingredients = ""
    for(let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
let tags = meal.strTags.split(",")
let innerTag=""
for(let i=0; i<tags.length; i++){
    innerTag+= `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
}
// for()

    let temp =`
    <div class="col-md-4">
<img class="w-100 rounded" src="${meal.strMealThumb}"alt="">
  <h2>${meal.strMeal}</h2>
</div>
  <div class="col-md-8">
<h2>Instructions</h2>
<p>${meal.strInstructions}</p>
 <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
  <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
 <h3>Recipes :</h3>
 <ul class="list-unstyled d-flex g-3 flex-wrap">
  ${ingredients}
</ul>
<h3>Tags :</h3>
 <ul class="list-unstyled d-flex g-3 flex-wrap">
  ${innerTag}
</ul>
<a href="${meal.strSource}" target="_blank" class="btn btn-success me-1">Source</a>
<a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>

`
   myRow.innerHTML = temp

}

async function getAreaMeals(city){
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`);
    let response = await api.json()
    // console.log("seafood");
    // console.log(response);
    displayMeals(response.meals)
    $(".loading").fadeOut(300)
}
// getAreaMeals("American")
async function getIngredientsMeals(ingredient){
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let response = await api.json()
    // console.log("seafood");
    // console.log(response);
    displayMeals(response.meals)
    $(".loading").fadeOut(300)
}
function showSearchHome(){
    searchHome.innerHTML = 
    `<div class="row">
    <div class="col-md-6">
      <input onkeyup="searchByName(this.value)" type="text" class=" form-control text-white bg-transparent" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
      <input onkeyup="searchByFirstLitter(this.value)" type="text" class=" form-control text-white bg-transparent" placeholder="Search By first Litter">
    </div>
  </div>
    `
    myRow.innerHTML = ""
}

async function searchByName(name){
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    closeNav()
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let response = await api.json()

    displayMeals(response.meals)
    $(".loading").fadeOut(300)
}
async function searchByFirstLitter(litter){
    closeNav()
    myRow.innerHTML = ""
    $(".loading").fadeIn(300)
    searchHome.innerHTML =""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`)
    let response = await api.json()
    displayMeals(response.meals)
    $(".loading").fadeOut(300)
}
function showContact(){
    searchHome.innerHTML =""
    closeNav()
    myRow.innerHTML = `
    <div class="contact d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center mt-5" id="contactHome">
    <div class="row g-4 ">
    <div class="col-md-6">
      <input id="nameInput" type="text" onkeyup="allInputsValidation()" class=" form-control text-black bg-white" placeholder="Enter Your Name">
      <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
        Special characters and numbers not allowed
      </div>
    </div>
    <div class="col-md-6">
      <input id="emailInput" type="text" onkeyup="allInputsValidation()" class=" form-control text-black bg-white  w-100" placeholder="Enter Your Email">
      <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
        Email not valid *exemple@yyy.zzz  
        </div>
    </div>
    <div class="col-md-6">
      <input id="phoneInput" type="text" onkeyup="allInputsValidation()" class=" form-control text-black bg-white" placeholder="Enter Your Phone">
      <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid Phone Number 
        </div>
    </div>
    <div class="col-md-6">
      <input id="ageInput" type="number" onkeyup="allInputsValidation()" class=" form-control text-black bg-white" placeholder="Enter Your Age">
      <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid Age   </div>
    </div>
    <div class="col-md-6">
      <input id="passInput" type="password" onkeyup="allInputsValidation()" class=" form-control text-black bg-white" placeholder="Enter Your Password">
      <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid password *Minimum eight characters,start with capital litter  </div>
    </div>
    <div class="col-md-6">
      <input id="rePassInput" type="password" onkeyup="allInputsValidation()" class=" form-control text-black bg-white" placeholder="Repassword">
      <div id="rePassAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid repassword
      </div>
    </div>
    <button id="submitBtn" disabled class="btn btn-danger text-white  mt-3  text-center m-auto col-3">Submit</button>
  </div>
  </div>
  </div>
    `



document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("rePassInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})


}


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function allInputsValidation(){
    if(nameInputTouched){
        if(nameValidation()){
            document.getElementById("nameAlert").classList.replace("d-block","d-none")
        }
        else{
            document.getElementById("nameAlert").classList.replace("d-none","d-block") 
        }
    }
    if(emailInputTouched){
        if(emailValidation()){
            document.getElementById("emailAlert").classList.replace("d-block","d-none")
        }
        else{
            document.getElementById("emailAlert").classList.replace("d-none","d-block") 
        }
    }
  if(phoneInputTouched){
    if(phoneValidation()){
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("phoneAlert").classList.replace("d-none","d-block") 
    }
  }
    if(ageInputTouched){
        if(ageValidation()){
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
        }
        else{
            document.getElementById("ageAlert").classList.replace("d-none","d-block") 
        }
    }
    if(passwordInputTouched){
        if(passValidation()){
            document.getElementById("passAlert").classList.replace("d-block","d-none")
        }
        else{
            document.getElementById("passAlert").classList.replace("d-none","d-block") 
        }
    }
   if(repasswordInputTouched){
    if(repassValidation()){
        document.getElementById("rePassAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("rePassAlert").classList.replace("d-none","d-block") 
    }
   }
   if(nameValidation() && emailValidation() && passValidation() && ageValidation() && phoneValidation() && repassValidation()){
    document.getElementById("submitBtn").removeAttribute("disabled")
}
else{
    document.getElementById("submitBtn").setAttribute("disabled",true) 
}
}




function nameValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation(){
    return (/^[a-zA-Z-_]{3,20}@[a-zA-Z]{3,10}.[a-z]{2,3}$/.test(document.getElementById("emailInput").value))
}
function phoneValidation(){
    return (/^(010|011|012|015)[0-9]{8}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passValidation(){
    return (/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{8,}$/.test(document.getElementById("passInput").value))
}
function repassValidation(){
    return document.getElementById("rePassInput").value == document.getElementById("passInput").value
}