import { storeDatas } from "../data/store_datas";

const storeSelect = document.getElementById("store-select");
const storeDetailCardContainer = document.getElementById("store-detail-card-container");

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataJson = urlParams.get('data');
var dataObject = JSON.parse(decodeURIComponent(dataJson));

const newStoreCard = (store) => {
    const storeCard = document.createElement('div');
    storeCard.className = 'store-card mb-lg-24 store-detail d-lg-flex flex-md-column';

    // image
    const img = document.createElement('img');
    img.src = store.image_url;
    img.alt = 'store ' + store.id;
    img.className = 'store-image d-block';

    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail-div'

    // name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'border py-16 px-24';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'd-block fs-24'
    nameSpan.textContent = store.name;
    nameDiv.appendChild(nameSpan);

    // ul
    const ul = document.createElement('ul');
    ul.className = 'border py-16 px-24';

    // phone
    const phoneIconSpan = document.createElement('span');
    phoneIconSpan.className = 'mr-8 material-icons-outlined fs-18';
    phoneIconSpan.textContent = 'call';

    const phoneTextSpan = document.createElement('span');
    phoneTextSpan.className = 'fs-20';
    phoneTextSpan.textContent = '電話：';

    const phoneA = document.createElement('a');
    phoneA.href = store.phone_href;
    phoneA.className = 'fs-20 color-black';
    phoneA.textContent = store.phone_number;

    const phoneLi = document.createElement('li');
    phoneLi.className = 'mb-8'
    phoneLi.appendChild(phoneIconSpan);
    phoneLi.appendChild(phoneTextSpan);
    phoneLi.appendChild(phoneA);
    
    // opening time
    const openingIconSpan = document.createElement('span');
    openingIconSpan.className = 'mr-8 material-icons-outlined fs-18';
    openingIconSpan.textContent = 'schedule';

    const openingTextSpan = document.createElement('span');
    openingTextSpan.className = 'fs-20';
    openingTextSpan.textContent = '營業時間：' + store.opening_hours;

    const openingLi = document.createElement('li');
    openingLi.className = 'mb-8';
    openingLi.appendChild(openingIconSpan);
    openingLi.appendChild(openingTextSpan);

    // address
    const addressIconSpan = document.createElement('span');
    addressIconSpan.className = 'mr-8 material-icons-outlined fs-18';
    addressIconSpan.textContent = 'location_on';

    const addressTextSpan = document.createElement('span');
    addressTextSpan.className = 'fs-20';
    addressTextSpan.textContent = '地址：' + store.address;

    const addressLi = document.createElement('li');
    addressLi.className = 'mb-8';
    addressLi.appendChild(addressIconSpan);
    addressLi.appendChild(addressTextSpan);

    ul.appendChild(phoneLi);
    ul.appendChild(openingLi);
    ul.appendChild(addressLi);

    detailDiv.appendChild(nameDiv);
    detailDiv.appendChild(ul);

    storeCard.appendChild(img);
    storeCard.appendChild(detailDiv);

    return storeCard;
}

const mapDiv = document.createElement('div');
mapDiv.className = 'map-div'
const mapImage = document.createElement('img');
mapImage.src = '../assets/images/map-lg.png';
mapImage.alt = 'map';
mapImage.className = 'd-block';
mapDiv.appendChild(mapImage);

for (const store of storeDatas) {
    const storeOption = document.createElement('option');
    storeOption.value = store.id;
    storeOption.textContent = store.name;

    storeSelect.appendChild(storeOption);
}

storeDetailCardContainer.appendChild(newStoreCard(dataObject));
storeDetailCardContainer.appendChild(mapDiv);

storeSelect.addEventListener("change", () => {
    var selectedValue = storeSelect.value;
    storeDetailCardContainer.innerHTML = '';

    for (const store of storeDatas) {
        if (selectedValue == store.id) {
            storeDetailCardContainer.appendChild(newStoreCard(store));
            storeDetailCardContainer.appendChild(mapDiv);
            break;
        }
    }
});
