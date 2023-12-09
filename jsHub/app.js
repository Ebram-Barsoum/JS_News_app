// news categories buttons
let generalBtn = document.getElementById('general');
let businessBtn = document.getElementById('business');
let entertainmentBtn = document.getElementById('entertainment');
let healthBtn = document.getElementById('health');
let scienceBtn = document.getElementById('science');
let sportBtn = document.getElementById('sports');
let technologyBtn = document.getElementById('technology');

let categories = [generalBtn, businessBtn, entertainmentBtn, healthBtn, scienceBtn, sportBtn, technologyBtn];
// search related varibles
let searchBtn = document.getElementById('search-btn');
let searchQuery = document.getElementById('search-input');

// news fields
let newsType = document.getElementById('news-type');
let news = document.getElementById('news');

//APIS
const HEADLINES_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';
const BUSINESS_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';
const ENTERTAINMENT_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';
const HEALTH_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';
const SCIENCE_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';
const SPORTS_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';
const TECHNOLOGY_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b';

// ==================>> app functions <<======================= //

// displaying data in our website
function display_news(articles) {
    news.innerHTML = "";
    console.log(articles);
    if (articles.length == 0) return;

    articles.forEach((element) => {
        let article = document.createElement('div');
        article.className = 'article col-md-6 col-lg-4 px-2'
        
        let card = document.createElement('div');
        card.className = 'card';

        let articleImage = document.createElement('img');
        articleImage.className = 'card-img-top';

        articleImage.src = (element.urlToImage) ? `${element.urlToImage}` : '../images/404.png';
        articleImage.alt = `${element.title} image`;

        let articleTitle = document.createElement('h6');
        articleTitle.className = 'card-title text-primary';
        articleTitle.innerText = element.title;

        let articleDecription = document.createElement('p');
        articleDecription.className = 'description card-text';
        articleDecription.innerText = (element.description != null)?`${element.description}`:'';

        let moreBtn = document.createElement('a');
        moreBtn.href = `${element.url}`;
        moreBtn.className = 'btn btn-dark';
        moreBtn.innerText = 'See More';

        let content = document.createElement('div');
        content.className = 'card-body';

        content.appendChild(articleTitle);
        content.appendChild(articleDecription);
        content.appendChild(moreBtn);

        card.appendChild(articleImage);
        card.appendChild(content);
        article.appendChild(card);


        if (element.title != null && element.title != '[Removed]') news.appendChild(article);
    });
}

// query news
async function search(input) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(input)}&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b`);
    if (response.status == 200) {
        let data = await response.json();
        let articles = data.articles;
        console.log(articles);

        display_news(articles);
    }
    else {
        news.innerHTML = 'No NEWS FOUND';
    }
}
// fetching data from api
async function fetch_news(category = 'general') {
    
    let URL;
    let icon = document.createElement('span');
    icon.innerHTML = ``;
    if (category === 'general') {
        URL = HEADLINES_NEWS;
        newsType.innerHTML=`<h3><i class="fa-solid fa-magnifying-glass fs-4 me-2 text-bg-warning p-2 rounded-5 "></i>Headlines</h3>`;    
    }
    else {
        // our custom api according to the category
        URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=bb18971f8b354cf88e23e2e5b7dd6e6b`;
        newsType.innerHTML=`<h3><i class="fa-solid fa-magnifying-glass fs-4 me-2 text-bg-warning p-2 rounded-5 "></i>${category}</h3>`; 
    }
    newsType.prepend(icon);

    let articles = [];
    const response = await fetch(URL);

    if (response.status == 200) {
        let data = await response.json();
        articles = data.articles;        
        console.log(articles[15].description);
        display_news(articles);
    }
    else {
        news.innerHTML = 'No NEWS FOUND';
    }
}

// handling switching among categories
categories.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let category = e.target.getAttribute("id");
        
        fetch_news(category);

        categories.forEach((cat) => {
            cat.classList.remove('active');
        });

        e.target.classList.add('active');
    });
});

// handling search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchWords = searchQuery.value;
    if (searchWords.trim() != '' && searchWords != null) {
        let title = document.getElementById('news-type');
        title.innerHTML = `<h3><i class="fa-solid fa-magnifying-glass fs-4 me-2 text-bg-warning p-2 rounded-5 "></i>${searchWords}</h3>`;

        search(searchWords);
    }
});

//initialize the app
function initialize() {
    let articles = fetch_news();
    display_news(articles);
}
initialize();
