export async function getData() {
  const response = await fetch('../../stays.json');
  const data = await response.json();
  return data;
}

function cleandArrayToDuplicates(arr, data) {
  const newArr = arr.map(el => el[data]);
  const finalArr = Array.from(new Set([...newArr]));
  return finalArr;
}

export async function getNameByCountry() {
  const data = await getData();
  const getCountries = cleandArrayToDuplicates(data, 'city');
  const arrCountries = [];
  for (let i = 0; i < getCountries.length; i++) {
    arrCountries.push({
      city: getCountries[i],
      country: data[i].country,
    });
  }
  return arrCountries;
}

async function renderDOM(data, $container, component) {
  const $el = document.createElement('div');
  $el.innerHTML = component(data);
  $container.appendChild($el.firstElementChild);
}

export async function loadComponent(arr, $container, component) {
  const data = await arr();
  data.forEach(el => renderDOM(el, $container, component));
}

export async function loadFilteredComponent(arr, $container, component) {
  const data = await arr;
  data.forEach(el => renderDOM(el, $container, component));
}

export function menuByLocationComponent({ country, city }) {
  return `<li class="places__item">
            <button class="btn">
              <img class="btn--location" src="./assets/img/maps-and-flags.svg" alt="search icon" />
            </button>
            <span class="selected-location">${city}, ${country}</span>
          </li>`;
}

export function cardComponent({ beds, photo, rating, title, type, superHost }) {
  return `
        <article class="card">
          <img
            class="card__img"
            src=${photo}
            alt=${title}
          />
          <div class="card__details">
            <div class="tags">
            ${superHost ? `<span class="main-tag">super host</span>` : ''}
              <span class="tag">${type}</span>
              ${beds ? `<span class="tag">${beds} beds</span>` : ''}
              
              <div class="rating" id="rating">
                <span>
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512.002 512.002"
                    style="enable-background: new 0 0 512.002 512.002"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M511.267,197.258c-1.764-5.431-6.457-9.389-12.107-10.209l-158.723-23.065L269.452,20.157
			c-2.526-5.12-7.741-8.361-13.45-8.361c-5.71,0-10.924,3.241-13.451,8.361l-70.988,143.827l-158.72,23.065
			c-5.649,0.82-10.344,4.778-12.108,10.208c-1.765,5.431-0.293,11.392,3.796,15.377l114.848,111.954L92.271,482.671
			c-0.966,5.628,1.348,11.314,5.967,14.671c2.613,1.898,5.708,2.864,8.818,2.864c2.388,0,4.784-0.569,6.978-1.723l141.967-74.638
			l141.961,74.637c5.055,2.657,11.178,2.215,15.797-1.141c4.619-3.356,6.934-9.044,5.969-14.672l-27.117-158.081l114.861-111.955
			C511.56,208.649,513.033,202.688,511.267,197.258z"
                        />
                      </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                </span>
                <span>${rating}</span>
              </div>
            </div>
            <h3 class="card__heading">
              ${title}
            </h3>
          </div>
        </article>`;
}

export async function arrFiltered(key) {
  const data = await getData();
  const value = key.split(',')[0];
  const newItems = data.filter(el => el.city === value);
  return newItems;
}
