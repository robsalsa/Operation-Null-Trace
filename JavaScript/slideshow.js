let slideIndex=0;
showSlides();

function showSlides(){
    let innie;
    let slides= document.getElementsByClassName("fadeaway");

    for(innie=0; innie<slides.length;innie++){
        slides[innie].style.display ="none";
    }

    slideIndex++;
    if(slideIndex > slides.length){
        slideIndex=1;
    }
    
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000);
                            // note it changes every 10 seconds
}