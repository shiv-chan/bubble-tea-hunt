const header = document.querySelector('header');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort');
const submitBtn = document.querySelector('button[type="submit"]');
const loopWrap = document.querySelector('.loop-wrap');
const imageWrap1 = document.querySelector('.image-wrap1');
const imageWrap2 = document.querySelector('.image-wrap2');
const spinner = document.getElementById('spinner');
let cards = document.getElementsByClassName('card');
const mapBtn = document.querySelector('.mapBtn');
const map = document.getElementById('map');
let mapOpen = false;
let markerIndex = '';

let allData = [];

const corsAccess = 'https://cors-anywhere.herokuapp.com/';
let endpoint = `${corsAccess}https://api.yelp.com/v3/businesses/search?term=bubble+tea&limit=50`;
const apikey = config.YELP_API_KEY;

const fetchData = async () => {
	try {
		spinner.removeAttribute('hidden');
		const res = await fetch(
			`${endpoint}&location=${
				searchInput.value == '' ? 'Vancouver, BC' : searchInput.value
			}`,
			{
				headers: {
					Authorization: `Bearer ${apikey}`,
				},
			}
		);
		if (res.status !== 200) {
			spinner.setAttribute('hidden', '');
		}
		const data = await res.json();
		allData.push(...data.businesses);
		spinner.setAttribute('hidden', '');
		console.log(allData);
	} catch (err) {
		console.error('Error: ', err);
	}
};

function displayCards() {
	if (allData.length === 0) {
		const notfound = `<h1>Sorry...Nothing found. Try again!</h1>`;
		container.innerHTML = notfound;
		container.style.display = 'block';
	}

	const html = allData
		.map((business) => {
			return `
      <div class="card" id="${business.id}">
        <div class="image" style="background-image: url(${
					business.image_url
				})"></div>
        <div class="description">
          <h1>${business.name}</h1>
          <div>
            ${
							business.is_closed
								? '<p style="background-color: red">Closed</p>'
								: '<p>Open</p>'
						}
            <p>${formatNumber(
							(Math.round(business.distance) / 1000).toFixed(2)
						)} km from the location</p>
            <p><i class="fas fa-star"></i>${business.rating}</p>
            <p>${business.review_count} reviews</p>
          </div>
          <ul>
            <li>${business.location.display_address.join(', ')}</li>
            <li>${business.display_phone}</li>
          </ul>
          <a href=${business.url}>Learn More</a>
        </div>
      </div>
    `;
		})
		.join('');

	container.innerHTML = html;
	container.style.display = 'block';

	searchInput.value = '';

	for (let card of cards) {
		card.addEventListener('click', function () {
			window.location.href = '#map';
			let businessID = card.id;
			markers.map((marker, index) => {
				if (marker.id === businessID) markerIndex = index;
			});
			if (markerIndex !== '') {
				initMap();
				mapOpen = true;
				mapBtn.innerHTML = `<i class="fas fa-map-marked-alt"></i> Close the Map`;
				loopWrap.style.display = 'none';
				map.style.display = 'block';
			}
		});
	}
}

async function createCards() {
	loopWrap.style.display = 'none';
	container.style.display = 'none';
	allData = [];
	markerIndex = '';
	await fetchData();
	displayCards();
	initMap();
}

function sort() {
	const sortBy = sortSelect.selectedOptions[0].textContent;
	if (allData.length !== 0) {
		if (sortBy === 'Rating') {
			allData.sort((a, b) => b.rating - a.rating);
		} else if (sortBy === 'Review Count') {
			allData.sort((a, b) => b.review_count - a.review_count);
		} else if (sortBy === 'Distance') {
			allData.sort((a, b) => a.distance - b.distance);
		}
		displayCards();
	}
}

//number formatting
function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function toggleMap() {
	mapOpen = !mapOpen;

	if (mapOpen) {
		mapBtn.innerHTML = `<i class="fas fa-map-marked-alt"></i> Close the Map`;
		loopWrap.style.display = 'none';
		map.style.display = 'block';
	} else {
		mapBtn.innerHTML = `<i class="fas fa-map-marked-alt"></i> Check on Map`;
		map.style.display = 'none';
	}
}

//document.addEventListener('DOMContentLoaded', imageForLoopWrap)
submitBtn.addEventListener('click', createCards);

searchInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		createCards();
	}
});

sortSelect.addEventListener('change', sort);

mapBtn.addEventListener('click', toggleMap);
