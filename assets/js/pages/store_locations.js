import { storeDatas } from "../data/store_datas";

const storeContainer = document.getElementById('store-card-container');
const selectElement = document.getElementById('locations-select');

const newStoreCard = (store) => {
    const storeCard = document.createElement('div');
    storeCard.className = 'store-card mb-48';

    // image
    const img = document.createElement('img');
    img.src = store.image_url;
    img.alt = 'store ' + store.id;
    img.className = 'd-block';

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

    // button
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'border';

    const detailButton = document.createElement('button');
    detailButton.className = 'btn-store-detail w-p-100';
    detailButton.textContent = '詳細資訊';

    detailButton.addEventListener('click', () => {
        var dataObject = {
            id: store.id,
            name: store.name,
            image_url: store.image_url,
            phone_number: store.phone_number,
            phone_href: store.phone_href,
            opening_hours: store.opening_hours,
            address: store.address,
            location: store.location
        };

        var dataJson = encodeURIComponent(JSON.stringify(dataObject));
        window.location.href = './store_detail.html?data=' + dataJson;
    });

    buttonDiv.appendChild(detailButton);

    storeCard.appendChild(img);
    storeCard.appendChild(nameDiv);
    storeCard.appendChild(ul);
    storeCard.appendChild(buttonDiv);

    return storeCard;
}

for (const store of storeDatas) {
    storeContainer.appendChild(newStoreCard(store));
}

selectElement.addEventListener("change", () => {
    var selectedValue = selectElement.value;
    console.log(selectedValue);

    var newStoreDatas = []

    if (selectedValue == 'all') {
        newStoreDatas = storeDatas;
    } else {
        newStoreDatas = storeDatas.filter((value) => {
            return value.location == selectedValue;
        });
    }

    storeContainer.innerHTML = '';

    for (const store of newStoreDatas) {
        storeContainer.appendChild(newStoreCard(store));
    }
})

