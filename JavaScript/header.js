// function myFunction(){
//     var x = document.getElementById("myLinks");
//     if(x.style.display==="block"){
//         x.style.display="none";
//     }else{
//         x.style.display="block";
//     }
// }

var prevScrollpos = window.pageYOffset;
window.onscroll=function(){
    var currentScrollPos=window.pageYOffset;
    if(prevScrollpos > currentScrollPos){
        document.getElementById("topnav").style.top="0";
    }else{
        document.getElementById("topnav").style.top="-50px";
    }
    prevScrollpos=currentScrollPos;
}