import {
  loadComponent,
  getNameByCountry,
  getData,
  cardComponent,
  menuByLocationComponent,
  loadFilteredComponent,
  arrFiltered,
} from './data.js';

const $btnClose = document.getElementById('btn-close'),
  $modal = document.querySelector('.modal'),
  $btnByCountry = document.getElementById('country'),
  $btnByGuests = document.getElementById('guests'),
  $btnLocation = document.querySelector('.btn-location'),
  $guestsBtn = document.querySelector('.btn-guests'),
  $place = document.getElementById('place'),
  $tagsByPlacer = document.querySelector('.places'),
  $sumGuests = document.getElementById('sum-guests'),
  $placesContainer = document.querySelector('.places'),
  $summaryContainer = document.querySelector('.summary-guests'),
  $summary = document.querySelectorAll('.summary'),
  $summaryAdult = document.getElementById('summary-adult'),
  $summaryChildren = document.getElementById('summary-children'),
  $searchTitle = document.getElementById('search-title'),
  $cardsContainer = document.getElementById('cards-container');

let currentAdulst = 0;
let currentChildrens = 0;
let currentGuests = 0;
let currentPlace = undefined;

function closeMenuModal() {
  $modal.classList.remove('active');
  window.layer.style.display = 'none';
}
function showModal(e) {
  $modal.classList.add('active');
  window.layer.style.display = 'block';
  if (e.target.id === 'country') {
    showMenu($summaryContainer, $placesContainer);
  } else if (e.target.id === 'guests') {
    showMenu($placesContainer, $summaryContainer);
  }
}

function showMenu($container, $newContent) {
  if (!$container.classList.contains('disabled')) {
    $container.classList.add('disabled');
  }
  $newContent.classList.remove('disabled');
}

function showSummaryGuests() {
  showMenu($placesContainer, $summaryContainer);
}

function showMenuLocation() {
  showMenu($summaryContainer, $placesContainer);
}

function printDOM() {
  loadComponent(getNameByCountry, $placesContainer, menuByLocationComponent);
  loadComponent(getData, $cardsContainer, cardComponent);
}

async function selectPlace(e) {
  if (!e.target.classList.contains('selected-location')) {
    return;
  }
  const key = e.target.textContent;
  $place.textContent = key;
  currentPlace = key;
  $searchTitle.textContent = currentPlace;
  cleanHTML($cardsContainer);
  loadFilteredComponent(arrFiltered(key), $cardsContainer, cardComponent);
  closeMenuModal();
}

function cleanHTML($container) {
  while ($container.firstChild) {
    $container.removeChild($container.firstChild);
  }
}

function selectedButtonsSummary(e) {
  if (
    !e.target.classList.contains('plus-button') &&
    !e.target.classList.contains('less-button')
  ) {
    return;
  }

  switch (e.target.classList[0]) {
    case 'plus-adult':
      currentAdulst++;
      currentGuests++;
      increment($summaryAdult, currentAdulst, currentGuests);
      break;
    case 'kid-plus':
      currentChildrens++;
      currentGuests++;
      increment($summaryChildren, currentChildrens, currentGuests);
      break;
    case 'less-adult':
      currentAdulst--;
      currentGuests--;
      increment($summaryAdult, currentAdulst, currentGuests);
      break;
    case 'kid-less':
      currentChildrens--;
      currentGuests--;
      increment($summaryChildren, currentChildrens, currentGuests);
      break;
    default:
      console.log('wrong');
  }
}

function increment($el, currentSummary, currentG) {
  if (currentChildrens < 0 || currentAdulst < 0) {
    currentSummary = 0;
    currentG = 0;
  }
  $sumGuests.textContent = `${currentG} guests`;
  $el.textContent = currentSummary;
}

$btnClose.addEventListener('click', closeMenuModal);
$guestsBtn.addEventListener('click', showSummaryGuests);
$btnLocation.addEventListener('click', showMenuLocation);
$btnByCountry.addEventListener('click', showModal);
$btnByGuests.addEventListener('click', showModal);
$tagsByPlacer.addEventListener('click', selectPlace);

$summary.forEach(el => el.addEventListener('click', selectedButtonsSummary));

document.addEventListener('DOMContentLoaded', printDOM);
