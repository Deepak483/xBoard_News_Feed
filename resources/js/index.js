const magazines = [
  "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
  "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
  "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss",
];

// console.log(magazines);

const generateId = () => Math.random().toString(36).substring(2, 9);
// console.log(generateId());

async function addContentToDom(magazines) {
  for (let i = 0; i < magazines.length; i++) {
    let magazineUrl = magazines[i];
    console.log(magazineUrl);
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(magazineUrl)}`
    );
    let data = await response.json();
    console.log(data);
    // console.log(data.items[0].enclosure.link);
    // console.log(data.items[0].link);
    // create a carousel outer
    let accordionId = generateId();
    let accordionItem = createAccordionItem(data.feed.title, accordionId, i);
    document.getElementById("accordionExample").innerHTML += accordionItem;

    //creata a carousel outer
    let carouselId = generateId();
    let carouselInnerId = generateId();
    let carousel = createCarouselOuter(carouselId, carouselInnerId);
    document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

    //create a carousel inner
    let items = data.items;
    console.log(items);
    for (let j in items) {
      // console.log(items[j].link);
      // console.log(items[j].enclosure.link);
      let carouselItem = createCarouselInner(items[j], j == 0);
      document.getElementById(`${carouselInnerId}`).innerHTML += carouselItem;
    }
  }
}

function createAccordionItem(title, id, currentIndx) {
  return `<div class="accordion-item">
  <h2 class="accordion-header" id="headingOne">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
      <h5 class="accordion-title">${title}</h5>
    </button>
  </h2>
  <div id="collapse${id}" class="accordion-collapse accordion-body collapse ${
    currentIndx === 0 ? "show" : ""
  }" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">
    
  </div>`;
}

function createCarouselOuter(id, innerId) {
  return `<div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-inner" id="${innerId}">
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;
}

function createCarouselInner(item,active) {
  return `<div class="carousel-item h-100 ${active ? "active" : ""}">
  <a href="${item.link}">
  <img src="${item.enclosure.link}"  id="carouselImage" class="activity-card-image d-block w-100" style="background-size:cover;background-position:center" alt="...">
  </a>
  <div class="card-body">
  <h3 class="card-title">${item.title}</h3>
  <div class="small-container">
  <h6 class="card-subtitle mb-2 " style="margin-right:2rem">${item.author}</h6>
  <h6 class="card-date ">${item.pubDate}</h6>
  </div>
  <p class="card-text">${item.description}</p>
  <a href="${item.link}" class="stretched-link" target="_blank"></a>
</div>
</div>
`;
}

addContentToDom(magazines);
