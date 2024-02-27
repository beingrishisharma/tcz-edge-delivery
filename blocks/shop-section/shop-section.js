var mainDiv = document.querySelector('.shop-section'),
    childDiv = mainDiv.children[1];

childDiv.classList.add('shop-grid');

const cardContent = document.querySelectorAll('.shop-grid > div');
var cardContent_array = [...cardContent]; 

cardContent_array.forEach((element) => {
    const cardContWrap = document.createElement('div');
    cardContWrap.className = "card-content-wrap";

    const cardHead = element.children[1];
    cardHead.classList.add('card-head');

    const cardText = element.children[2];
    cardText.classList.add('card-text');

    const cardCta = element.children[3];
    cardCta.classList.add('card-cta');

    cardContWrap.append(cardHead, cardText, cardCta);

    element.append(cardContWrap);

})
