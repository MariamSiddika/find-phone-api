//Fetch data or api
const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(result => displayPhones(result.data, dataLimit));
}

//display function
const displayPhones = (phones, dataLimit) => {
    //console.log(phones);

    const phonesConatiner = document.getElementById('phones-container');
    phonesConatiner.textContent = '';
    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //Display no phone found message
    const emptyMessage = document.getElementById('no-result-msg');
    if (phones.length === 0) {
        emptyMessage.classList.remove('d-none')
    }
    else {
        emptyMessage.classList.add('d-none');
    }

    //display all phones
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-3 " alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button id="phoneDetailBtn" onclick = "loadPhoneDetail('${phone.slug}')" href="#" class="btn  btn-dark" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
    `;
        phonesConatiner.appendChild(div);
    }
    //Spinner stops
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    // spinner starts
    toggleSpinner(true);
    //get input text
    const inputText = document.getElementById('search-text');
    const inputValue = inputText.value;

    loadPhones(inputValue, dataLimit);
}

//even handler on search button
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
});

//Input field enter key handler(*done on input field)
document.getElementById('search-text').addEventListener('keypress', function (e) {
    //console.log(e.key);
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

//Spinner function
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
//Load show all (Not the recomended way to load all results)
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
    const inputText = document.getElementById('search-text');
    const inputValue = inputText.value;
    inputText.value = '';
})

//Load Phone Detail
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

//Display Phone Detail
const displayPhoneDetail = phone => {
    //console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No bluetooth information found'}</p>
    `;
}