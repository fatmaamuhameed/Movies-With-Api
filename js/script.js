$(document).ready(function(){
    getData();    
})

let films = []
let f = []
async function getData(){
    //https://api.themoviedb.org/3/movie/popular?api_key=0ed94e09ada4f5caabe7254f44a40348
    let apiResponse = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=0ed94e09ada4f5caabe7254f44a40348`)
    let allFilms = await apiResponse.json();
    console.log(allFilms.results)
    films = allFilms.results;
    displayFilms(films)
}

async function getHref(href){
    if(href == "trending"){
        let apiResponse = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=0ed94e09ada4f5caabe7254f44a40348`)
        let allFilms = await apiResponse.json();
        films = allFilms.results;
        displayFilms(films)
    }
    else if(href=="contactUs"){
        let x  = $(href).offset().top
        $("html,body").animate({scrollTop:x},3000)

    }
    else{
        let apiResponse = await fetch(`https://api.themoviedb.org/3/movie/${href}?api_key=0ed94e09ada4f5caabe7254f44a40348`)
        let allFilms = await apiResponse.json();
        console.log(allFilms.results)
        films = allFilms.results;
        displayFilms(films)
    }

}

function displayFilms(arr){
    let cartona = ``

    for(let i=0;i<arr.length;i++){
    cartona+= `<div class="col-md-4 mt-4 ">
    <div class="position-relative overflow-hidden film">
        <img src="https://image.tmdb.org/t/p/w500/${arr[i].poster_path}" class="img-fluid">
        <div class="content-films text-center  position-absolute d-flex align-items-center justify-content-center">
            <div>
                <h5>${arr[i].original_title}</h5>
                <p>${arr[i].overview}</p>
                 <p>rate: ${arr[i].vote_average}</p>
                <p>${arr[i].release_date}</p>
            </div>
        </div>
    </div> 
    </div>`
    }

    document.getElementById("myFilms").innerHTML = cartona;
}

$("#iconAlign").click(function(){
    //$("ul li a").slideDown(2000)
    //$("ul li").css({paddingTop: "25px" , transition: "  opacity 2s , paddingTop 2s" } )'
    $("li").animate({opacity:"1" , paddingTop:"25px"} , 800);
    $("#iconAlign").hide(1);
    $("#replaceIcon").show(1);
    let menu = $("#menu").width();
    $("#outNav").css({left:menu , transition:"left 1s"});
    $("#menu").css({left: "0" , transition: "left 1s"} );
    
})

$("#replaceIcon").click(function(){
    $("li").animate({opacity:"0" , paddingTop:"500px"} , 800);
    $("#iconAlign").show(1);
    $("#replaceIcon").hide(1);
    $("#outNav").css({left:0 , transition:"left 1s"});
    $("#menu").css({left: -199 , transition: "left 1s"})
    //$("ul li a").slideUp(2000)
})

$("ul li a").click(function(){
    let aHref = $(this).attr("href").split("#")[1];
    getHref(aHref)
    console.log(aHref)
})

let n,a,ph,e,p,rep = false;
///valid name
$("#name").keyup(function(){
    let regName = /^[a-zA-Z]+[a-zA-Z]+$/;
    let name = $("#name").val();
    console.log(name)
    if(regName.test(name)){
        $("#valid-name").css("display" , "none")
        n=true;
    }
    else{
        $("#valid-name").css("display" , "flex")
        //console.log("invalid")
    }
})

//valid phone

$("#phone").keyup(function(){
    if($("#name").val()==""){
        $("#valid-name").css("display" , "flex")
    }
    let regName = /^(002|\+2)?01[0125][0-9]{8}$/;
    let name = $("#phone").val();
    //console.log(name)
    if(regName.test(name)){
        $("#valid-phone").css("display" , "none")
        ph=true;
    }
    else{
        $("#valid-phone").css("display" , "flex")
        //console.log("invalid")
    }
})
/// valid email

$("#email").keyup(function(){
    if($("#name").val()==""){
        $("#valid-name").css("display" , "flex")
    }
    let regName = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let name = $("#email").val();
    //console.log(name)
    if(regName.test(name)){
        $("#valid-email").css("display" , "none")
        e=true;
    }
    else{
        $("#valid-email").css("display" , "flex")
        //console.log("invalid")
    }
})

// valid age

$("#age").keyup(function(){
    if($("#name").val()==""){
        $("#valid-name").css("display" , "flex")
    }
    let regName = /^[1-9][0-9]?$|100$/;
    let name = $("#age").val();
    //console.log(name)
    if(regName.test(name)){
        $("#valid-age").css("display" , "none")
        a=true;
    }
    else{
        $("#valid-age").css("display" , "flex")
        //console.log("invalid")
    }
})
//valid password
let password;
$("#password").keyup(function(){
    let regName = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let name = $("#password").val();
    if($("#name").val()==""){
        $("#valid-name").css("display" , "flex")
    }
    //console.log(name)
    if(regName.test(name)){
        $("#valid-password").css("display" , "none")
        p=true;
    }
    else{
        $("#valid-password").css("display" , "flex")
        //console.log("invalid")
    }
    $("#password").blur(function(){
        password=name;
    })
})

$("#Repassword").keyup(function(){
    if($("#name").val()==""){
        $("#valid-name").css("display" , "flex")
    }
    let name = $("#Repassword").val(); 
    if(name!=password){
        $("#valid-rePassword").css("display" , "flex")
        rep=true;
    }
    else{
        $("#valid-rePassword").css("display" , "none")        
    }
})

$(document).click(function(){
    debugger
    if(n && a && ph && p && rep && e){
        console.log(a,ph,p,n,e)
        let x = document.getElementById("buttn");
        x.style.cssText = "cursor: pointer !important"
        $( "button" ).prop( "disabled", false );
    }
})


$("#movieByWord").keyup(async function(){
        let name = $("#movieByWord").val();
        let apiResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0ed94e09ada4f5caabe7254f44a40348&language=en-US&query=${name}`)
        let allFilms = await apiResponse.json();
        films = allFilms.results;
        displayFilms(films)    
})

$("#search").keyup(function(){
    let search = []
    let name = $("#search").val();
    for(let i=0;i<films.length;i++){
        if(films[i].original_title.toLowerCase().includes(name.toLowerCase())){
            search.push(films[i]);
            displayFilms(search);
        }
    }
    
})
