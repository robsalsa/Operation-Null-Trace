//API modified from: https://codepen.io/rachsmith/pen/PWxoLN

// Declare global variables
var cards, nCards, cover, openContent, openContentText,
    openContentImage, closeContent, windowWidth, windowHeight,
    currentCard, pageIsOpen = false;

var paragraphTexts = [
  `<p>
    <strong>Project Title:</strong> LA Wildfire Watch<br>
    <strong>Authors:</strong> Emi, Toba, Maia, Roberto, Reyli, Reyna<br>
    <strong>Date:</strong> April 24, 2025<br>
    <strong>Status:</strong> APPROVED<br><br>
    <strong>Summary:</strong> LA Wildfire Watch is a web application designed to provide Los Angeles residents with real-time insights into wildfire recovery and risks. It displays data on active and past fires, debris removal progress, and daily fire danger levels. The project aims to make government data more accessible, especially for communities recovering from the Palisades and Eaton fires in January 2025.<br><br>
    <strong>Key Features:</strong> Debris Removal Tracker with interactive maps, Historical Insights through heatmaps, and Daily Fire Danger Levels from sources like NOAA and Smokey Bear.<br><br>
    <strong>Technologies:</strong> AWS, ArcGIS API, Kaggle datasets, GitHub, Python Flask, PostgreSQL, React, HTML & CSS, and Folium & Google Maps API.<br><br>
    <strong>Motivation:</strong> To help communities stay informed, make data-driven decisions, and advocate for necessary resources by turning complex data into clear, actionable insights.
  </p>`,

  `<p>
    <strong>Project Title:</strong> Restaurant Reservation Web Page<br>
    <strong>Authors:</strong> Andre Richardson, Roberto Salazar Vasquez, Alexander Escobedo, Gustavo Fuentes, Leai Jackson<br>
    <strong>Date:</strong> Spring 2025<br>
    <strong>Status:</strong> In Development<br><br>
    <strong>Summary:</strong> This project is a software solution for restaurant reservation management, designed to improve customer experience and streamline table availability tracking for employees. It provides customers with an intuitive reservation system and equips restaurant staff with tools for managing seating and viewing active reservations.<br><br>
    <strong>Key Features:</strong> Customer-facing reservation form, live seating chart for employees, editable reservation list for staff, and a searchable lookup tool. Menu items with descriptions and prices are also displayed on the homepage.<br><br>
    <strong>Technologies:</strong> Java, SpringBoot, React.js, Bootstrap, MySQL, GitHub, Visual Studio Code<br><br>
    <strong>Motivation:</strong> To reduce wait times for customers and eliminate confusion for staff by integrating a streamlined reservation and seating interface accessible via both desktop and mobile platforms.
  </p>`,

  `<p>
    <strong>Project Title:</strong> Original Site<br>
    <strong>Authors:</strong> Roberto Salazar Vasquez<br>
    <strong>Date:</strong> Janurary 2021<br>
    <strong>Status:</strong> Complete but Out Dated<br><br>
    <strong>Summary:</strong> Similar to this site it was a simple website resume.<br><br>
    <strong>Key Features:</strong> Its LIVE...still... i guess.<br><br>
    <strong>Technologies:</strong> HTML & CSS. GitHub was used for deployment<br><br>
    <strong>Motivation:</strong> I thought it would be fun but it also had an added benifit of being good practice in web development.
  </p>`,

  `<p>
    <strong>Project Title:</strong> Theres more to come...<br>
    <strong>Authors:</strong> Roberto Salazar Vasquez<br>
    <strong>Date:</strong>2025<br>
    <strong>Status:</strong>Planning Phase<br><br>
    <strong>Summary:</strong> Check the my GitHub<br><br>
    <strong>Motivation:</strong> For fun and practice. I never want this to be boring so why not squeeze as much fun out of it :)
  </p>`
];


// Initiate the process
init();

function init() {
    resize();
    selectElements();
    attachListeners();
}

function selectElements() {
    cards = document.getElementsByClassName('card');
    nCards = cards.length;
    cover = document.getElementById('cover');
    openContent = document.getElementById('open-content');
    openContentText = document.getElementById('open-content-text');
    openContentImage = document.getElementById('open-content-image');
    closeContent = document.getElementById('close-content');
}

function attachListeners() {
    for (var i = 0; i < nCards; i++) {
        attachListenerToCard(i);
    }
    closeContent.addEventListener('click', onCloseClick);
    window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
    cards[i].addEventListener('click', function (e) {
        var card = getCardElement(e.target);
        onCardClick(card, i);
    });
}

function onCardClick(card, i) {
    currentCard = card;
    currentCard.classList.add('clicked');
    setTimeout(function () {
        animateCoverUp(currentCard, i);
    }, 500);
    animateOtherCards(currentCard, true);
    openContent.classList.add('open');
}

function animateCoverUp(card, i) {
    var cardPosition = card.getBoundingClientRect();
    var cardStyle = getComputedStyle(card);
    setCoverPosition(cardPosition);
    setCoverColor(cardStyle);
    scaleCoverToFillWindow(cardPosition);
    openContentText.innerHTML = '<h1>' + card.children[2].textContent + '</h1>' + (paragraphTexts[i] || '<p>No content available.</p>');
    openContentImage.src = card.children[1].src;
    setTimeout(function () {
        window.scroll(0, 0);
        pageIsOpen = true;
    }, 300);
}

function animateCoverBack(card) {
    var cardPosition = card.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
    cover.style.transform = 'scaleX(1) scaleY(1) translate3d(0px, 0px, 0px)';
    setTimeout(function () {
        openContentText.innerHTML = '';
        openContentImage.src = '';
        cover.style.width = '0px';
        cover.style.height = '0px';
        pageIsOpen = false;
        currentCard.classList.remove('clicked');
    }, 301);
}

function setCoverPosition(cardPosition) {
    cover.style.left = cardPosition.left + 'px';
    cover.style.top = cardPosition.top + 'px';
    cover.style.width = cardPosition.width + 'px';
    cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
    cover.style.backgroundColor = cardStyle.backgroundColor;

}

function scaleCoverToFillWindow(cardPosition) {
    var scaleX = windowWidth / cardPosition.width;
    var scaleY = windowHeight / cardPosition.height;
    var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
    var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
    cover.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ') translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0px)';
}

function onCloseClick() {
    openContent.classList.remove('open');
    animateCoverBack(currentCard);
    animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
    var delay = 100;
    for (var i = 0; i < nCards; i++) {
        if (cards[i] === card) continue;
        if (out) animateOutCard(cards[i], delay);
        else animateInCard(cards[i], delay);
        delay += 100;
    }
}

function animateOutCard(card, delay) {
    setTimeout(function () {
        card.classList.add('out');
    }, delay);
}

function animateInCard(card, delay) {
    setTimeout(function () {
        card.classList.remove('out');
    }, delay);
}

function getCardElement(el) {
    while (el && !el.classList.contains('card')) {
        el = el.parentElement;
    }
    return el;
}

function resize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (pageIsOpen) {
        var cardPosition = currentCard.getBoundingClientRect();
        setCoverPosition(cardPosition);
        scaleCoverToFillWindow(cardPosition);
    }
}
