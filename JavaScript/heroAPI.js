//API modified from: https://codepen.io/rachsmith/pen/PWxoLN

// Declare global variables
var cards, nCards, cover, openContent, openContentText,
    openContentImage, closeContent, windowWidth, windowHeight,
    currentCard, pageIsOpen = false;

var paragraphTexts = [
    '<p>This is paragraph content for card 1. Lorem ipsum dolor sit amet.</p>',
    '<p>This is paragraph content for card 2. Consectetur adipiscing elit.</p>',
    '<p>This is paragraph content for card 3. Sed do eiusmod tempor incididunt.</p>',
    '<p>This is paragraph content for card 4. Ut labore et dolore magna aliqua.</p>'
    // Add more as needed (must match number of cards)
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
