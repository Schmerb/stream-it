'use strict';

let state = {
    popularMovies: [],
    popularTv: [],
    popularMoviePage: 1,
    popularTvPage: 1,
    searchResults: [],
    searchPage: 1,
    carouselPosters: [],
    carouselLabel: '',
    query: '',
    displayQuery: false,
    isMobile: false,
    count: 0,
    genreLists: {}
};

// Selectors

// Banner
const BANNER = '.banner';
const TITLE = '.title';
const DISCOVER = '.discover';
const SEARCH = '.search';
const POPULAR = '.popular';
const POPULAR_TV = '.popular-tv-f-nav';
const FIXED_CONTAINER = '.fixed-container'
const FIXED_SEARCH_QUERY = '.fixed-search-query';

// Mobile Nav
const BURGER_ANCHOR = '#burger-anchor';
const MOBILE_MENU = '.mobile-menu';
const MAIN_NAV = '.main-nav';

// Main / General
const MAIN = 'main';
const QUERY_INPUT = '.query-input';
const CONTENT = '.content';
const MORE_BTN = '.js-more-btn';

// Popular Page
const POPULAR_PAGE = '.popular-content';
const POPULAR_MOVIES_TITLE = '#popular-movies';
const POPULAR_MOVIE_CONTENT = '.movie-content';
const POPULAR_TV_TITLE = '#popular-tv';
const POPULAR_TV_CONTENT = '.tv-content';
const TV_MORE_BTN = '.tv-btn';
const MOVIES_MORE_BTN = '.movies-btn';


// Search Page
const NAV_SEARCH_INPUT = '#nav-search-input';
const NAV_SEARCH_GLASS = '.nav-search-glass';
const SEARCH_HEADER = '.search-header';
const SEARCH_RESULTS_CONTENT = '.search-results-content'
const SEARCH_RESULTS_PAGE = '.search-results-page';
const SEARCH_FORM = '.search-form';
const MAIN_INPUT = '#main-input';
const LOADING = '.loading';
const USER_QUERY = '.user-query';
const NO_RESULTS = '.no-results';
const SEARCH_MORE_BTN = '.search-more-btn';

// Discover Page
const DISCOVER_CONTAINER = '.discover-container';
const DISCOVER_CONTENT = '.discover-content';
const DISCOVER_SLIDER = '.discover-slider';
const DISCOVER_SLIDE_IMG = '.discover-slide-poster img';
const DISCOVERY_NAV_GENRE = '.genre-f-nav';

// Detail Carousel
const POSTER_IMG = '.poster-img-wrap img';
const DETAIL_PAGE_SLIDER = '.js-carousel';
const DETAIL_CAROUSEL_LABEL = '.detail-carousel-label';
const DETAIL_SLIDE = '.detail-slide';
const DETAIL_SLIDE_IMG = '.detail-slide img';

// Detail Page
const DETAIL_PAGE = '.detail-page';
const MOVIE_TITLE = '.js-movie-title';
const YEAR = '.js-year';
const RATED = '.js-rated';
const RUNTIME = '.js-runtime';
const DETAIL_POSTER = '.js-detail-poster';
const IMDB_ICON = '.imdb';
const ROTTEN_ICON = '.rotten';
const METACRITIC_ICON = '.metacritic';
const IMDB = '.js-imdb';
const ROTTEN = '.js-rotten';
const METACRITIC = '.js-metacritic';
const PLOT = '.js-plot';
const DIRECTOR = '.js-director';
const DIRECTOR_ITEM = '#director-item';
const WRITERS = '.js-writers';
const CAST = '.js-cast';
const FRAME = '.js-frame';
const TRAILER_SLIDER = '.trailer-slider';

const SIMILAR_MOVIES_SLIDER = '.js-similar-slider';
const SIMILAR_SLIDE_IMG = '.similar-slide img';

// Streaming Options Carousel
const STREAMING_LINKS_SLIDER = '.streaming-links-slider';
const STREAMING_LINKS_CONTAINER = '.streaming-links-container';
const PURCHASE_LINKS = '.purchase-links';
const SUBSCRIPTION_LINKS = '.subscription-links';
const TV_LINKS = '.tv-links';

// TV Detail Page
const TV_CONTAINER = '.tv-container';
const SEASONS_CONTAINER = '.seasons-container';
const SEASON_POSTER_CONTAINER = '.season-poster-container';
const SEASON_POSTER = '.season-poster-container img'
const SEASON_DETAILS_CONTAINER = '.season-details-container';


// ================================================================================
// Displays
// ================================================================================
            //  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
let widths = ["w92","w154","w185","w342","w500","w780","original"]
let img_width = widths[2];
      
let IMG_BASE_URL = `https://image.tmdb.org/t/p`;


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Returns template for poster
// * * * * * * * * * * * * * * * * * * * * * * * * *
function posterTemplate(poster) {
    let isTvShow = poster.hasOwnProperty('first_air_date');
    let overview = poster.overview.replace(/["]/g, "'");
    let release_date = isTvShow ? poster.first_air_date : poster.release_date;
    let title = isTvShow ? poster.name : poster.title;
    return `<div class="${isTvShow ? 'tv': ''} poster">
                <div class="poster-big-img-wrap poster-img-wrap">
                    ${getPosterImgTemplate(poster)}
                </div>
                <div class="poster-overlay" data-id="${poster.id}" data-tv="${isTvShow}">
                    <span class="view-detail">View Details</span>
                </div>
                <label for="${poster.id}" class="poster-label">
                    <span class="poster-title">${title}</span>
                    <span>${release_date.slice(0,4)}</span>
                </label> 
            </div>`;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Returns template for just the poster img 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function getPosterImgTemplate(poster) {
    let isTvShow = poster.hasOwnProperty('first_air_date');
    let overview = poster.overview.replace(/["]/g, "'");
    let release_date = isTvShow ? poster.first_air_date : poster.release_date;
    let title = isTvShow ? poster.name : poster.title;
    return `<img src="${IMG_BASE_URL}/${img_width}/${poster.poster_path}" 
                 alt="Poster image for ${title}."
                 id="${poster.id}"
                 data-tv="${isTvShow}" 
                 data-title="${title}"
                 data-id="${poster.id}"
                 data-overview="${overview}"
                 data-release-date="${release_date}"
                 data-backdrop="${poster.backdrop_path}"
            >`;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Returns template for carousel posters
// * * * * * * * * * * * * * * * * * * * * * * * * *
function carouselSlideTemplate(poster, className) {
    let isTvShow = poster.hasOwnProperty('first_air_date');
    let title = isTvShow ? poster.name : poster.title;
    return `<div class="${className} ${isTvShow ? 'tv': ''}">
                <img src="${IMG_BASE_URL}/w92/${poster.poster_path}"
                     alt="Poster for ${title}"
                     data-id="${poster.id}"
                     data-tv="${isTvShow}"
                     data-title="${title}"
                >
            </div>`;
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular movie posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularMovies() {
    let movies = state.popularMovies.map(function(movie) {
        return posterTemplate(movie);
    });
    $(POPULAR_MOVIE_CONTENT).append(movies.slice(-20).join(''));
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular tv show posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularTv() {
    let shows = state.popularTv.map(function(show) {
        return posterTemplate(show);
    });
    $(POPULAR_TV_CONTENT).append(shows.slice(-20).join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Display detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailPage(tmdb, imdb) {
    let type = imdb.Type == 'movie' ? 'movie' : 'tv';  // checks if movie or tv show
    window.location = `#detail/${type}/${imdb.imdbID}`; // Sets url for detail page

    // Poster container 
    // metadata -- numerical 
    $(MOVIE_TITLE).text(imdb.Title);
    $(YEAR).text(imdb.Year);
    $(RATED).text(imdb.Rated);
    $(RUNTIME).text(imdb.Runtime);
    $(DETAIL_POSTER).attr('src', `${IMG_BASE_URL}/w342/${tmdb.poster_path}`);

    // Ratings
    let imdb_rating, rotten_rating, meta_rating = false;
    imdb.Ratings.forEach(function(rating) {
        if (rating.Source == 'Internet Movie Database') {
            imdb_rating = true; // exists
            $(IMDB).text(rating.Value);
        } else if (rating.Source == 'Rotten Tomatoes') {
            rotten_rating = true; // exists
            $(ROTTEN).text(rating.Value);
        } else if (rating.Source == 'Metacritic') {
            meta_rating = true; // exists
            $(METACRITIC).text(rating.Value);
        }
    });
    imdb_rating ? $(IMDB_ICON).show() : $(IMDB_ICON).hide();
    rotten_rating ? $(ROTTEN_ICON).show() : $(ROTTEN_ICON).hide();
    meta_rating ? $(METACRITIC_ICON).show() : $(METACRITIC_ICON).hide();

    // metadata -- crew
    $(PLOT).text(tmdb.overview);
    $(DIRECTOR).text(imdb.Director);
    $(WRITERS).text(imdb.Writer);
    $(CAST).text(imdb.Actors);

    if (type == 'movie') {
        $(DIRECTOR_ITEM).show();
    } else if (type == 'series') {
        $(DIRECTOR_ITEM).hide();
        displaySeasonPosters(tmdb);
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays show seasons posters to detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySeasonPosters(tmdb) {
    hide(STREAMING_LINKS_CONTAINER);
    $(TV_CONTAINER).show();
    let seasonPosters = tmdb.seasons.map(function(season, index) {
        if (season.poster_path == null) {
            return '';
        }
        return `<div class="season-poster-container">
                        <img src="${IMG_BASE_URL}/w92/${season.poster_path}"
                             alt="poster for ${tmdb.name} season ${season.season_number}"
                             id="${season.id}"
                             data-show-id="${tmdb.id}"
                             data-show-name="${tmdb.name}"
                             data-air-date="${season.air_date}"
                             data-episode-count="${season.episode_count}"
                             data-season-number="${season.season_number}"  
                        >
                        <label class="season-label" for="${season.id}">
                            ${season.season_number === 0 ? "Special" : "Season" + season.season_number}
                        </label> 
                      </div>`;
    });
    $(SEASONS_CONTAINER).empty().append(seasonPosters.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays season episodes to detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySeasonDetails(season) {
    show('.detail-hr');
    let episodeStills = season.episodes.map(function(episode) {
        return `<div class="episode-still-container">
                    <img src="${IMG_BASE_URL}/w154/${episode.still_path}"
                         alt="Still image for episode ${episode.episode_number}"
                         id="${episode.episode_number}"
                         data-episode-name="${episode.name}"
                         data-episode-number="${episode.episode_number}"
                         data-episode-overview="${episode.overview}"
                    >
                    <label for="${episode.episode_number}">
                        <span class="episode-number">Ep. ${episode.episode_number}</span>
                        <span class="episode-name">${episode.name}</span>
                    </label>

                </div>`;
    });
    $(SEASON_DETAILS_CONTAINER).empty().append(`<h3>Season ${season.season_number}</h3>`);
    $(SEASON_DETAILS_CONTAINER).append(episodeStills.join(''));
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays the different streaming options
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayStreamingLinks(guidebox) {
    // Streaming links data -- GUIDEBOX DATA
    hide(TV_CONTAINER);
    $(STREAMING_LINKS_CONTAINER).empty();
    show(STREAMING_LINKS_CONTAINER);

    let movie = guidebox; // GUIDEBOX
    // let movie = obj; // ALIEN (TESTING)
    // let movie = theater; // WONDERWOMAN (IN-THEATERS TESTING)

    if (movie.in_theaters) {
        $(STREAMING_LINKS_CONTAINER).append(`<h3>STILL IN THEATERS</h3>`);
        if(movie.other_sources.movie_theater) {
            $(STREAMING_LINKS_CONTAINER).append(`<h4>Grab Tickets</h4>`);
            let theater_links = getTheaterSources(movie);
            $(STREAMING_LINKS_CONTAINER).append(theater_links);
        }
    }

    // let respData = obj; // ALIEN (TESTING)
    // let respData = theater; // WONDERWOMAN (IN-THEATERS TESTING)
    let respData = guidebox; // GUIDEBOX 

    let purch_srcs = respData.purchase_web_sources; 
    let sub_srcs = respData.subscription_web_sources; 
    let tv_srcs = respData.tv_everywhere_web_sources; 
    let free_srcs = respData.free_web_sources; 
    
    if(purch_srcs.length) {
        let purch_slides = getSources(purch_srcs, 'purchase');
        let purch_slider = `<label for="purch-links">Buy / Rent</label>
                            <ul id="purch-links" class="purchase-links streaming-links-slider">
                                ${purch_slides.join('')}
                            </ul>`;
        $(STREAMING_LINKS_CONTAINER).append(purch_slider);
    }

    if(sub_srcs.length) {
        let sub_slides = getSources(sub_srcs, 'subscription');
        let sub_slider = `<label for="sub-links">Subscription</label>
                          <ul id="sub-links" class="subscription-links streaming-links-slider">
                                ${sub_slides.join('')}
                          </ul>`;
        $(STREAMING_LINKS_CONTAINER).append(sub_slider);
    }

    if (tv_srcs.length) {
        let tv_slides = getSources(tv_srcs, 'tv');
        let tv_slider = `<label for="tv-links">TV Everywhere</label>
                          <ul id="tv-links" class="TV-links streaming-links-slider">
                                ${tv_slides.join('')}
                          </ul>`;
        $(STREAMING_LINKS_CONTAINER).append(tv_slider);
    }

    if (free_srcs.length) {
        let free_slides = getSources(free_srcs, 'free');
        let free_slider = `<label for="free-links">Free</label>
                          <ul id="free-links" class="free-links streaming-links-slider">
                                ${free_slides.join('')}
                          </ul>`;
        $(STREAMING_LINKS_CONTAINER).append(free_slider);
    }    
    
    initStreamingLinksSlider(); // init slick slider
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates slides for each source for the 
//  given source type (purchase/subscription/TV/free)
//  @return     Returns an array of source slides 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function getSources(sources, src_type) {
    return sources.map(function(src) {
            let hd_buy;
            let hd_rent;
            let sd_buy;
            let sd_rent;
            if (src.hasOwnProperty('formats')) {
                src.formats.forEach(function(format) {
                    if(format.format == 'HD' && format.type == 'purchase') {
                        hd_buy = format.price;
                    } else if(format.format == 'HD' && format.type == 'rent') {
                        hd_rent = format.price;
                    } else if(format.format == 'SD' && format.type == 'purchase') {
                        sd_buy = format.price;
                    } else if(format.format == 'SD' && format.type == 'rent') {
                        sd_rent = format.price;
                    }
                });
            }
            let slide =  `<li class="source-slide">
                                <a href="${src.link}" target="__blank">
                                    <img id="${src.source}" class="icon" src="${icons[src.source]}">
                                </a>
                                <label for="${src.source}">${src.display_name}<label>`;
            // purchase sources
            if (src_type == 'purchase') {
                slide +=        `<ul class="purchase-options-list">
                                    <li> 
                                        <dl class="prices">
                                            <dt>Buy</dt>
                                            <dd><span class="definition-span">HD</span>${hd_buy ? hd_buy : ' -'}</dd>
                                            <dd><span class="definition-span">SD</span>${sd_buy ? sd_buy : ' -'}</dd>
                                        </dl>
                                    </li>
                                    <li>  
                                        <dl class="prices">
                                            <dt>Rent</dt>
                                            <dd><span class="definition-span">HD</span>${hd_rent ? hd_rent : ' -'}</dd>
                                            <dd><span class="definition-span">SD</span>${sd_rent ? sd_rent : ' -'}</dd>
                                        </dl>
                                    </li>
                                </ul>`;
            // subscription sources
            } else if (src_type == 'subscription') { 
                slide += `<span class="package-price">${package_prices[src.source] ? package_prices[src.source] : '?'} / month</span>`;
            // tv sources
            } else if (src_type == 'tv') { 
                slide += `<span class="package-price">Included with ${src.tv_channel}</span>`;
            } else if (src_type == 'free') {
                slide += `<span class="package-price">FREE</span>`;
            }
            slide += `</li>`;                     
            return slide;
        });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates slides for each theater source
//  @return     Returns an array of theater sources
// * * * * * * * * * * * * * * * * * * * * * * * * *
function getTheaterSources(sources) {
    return sources.other_sources.movie_theater.map(function(src) {
                return `<div class="theater-source">
                            <a href="${src.link}" target="__blank">
                                <img id="${src.source}" class="icon" src="${icons[src.source]}">
                            </a>
                            <label for="${src.source}">${src.display_name}</label>
                        </div>`;
            });
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays search results to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySearchResults(resultsFound, posters, page) {
    showSearchPage();
    if (!resultsFound) {
        show(NO_RESULTS);
        hide(FIXED_SEARCH_QUERY, USER_QUERY);
        state.displayQuery = false;
    } else {
        show(FIXED_SEARCH_QUERY, USER_QUERY);
        hide(NO_RESULTS);
    }
    hide(LOADING);
    $(SEARCH_HEADER).text(state.query);
    if (page < 2) {
        $(SEARCH_RESULTS_CONTENT).empty();
    }
    $(SEARCH_RESULTS_CONTENT).append(posters.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates new banner carousel for detail page 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailCarousel() {
    unslick(DETAIL_PAGE_SLIDER);
    $(DETAIL_PAGE_SLIDER).empty();
    let slides = state.carouselPosters.map(poster => {
        return carouselSlideTemplate(poster, 'detail-slide poster-img-wrap');
    });
    $(DETAIL_PAGE_SLIDER).html(slides.join('')); //overwrites previous slides
    $(DETAIL_CAROUSEL_LABEL).text(state.carouselLabel);
    initDetailSlider();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates new carousel with similar movies posters
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySimilarMoviesCarousel(resp) {
    let posters = resp.results.map(function(movie) {
        return carouselSlideTemplate(movie, 'similar-slide poster-img-wrap');
    });
    unslick(SIMILAR_MOVIES_SLIDER);
    $(SIMILAR_MOVIES_SLIDER).empty().append(posters.join(''));
    initSimilarSlider();
}




// ================================================================================
// Helper Functions
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Resets pages used in API calls for popular
//  content AND hides titles and more buttons
// * * * * * * * * * * * * * * * * * * * * * * * * *
function resetPopularPages() {
    state.popularMoviePage = 1;
    state.popularTvPage = 1;
    hide(POPULAR_TV_TITLE, POPULAR_MOVIES_TITLE, 
         TV_MORE_BTN, MOVIES_MORE_BTN);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Resets search page 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function resetSearchPage() {
    state.displayQuery = false;
    state.query = '';
    $(USER_QUERY).addClass('hidden');
    hide(SEARCH_MORE_BTN);
    $(SEARCH_RESULTS_CONTENT).add(SEARCH_HEADER).empty();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Adds 'hidden' class to all target elements
//  passed in as arguments
// * * * * * * * * * * * * * * * * * * * * * * * * *
function hide(targets) {
    Object.values(arguments).forEach(function(target) {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Removes 'hidden' class to all target elements
//  passed in as arguments
// * * * * * * * * * * * * * * * * * * * * * * * * *
function show(targets) {
    Object.values(arguments).forEach(function(target) {
        $(target).removeClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Discovery page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showDiscoverPage() {
    resetPopularPages();
    resetSearchPage();
    hide(SEARCH_RESULTS_PAGE, FIXED_SEARCH_QUERY, POPULAR_PAGE, DETAIL_PAGE);

    $(MAIN).removeClass('detail-page-main');
    show(DISCOVER_CONTAINER);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Popular page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showPopularPage() {
    resetPopularPages();
    resetSearchPage();
    hide(SEARCH_RESULTS_PAGE, FIXED_SEARCH_QUERY, DISCOVER_CONTAINER, DETAIL_PAGE);
   
    $(MAIN).removeClass('detail-page-main');
    show(POPULAR_PAGE);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Search Page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showSearchPage() {
    resetPopularPages();
    hide(DISCOVER_CONTAINER, DETAIL_PAGE, POPULAR_PAGE);

    $(MAIN).removeClass('detail-page-main');
    if (state.query != '') {
        state.displayQuery = true;
    }
    hide(NO_RESULTS);
    show(SEARCH_RESULTS_PAGE);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Triggers detail page cleanup and displays detail page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showDetailPage(initCarousel) {
    resetPopularPages();
    resetSearchPage();
    clearDetailPage(initCarousel);
    hide(SEARCH_RESULTS_PAGE, FIXED_SEARCH_QUERY, POPULAR_PAGE, DISCOVER_CONTAINER);

    show(DETAIL_PAGE);
    $(MAIN).addClass('detail-page-main');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Clears Detail page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function clearDetailPage(initCarousel) {
    $(MOVIE_TITLE).text('');
    $(YEAR).text('');
    $(RATED).text('');
    $(RUNTIME).text('');
    $(DETAIL_POSTER).attr('src', '');
    $(SEASONS_CONTAINER).add(SEASON_DETAILS_CONTAINER).empty();
    unslick(STREAMING_LINKS_SLIDER); // unslicks previous slider(s) if initialized
    $(STREAMING_LINKS_CONTAINER).empty(); // clears previous slider(s)
    $(STREAMING_LINKS_CONTAINER).html('<h2 class="detail-loading">LOADING . . .</h2>');
    if(initCarousel) {
        unslick(DETAIL_PAGE_SLIDER);
        $(DETAIL_PAGE_SLIDER).empty();
    }
    $(FRAME).removeClass('frame-ready');
}



// ================================================================================
// API Handlers
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Popular content API handler
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularHandler(target = MAIN) {
    $(POPULAR_MOVIE_CONTENT).empty();
    $(POPULAR_TV_CONTENT).empty();
    $(MAIN_INPUT).val('');
    showPopularPage();
    let scrollToTv = false;
    target == MAIN ? smoothScroll(MAIN) : null;
    popularMoviesHandler();
    popularTvShowsHandler();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular movies
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularMoviesHandler(page = 1) {
    if (page == 1) {
        state.popularMovies = [];
    }
    discoverMoviesTMDB(page, function(resp) {
        state.popularMovies = state.popularMovies.concat(resp.results);
        displayPopularMovies();
        $(POPULAR_MOVIES_TITLE).show();
        show(MOVIES_MORE_BTN);
        // $(MOVIES_MORE_BTN).show();
    });
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular TV shows
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularTvShowsHandler(page = 1) {
    if (page == 1) {
        state.popularTv = [];
    }
    discoverTvTMDB(page, function(resp) {
        state.popularTv = state.popularTv.concat(resp.results);
        displayPopularTv();
        $(POPULAR_TV_TITLE).show();
        show(TV_MORE_BTN);
        // $(TV_MORE_BTN).show();
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for movie / tv show search
// * * * * * * * * * * * * * * * * * * * * * * * * *
function searchMultiHandler(page = 1) { 
    show(LOADING);
    // $(LOADING).removeClass('hidden');
    $(MAIN_INPUT).val('');
    $(NAV_SEARCH_INPUT).val('');
    page == 1 ? smoothScroll(MAIN) : null; // if new search, scroll to top of search page

    searchAllTMDB(state.query, page, function(resp) {
        searchAllTMDB(state.query, page + 1, function(resp_p2) {
            if(   resp.total_pages == page 
                || resp_p2.total_pages == page + 1
                || resp.total_pages < page
                || resp_p2.total_pages < page + 1) {
                hide(SEARCH_MORE_BTN);
            } else {
                show(SEARCH_MORE_BTN);
            }
            let results = resp.results.concat(resp_p2.results);
            let filteredPosters = results.filter(result => {
                return result.media_type == 'person' ?  false : true;
            });
            state.searchResults = state.searchResults.concat(filteredPosters);
            setCarouselPosters(state.searchResults, `'${state.query}' Results`);
            let posters = filteredPosters.map(result => {
                if (result.poster_path != null) {
                    return posterTemplate(result);
                }
            });
            let resultsFound = results.length;
            displaySearchResults(resultsFound, posters, page); // Call to display results
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for movie detail page. Fetches all 
//  metadata for movies and prepares them to  
//  display to user
// * * * * * * * * * * * * * * * * * * * * * * * * *
function movieDetailPageHandler(poster, initCarousel) {
    showDetailPage(initCarousel);
    smoothScroll(MAIN);
    
    getMovieDetailsByIdTMDB(poster.attr('data-id'), function(detail_resp) {
        searchByIdOMDB(detail_resp.imdb_id, function(imdb_resp) {
            displayDetailPage(detail_resp, imdb_resp);
            initCarousel ? displayDetailCarousel() : null;

            getSimilarMoviesTMDB(poster.attr('data-id'), 1, resp => {
                displaySimilarMoviesCarousel(resp);
            });
            // displayStreamingLinks(gbox_m_resp);
            // call to guidebox for streaming links / prices
            searchByExternalIdGuidebox(imdb_resp.imdbID, 'movie', 'imdb', function(gbox_s_resp) {
                getMovieGuidebox(gbox_s_resp.id, function(gbox_m_resp) {
                    displayStreamingLinks(gbox_m_resp);
                });
            });
        });
        getMovieVideosTMDB(detail_resp.id, function(video_resp) {
            trailerHandler(video_resp);
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for tv detail page. Fetches all 
//  metadata for tv shows and prepares them to 
//  display to user
// * * * * * * * * * * * * * * * * * * * * * * * * *
function tvDetailHandler(poster, initCarousel) {
    showDetailPage(initCarousel);
    smoothScroll(MAIN);
    getTvDetailsTMDB(poster.attr('data-id'), function(detail_resp) {
            getTVExternalIdsTMDB(detail_resp.id, function(ids_resp) {
                searchByIdOMDB(ids_resp.imdb_id, function(imdb_resp) {
                    displayDetailPage(detail_resp, imdb_resp); // Displays detail page
                    initCarousel ? displayDetailCarousel() : null; // inits carousel if needed
                    // call to guidebox for streaming links / prices
                    searchByExternalIdGuidebox(imdb_resp.imdbID, 'show', 'imdb', function(gbox_s_resp) {
                        getShowGuidebox(gbox_s_resp.id, function(gbox_tv_resp) {
                            // console.log(gbox_tv_resp);
                            // getAllEpisodesGuidebox(gbox_s_resp.id);
                            // displayDetailPage(detail_resp, imdb_resp, gbox_tv_resp);
                        });
                    });
                });
            });
            getTvVideosTMDB(detail_resp.id, function(video_resp) {
                trailerHandler(video_resp);
            });
        });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for getting details for a specific
//  season and displaying the metadata
// * * * * * * * * * * * * * * * * * * * * * * * * *
function seasonHandler(showName, showID, season) {
    getTvSeasonDetailsTMDB(showID, season, function(season_resp) {
        displaySeasonDetails(season_resp);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for trailers, collects them and creates
//  carousel on detail page with thumbails
// * * * * * * * * * * * * * * * * * * * * * * * * *
function trailerHandler(resp) {
    unslick(TRAILER_SLIDER);
    $(TRAILER_SLIDER).empty();
    $(FRAME).attr('src', ``);

    let trailers = resp.results.filter(function(trailer) {
                    return (trailer.type.toLowerCase() == 'trailer' 
                                && trailer.site.toLowerCase() == 'youtube');
    });
    if (trailers.length > 0) {
        let mainTrailer = trailers.find(function(trailer) {
        let name = trailer.name.toLowerCase();
        return name == 'official trailer' 
                || name == 'official main trailer' 
                || name == 'main trailer'
                || name.includes('1')
                || name.includes('official trailer')
                || name.includes('official teaser')
                || name.includes('official')
                || name.includes('teaser')
                || name.includes('trailer');
        });
        if (!mainTrailer) { // if no 'main trailer', use first trailer
            mainTrailer = trailers[0];
        }
        $(FRAME).attr('src', `https://www.youtube.com/embed/${mainTrailer.key}?`);
        // makes JSON request for each trailer obj and maps each call to array
        let jsonRequests = trailers.map(function(trailer) {
                return searchVideoByIdYoutube(trailer.key, function(youtube_resp) {
                    if(youtube_resp.items.length > 0) {
                        let snippet = youtube_resp.items[0].snippet;
                        let thumbnail = snippet.thumbnails.high.url;
                        let url = `https://www.youtube.com/embed/${youtube_resp.items[0].id}`;
                        let alt_trailer_thumbnail = `<div class="trailer-slide">
                                                        <img src="${thumbnail}" 
                                                            alt="Thumbnail for ${snippet.title}"
                                                            data-title="${snippet.title}"
                                                            data-url="${url}"
                                                            data-trailer-type="${trailer.type}"
                                                        > 
                                                    </div>`;
                        if (trailer.length > 1) {
                            $(TRAILER_SLIDER).append(alt_trailer_thumbnail);
                        }
                    }
                });
        });
        // waits for array of JSON requests to finish, then executes code block
        $.when.apply($, jsonRequests).then(function() {
            if (trailers.length > 1) {
                initTrailerSlider();
            }
            // $(FRAME).attr('src', `https://www.youtube.com/embed/${mainTrailer.key}?`);
            $(FRAME).addClass('frame-ready');
        });
    } // end if     
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for Discover page, makes calls to 
//  fetch movies by genre and appends slick 
//  carousel to page for each genre
// * * * * * * * * * * * * * * * * * * * * * * * * *
               //  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
// let widths = ["w92","w154","w185","w342","w500","w780","original"]
// let img_width = widths[2];
function discoverHandler(anchor = null) {
    $(DISCOVER_CONTENT).empty();
    $(MAIN_INPUT).val('');

    showDiscoverPage();
    $(DISCOVER_CONTAINER).css({'height': '0px', 'overflow': 'hidden'}); // Hide content to wait for slick
    smoothScroll(MAIN);

    let jsonRequests = genres.map(function(genre) {
        return discoverMoviesByGenreTMDB(genre.id, 1, function(resp) {
               let genreSlides = resp.results.map(function(movie) {
                    return `<div class="disc-slide">
                                <div class="discover-slide-poster poster-img-wrap">
                                    <img    class="discover-img"
                                            src="${IMG_BASE_URL}/${widths[0]}/${movie.poster_path}"
                                            id="${movie.id}"
                                            data-id="${movie.id}"
                                            data-tv="false"
                                            data-genre="${genre.name}"
                                    >
                                    <div class="poster-overlay" data-id="${movie.id}">
                                        <span class="view-detail">View Details</span>
                                    </div>
                                </div>
                            </div>`;
                });
                                        
                let sliderTemplate = `<div class="discover-wrap" id="${genre.id}">
                                        <h3 class="genre">${genre.name}</h3>
                                        <div class="discover-slider">
                                            ${genreSlides.join('')}
                                        </div>
                                    </div>`;
                // Uses genre name to dynamically add slider to appropriate container
                state.genreLists[genre.name] = resp.results;
                $(DISCOVER_CONTENT).append(sliderTemplate);
            });
    });

    // Waits until all 'discoverMoviesByGenreTMDB' api requests are 
    // successful then triggers callback
    $.when.apply($, jsonRequests).then(function(a) {
        initDiscoverySlider(); // slider element is created, no need to unslick
        if(anchor != null) {
            smoothScroll(`#${anchor}`, 200, 50);
        }
        $(DISCOVER_CONTAINER).css({'height': '', 'overflow': ''}); // Once slicked, display content
    });
}


// ================================================================================
// Slick Carousels
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Discover by genre carousels
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initDiscoverySlider() {
    $(DISCOVER_SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 8,
        slidesToScroll: 6,
        variableWidth: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 415,
            settings: "unslick"
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * *
// detail page carousel navigation
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initDetailSlider() {
    $(DETAIL_PAGE_SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 415,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * *
// similar movies slider
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initSimilarSlider() {
    $(SIMILAR_MOVIES_SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 415,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}


// * * * * * * * * * * * * * * * * * * * * * * * * *
// streaming options carousel
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initStreamingLinksSlider() {
    $(STREAMING_LINKS_SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 415,
            settings: "unslick"
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}


// * * * * * * * * * * * * * * * * * * * * * * * * *
// trailers carousels
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initTrailerSlider() {
    $(TRAILER_SLIDER).slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        variableWidth: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 415,
            settings: "unslick"
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//          Destroys slick carousels
// @params   Slider element to be destroyed
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function unslick(SLIDER) {
    if($(SLIDER).hasClass('slick-initialized')) {
        $(SLIDER).slick('unslick');
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Used to reslick sliders on window resize 
//  inccrease. 
//  Slick settings handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function responsiveReslick() {
    $(window).resize(function() {
        let width = parseInt($('body').css('width'));
        if(!$(DISCOVER_SLIDER).hasClass('slick-initialized')) {
            initDiscoverySlider();
        }
        if(!$(STREAMING_LINKS_SLIDER).hasClass('slick-initialized')) {
            initStreamingLinksSlider();
        }
        if(!$(DETAIL_PAGE_SLIDER).hasClass('slick-initialized')) {
            initDetailSlider();
        }
    });
}


// ================================================================================
// Utilities 
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Helper function to print JSON response data to
// console for debugging
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function printResp(resp) {
    console.log(resp);
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collapses nav bar to set height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function collapseNav(newHeight) {
    // $('.logo').fadeOut(200);
    // $('.monitor').fadeOut(200);
    $(TITLE).stop().animate({'font-size': '20px', width: '85px'}, {
                                    duration: 100,
                                    easing: 'linear'
    });
    $(BANNER).stop().animate({height: newHeight}, { // 48px
                                duration: 100,
                                easing: 'linear',
                                step: function(currentHeight) {
                                    // console.log("height: ", currentHeight);
                                }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Expands nav bar to set height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function uncollapseNav(newHeight) {
    // $('.logo').fadeIn(200)
    // $('.monitor').fadeIn(200);
    $(TITLE).stop().animate({'font-size': '36px', width: '150px'}, {
                                    duration: 100,
                                    easing: 'linear'
    });
    $(BANNER).stop().animate({height: newHeight}, { // 100px
                                duration: 100,
                                easing: 'linear',
                                step: function(currentHeight) {
                                    // console.log("height: ", currentHeight);
                                }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fixed nav menu and search bar on page scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixNavOnScroll() {
    $(window).scroll(function(e) {
        let scroll = $(window).scrollTop();
        if(scroll > $(MAIN).offset().top) {
            $(FIXED_CONTAINER).addClass('fixed-overlay').addClass('fadein');
            if (state.displayQuery) {
                show(FIXED_SEARCH_QUERY);
            }
        } else if(scroll <= 100) {
            $(FIXED_CONTAINER).removeClass('fadeout').removeClass('fadein');
        } else {
            $(FIXED_CONTAINER).addClass('fadeout').removeClass('fadein').removeClass('fixed-overlay');
            hide(FIXED_SEARCH_QUERY);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target, duration = 1200, offset = 0) {
    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(function() {
        checkSize();
        $(window).resize(checkSize);
    });
}

function checkSize() {
    (parseInt($("body").css('width')) <= '414') ? state.isMobile = true : state.isMobile = false;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handler to collapse and expand nav bar upon scroll. maps
// values to calculate new appropriate height
// Currently -- NOT IN USE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function collapseNavHandler() {
    $(window).scroll(function(e) {
        let scroll = $(window).scrollTop();
        
        let heightStart = 100;
        let heightEnd = state.isMobile ? 58 : 48;
        let scrollStart = 10;
        let scrollEnd = state.isMobile ? 75 : 100;

        if (scroll > scrollStart && scroll <= scrollEnd) {
            let newHeight = (scroll - scrollStart) / (scrollEnd - scrollStart) * (heightEnd - heightStart) + heightStart;
            collapseNav(newHeight + 'px');
        }

        if (scroll > scrollEnd) {
            collapseNav(`${state.isMobile ? 58 : 48}px`);
        }

        if (scroll <= scrollStart) {
            let newHeight = (scroll - scrollStart) / (scrollEnd - scrollStart) * (heightEnd - heightStart) + heightStart;
            if (newHeight > 100) {
                newHeight = 100;
            }
            uncollapseNav(newHeight + 'px');
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Used to keep background in place on mobile
// Currently -- NOT IN USE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function fixedBackgroundMobile() {
    $(window).scroll(function() {
        var scrolledY = $(window).scrollTop();
        if ((parseInt($("body").css('width')) <= '414')) {
            $('main').css('background-position', '50% ' + (scrolledY - 300) + 'px');
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Shows (slides) nav search glass input 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function showNavSearchInput() {
    let width = 200;
    if ((parseInt($("body").css('width')) <= '450')) {
        width = 140;
    }
    $(NAV_SEARCH_INPUT).show()
                       .animate({width: width}, {
                                 duration: 500,
                                 easing: 'linear',
                                 complete: () => {
                                     $(NAV_SEARCH_INPUT).focus();
                                }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Hides (slides) nav search glass input 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function hideNavSearchInput() {
    $(NAV_SEARCH_INPUT).animate({width: '0'}, {
                                 duration: 300,
                                 easing: 'linear',
                                 complete: () => {
                                     $(NAV_SEARCH_INPUT).hide();
                                 }
    });
}

// ================================================================================
// Writing JSON reponse to file
// ================================================================================

let textFile = null,
  makeTextFile = function (text) {
    let data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handler to attach text file to icon
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// Needs implementation




// ================================================================================
//    API Calls   ~   TMDB, OMDB, Guidebox
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * //
// Searches YouTube data API by video ID number      
// * * * * * * * * * * * * * * * * * * * * * * * * * //
let YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/';
const YOUTUBE_KEY = 'AIzaSyDgSaSC2elGodMOCAZrZCAsllRP50dy4Xg';

let searchVideoByIdYoutube = function (video_ID, callback = printResp) {
    let VIDEOS_URL = YOUTUBE_BASE_URL + 'videos';
    let query = {
        key: YOUTUBE_KEY,
        part: 'snippet,contentDetails',
        id: video_ID
    };
    return $.getJSON(VIDEOS_URL, query, callback);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * //
//  TMDB API calls                                   
// * * * * * * * * * * * * * * * * * * * * * * * * * //
let TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_KEY = '33e990a96c93fc44034cdc76ec1ec949';
// * * * * * * * * * * * * *
//  Search ALL 
// * * * * * * * * * * * * *
function searchAllTMDB(searchQuery, page = 1, callback = printResp) {
    let TMDB_SEARCH_ALL_URL = `${TMDB_BASE_URL}/search/multi`;
    let query = {
        api_key: TMDB_KEY,
        query: searchQuery,
        page: page
    };
    $.getJSON(TMDB_SEARCH_ALL_URL, query, callback);
}

// * * * * * * * * * * * * *
//  Movie calls (TMDB)
// * * * * * * * * * * * * *
function searchMovieTMDB(searchQuery, page = 1, callback = printResp) {
    let TMDB_SEARCH_MOVIE_URL = `${TMDB_BASE_URL}/search/movie`;
    let query = {
        api_key: TMDB_KEY,
        query: searchQuery,
        page: page
    };
    $.getJSON(TMDB_SEARCH_MOVIE_URL, query, callback);
}


function findByIdTMDB(id, callback = printResp) {
    let TMDB_FIND_URL = `${TMDB_BASE_URL}/find/${id}`;
    let query = {
        api_key: TMDB_KEY,
        language: 'en-US',
        external_source: 'imdb_id'
    };
    $.getJSON(TMDB_FIND_URL, query, callback);
}

function discoverMoviesTMDB(page = 1, callback = printResp, filter = 'popularity.desc', ) {
    let TMDB_DISCOVER_MOVIES_URL = `${TMDB_BASE_URL}/discover/movie`;
    let query = {
        api_key: TMDB_KEY,
        sort_by: filter,
        page: page
    };
    return $.getJSON(TMDB_DISCOVER_MOVIES_URL, query, callback);
}

function discoverMoviesByGenreTMDB(genreIds, page = 1, callback = printResp, filter = 'popularity.desc', ) {
    let TMDB_DISCOVER_MOVIES_GENRE_URL = `${TMDB_BASE_URL}/discover/movie`;
    let query = {
        api_key: TMDB_KEY,
        with_genres: genreIds,
        page: page,
        sort_by: filter,
    };
    return $.getJSON(TMDB_DISCOVER_MOVIES_GENRE_URL, query, callback);
}

function getMovieDetailsByIdTMDB(movieId, callback = printResp) {
    let TMDB_GET_MOVIE_URL = `${TMDB_BASE_URL}/movie/${movieId}`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_GET_MOVIE_URL, query, callback);
}

function getMovieImagesTMDB(movieId, callback = printResp) {
    let TMDB_MOVIE_IMAGES_URL = `${TMDB_BASE_URL}/movie/${movieId}/images`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_MOVIE_IMAGES_URL, query, callback);
}

function getMovieVideosTMDB(movieId, callback = printResp) {
    let TMDB_MOVIE_VIDEOS_URL = `${TMDB_BASE_URL}/movie/${movieId}/videos`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_MOVIE_VIDEOS_URL, query, callback);
}

function getMovieRecommendationsTMDB(movieId, page = 1, callback = printResp) {
    let TMDB_MOVIE_RECOMMENDATIONS_URL = `${TMDB_BASE_URL}/movie/${movieId}/recommendations`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_MOVIE_RECOMMENDATIONS_URL, query, callback);
}

function getSimilarMoviesTMDB(id, page = 1, callback = printResp) {
    let TMDB_SIMILAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/${id}/similar`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_SIMILAR_MOVIES_URL, query, callback);
}

function getMoviesNowPlayingTMDB(page = 1, callback = printResp) {
    let TMDB_MOVIES_NOW_PLAYING_URL = `${TMDB_BASE_URL}/movie/now_playing`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_MOVIES_NOW_PLAYING_URL, query, callback);
}


function getPopularMoviesTMDB(page = 1, callback = printResp) {
    let TMDB_POPULAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/popular`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_POPULAR_MOVIES_URL, query, callback);
}

function getTopRatedMoviesTMDB(page = 1, callback = printResp) {
    let TMDB_TOP_RATED_MOVIES_URL = `${TMDB_BASE_URL}/movie/top_rated`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_TOP_RATED_MOVIES_URL, query, callback);
}

function getUpcomingMoviesTMDB(page = 1, callback = printResp) {
    let TMDB_UPCOMING_MOVIES_URL = `${TMDB_BASE_URL}/movie/upcoming`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_UPCOMING_MOVIES_URL, query, callback);
}

function getListOfGenresTMDB(type = 'movie', callback = printResp) {
    let TMDB_GENRES_LIST_URL = `${TMDB_BASE_URL}/genre/${type}/list`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_GENRES_LIST_URL, query, callback);
}

function getMoviesByGenreTMDB(genreId_s, page = 1, callback = printResp) {
    let TMDB_MOVIES_BY_GENRE_URL = `${TMDB_BASE_URL}/discover/movie`;
    let query = {
        api_key: TMDB_KEY,
        sort_by: 'popularity.desc',
        page: page,
        with_genres: genreId_s // List of genres must be comma separated 
    };
    $.getJSON(TMDB_MOVIES_BY_GENRE_URL, query, callback);
}

// * * * * * * * * * * * * *
//  TV calls (TMDB)
// * * * * * * * * * * * * *

function discoverTvTMDB(page = 1, callback = printResp, filter = 'popularity.desc') {
    let TMDB_DISCOVER_TV_URL = `${TMDB_BASE_URL}/discover/tv`;
    let query = {
        api_key: TMDB_KEY,
        sort_by: filter,
        page: page
    };
    return $.getJSON(TMDB_DISCOVER_TV_URL, query, callback);
}

function getTvDetailsTMDB(tvId, callback = printResp) {
    let TMDB_TV_DETAILS_URL = `${TMDB_BASE_URL}/tv/${tvId}`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_DETAILS_URL, query, callback);
}

function getTVExternalIdsTMDB(tvId, callback = printResp) {
    let TMDB_TV_EXTERNAL_IDS_URL = `${TMDB_BASE_URL}/tv/${tvId}/external_ids`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_EXTERNAL_IDS_URL, query, callback);
}

function getTvVideosTMDB(tvId, callback = printResp) {
    let TMDB_TV_VIDEOS_URL = `${TMDB_BASE_URL}/tv/${tvId}/videos`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_VIDEOS_URL, query, callback);
}

function getPopularTv(page = 1, callback = printResp) {
    let TMDB_POPULAR_TV_URL = `${TMDB_BASE_URL}/tv/popular`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_POPULAR_TV_URL, query, callback);
}

function getCurrentlyOnAirTvTMDB(page = 1, callback = printResp) {
    let TMDB_CURRENT_TV_URL = `${TMDB_BASE_URL}/tv/on_the_air`;
    let query = {
        api_key: TMDB_KEY,
        page: page
    };
    $.getJSON(TMDB_CURRENT_TV_URL, query, callback);
}

function getTvSeasonDetailsTMDB(tvId, seasonNumber, callback = printResp) {
    let TMDB_TV_SEASON_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_SEASON_URL, query, callback);
}

function getTvSeasonExternalIdsTMDB(tvId, seasonNumber, callback = printResp) {
    let TMDB_TV_SEASON_EXTERNAL_IDS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/external_ids`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_SEASON_EXTERNAL_IDS_URL, query, callback);
}

function getTvSeasonVideosTMDB(tvId, seasonNumber, callback = printResp) {
    let TMDB_TV_SEASON_VIDEOS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/videos`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_SEASON_VIDEOS_URL, query, callback);
}

function getTvEpisodeDetailsTMDB(tvId, seasonNumber, episodeNumber, callback = printResp) {
    let TMDB_GET_TV_EPISODE_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_EPISODE_URL, query, callback);
}

function getTvEpisodeExternalIdsTMDB(tvId, seasonNumber, episodeNumber, callback = printResp) {
    let TMDB_GET_TV_EPISODE_EXTERNAL_IDS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_EPISODE_EXTERNAL_IDS_URL, query, callback);
}

function getTvEpisodeVideosTMDB(tvId, seasonNumber, episodeNumber, callback = printResp) {
    let TMDB_TV_EPISODE_VIDEOS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`;
    let query = {
        api_key: TMDB_KEY
    };
    $.getJSON(TMDB_TV_EPISODE_VIDEOS_URL, query, callback);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * //
//  OMDB API calls                                   
// * * * * * * * * * * * * * * * * * * * * * * * * * //
let OMDB_URL = 'https://www.omdbapi.com/';
let POSTER_OMDB_URL = 'http://img.omdbapi.com/?i=tt3896198&h=600&apikey=48bffb4a';
let OMDB_KEY = '48bffb4a';

function searchByIdOMDB(id, callback = printResp) {
    let query = {
        i: id,
        plot: 'short',
        apikey: OMDB_KEY,
        tomatoes: 'True'
    };
    $.getJSON(OMDB_URL, query, callback);
}

function searchCustomOMDB(params, callback = printResp) {
    let query = {
        apikey: OMDB_KEY
    };
    Object.assign(query, params);
    $.getJSON(OMDB_URL, query, callback);
}


// * * * * * * * * * * * * * * * * * * * * * * * * * //
//  Guidebox API calls                               
// * * * * * * * * * * * * * * * * * * * * * * * * * //
let GBOX_BASE_URL = "https://api-public.guidebox.com/v2";
let GUIDEBOX_KEY = 'db85b00dc1a54c2a02ed61575609802bb3d8c498';

function getQuota() {
    let QUOTA_GUIDEBOX_URL = `${GBOX_BASE_URL}/quota`;
    let query = {
        api_key: "db85b00dc1a54c2a02ed61575609802bb3d8c498"
    };
    $.getJSON(QUOTA_GUIDEBOX_URL, query, printResp);
}

function getPopularTitles(limit = 250, offset = 0, sources = 'all', callback = printResp) {
    let RECENT_MOVIES_URL = `${GBOX_BASE_URL}/movies/`;
    let query = {
        api_key: GUIDEBOX_KEY,
        limit: limit,
        offset: offset,
        sources: sources
    };
    $.getJSON(RECENT_MOVIES_URL, query, callback);
}
                                                              // imdb OR themoviedb   
function searchByExternalIdGuidebox(external_id, type = 'movie', idType = 'imdb', callback = printResp) {
    let SEARCH_GUIDEBOX_BY_EX_ID = `${GBOX_BASE_URL}/search`;
    let query = {
        api_key : GUIDEBOX_KEY,
        type: type,
        field: 'id',
        id_type: idType,
        query: external_id
    };
    $.getJSON(SEARCH_GUIDEBOX_BY_EX_ID, query, callback);
}

function getMovieGuidebox(movieID, callback = printResp) {
    let MOVIE_GBOX_URL = `${GBOX_BASE_URL}/movies/${movieID}`;
    let query = {
        api_key: GUIDEBOX_KEY,
    };
    $.getJSON(MOVIE_GBOX_URL, query, callback);
}

function getShowGuidebox(showID, callback = printResp) {
    let SHOW_GBOX_URL = `${GBOX_BASE_URL}/shows/${showID}`;
    let query = {
        api_key: GUIDEBOX_KEY,
    };
    $.getJSON(SHOW_GBOX_URL, query, callback);
}

function getShowSeasonsGuidebox(showID, callback = printResp) {
    let SHOW_GBOX_URL = `${GBOX_BASE_URL}/shows/${showID}/seasons`;
    let query = {
        api_key: GUIDEBOX_KEY,
    };
    $.getJSON(SHOW_GBOX_URL, query, callback);
}

function getAllEpisodesGuidebox(showID, season = 1, callback = printResp, limit = 100) {
    let SHOW_GBOX_URL = `${GBOX_BASE_URL}/shows/${showID}/episodes`;
    let query = {
        api_key: GUIDEBOX_KEY,
        include_links: true,
        season: season,
        limit: limit
    };
    $.getJSON(SHOW_GBOX_URL, query, callback);
}

function getShowAvailableContentGuidebox(showID, callback = printResp) {
    let SHOW_GBOX_URL = `${GBOX_BASE_URL}/shows/${showID}/available_content`;
    let query = {
        api_key: GUIDEBOX_KEY,
    };
    $.getJSON(SHOW_GBOX_URL, query, callback);
}



// ================================================================================
// URL manipulation and State capture
// ===============================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Handles URL on page reload to display 
// appropriate state                                     
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function handleUrl() {
    let url = window.location.hash;
    // console.log('URL: ', url);
    if (url == '') {
        $(SEARCH_FORM).focusin();
        $(MAIN_INPUT).focus();
    } else if (url.includes('search')) {
        urlSearchHandler(url);
    } else if (url == '#popular') {
        popularHandler();
        window.location = `#popular`;
    } else if (url == '#discover') {
        discoverHandler();
        window.location = `#discover`;
    } else if (url.includes('detail')) {
        urlDetailHandler(url);
    } 
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Handles API call for previous state search
// query                                       
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function urlSearchHandler(url) {
    let searchQuery = url.replace('#search/query=', '');
    state.query = searchQuery;
    searchMultiHandler();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Handles API call for correct detail page state                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function urlDetailHandler(url) {
    let type = 'movie';
    if (url.includes('tv')) {
        type = 'tv';
    }
    let id = url.replace(`#detail/${type}/`, '');
    findByIdTMDB(id, function(resp) {
        let movie = resp.movie_results[0];
        let tv = resp.tv_results[0];
        state.carouselPosters = JSON.parse(sessionStorage.getItem('posters'));
        state.carouselLabel = JSON.parse(sessionStorage.getItem('label'));
        if (movie) {
            let $movie = $(getPosterImgTemplate(movie));
            movieDetailPageHandler($movie, true);
        } else if (tv) {
            let $tv = $(getPosterImgTemplate(tv));
            tvDetailHandler($tv, true);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Sets the current posters to be displayed in
// detail banner carousel and makes call to handle 
// session storage of posters                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function setCarouselPosters(posters, label) {
    state.carouselPosters = posters;
    state.carouselLabel = label;
    storeCarouselData(posters, label)
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Stores posters to be used in detail banner 
// carousel in session storage to fetch on 
// page reload                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function storeCarouselData(posters, label) {
    let posters_str = JSON.stringify(posters);
    let label_str = JSON.stringify(label);
    sessionStorage.setItem('posters', posters_str);
    sessionStorage.setItem('label', label_str);
}



// ================================================================================
//    Event Listeners
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * //
//   Nav Clicks                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * //
function searchNavClick() {
    $(SEARCH).on('click', function(e) {
        e.preventDefault();
        $(FIXED_CONTAINER).removeClass('fixed-overlay');
        $(MOBILE_MENU).removeClass('expand');
        $(MAIN_NAV).removeClass('expand');
        showSearchPage();
        $(SEARCH_FORM).focusin();
        $(MAIN_INPUT).val('').focus();
    }); 
}

function popularNavClick() {
    $(POPULAR).on('click', function(e) {
        e.preventDefault();
        $(MOBILE_MENU).removeClass('expand');
        $(MAIN_NAV).removeClass('expand');
        popularHandler();
        window.location = `#popular`;
    });
}

function discoverNavClick() {
    $(DISCOVER).on('click', function(e) {
        e.preventDefault();
        $(MOBILE_MENU).removeClass('expand');
        $(MAIN_NAV).removeClass('expand');
        discoverHandler();
        window.location = `#discover`;
    });
}

function burgerMenuClick() {
    $('.burger').on('click', function(e) {
        e.preventDefault();
        $(MOBILE_MENU).toggleClass('expand');
        $(MAIN_NAV).toggleClass('expand');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * //
//   Search forms                                       
// * * * * * * * * * * * * * * * * * * * * * * * * * //
function searchFormSubmit() {
    $(SEARCH_FORM).submit(function(e) {
        e.preventDefault();
        let $input = $(this).find(QUERY_INPUT);
        state.query = $input.val();
        state.searchResults = [];
        searchMultiHandler();
        window.location = `#search/query=${state.query}`;
    });
}

function searchFormFocus() {
    $(SEARCH_FORM).focusin(function(e) {
        e.preventDefault();
        $(this).addClass('search-form-focus');
    });

    $(SEARCH_FORM).focusout(function(e) {
        e.preventDefault();
        $(this).removeClass('search-form-focus');
    });
}

function navSearchGlassHover() {
    $(NAV_SEARCH_GLASS).mouseenter(e => {
        e.preventDefault();
        showNavSearchInput();
    });

    $(NAV_SEARCH_INPUT).focusout(e => {
        e.preventDefault();
        hideNavSearchInput();
    });
}

function navSearchGlassClick() {
    $(NAV_SEARCH_GLASS).on('click', function(e) {
        e.preventDefault();

    });
}

function popularTvFooterNavClick() {
    $(POPULAR_TV).on('click', function(e) {
        e.preventDefault();
        popularHandler(MAIN);
        $.when(discoverMoviesTMDB(), discoverTvTMDB()).then(function() {
            smoothScroll('.tv-section', 300, 50);
        });
        window.location = `#popular/tv`;
    });
}

function discoveryFooterNavClick() {
    $(DISCOVERY_NAV_GENRE).on('click', function(e) {
        e.preventDefault();
        discoverHandler($(this).attr('data-id'));
        window.location = `#discover`;
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * //
//    Poster clicks                                             
// * * * * * * * * * * * * * * * * * * * * * * * * * //

function posterImgClick() {
    $(CONTENT).on('click', POSTER_IMG, function(e) {
        e.preventDefault();
        let $poster = $(this);
        if ($poster.attr('data-tv') == 'true') {
            tvDetailHandler($poster, true);
        } else {
            movieDetailPageHandler($poster, true);
        }
    });
}

function popularPosterClick() {
    $(POPULAR_MOVIE_CONTENT).on('click', POSTER_IMG, function(e) {
        e.preventDefault();
        
        setCarouselPosters(state.popularMovies, 'Popular Movies');
    });

    $(POPULAR_TV_CONTENT).on('click', POSTER_IMG, function(e) {
        e.preventDefault();
        setCarouselPosters(state.popularTv, 'Popular TV');
    });
}

function moreContentClick() {
    $(MORE_BTN).on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('movies-btn')) {
            popularMoviesHandler(++state.popularMoviePage);
        } else if ($(this).hasClass('tv-btn')) {
            popularTvShowsHandler(++state.popularTvPage);
        } else if ($(this).hasClass('search-more-btn')) {
            state.searchPage += 2;
            searchMultiHandler(state.searchPage);
        }
    });
}

function discoverPosterClick() {
    $(DISCOVER_CONTENT).on('click', POSTER_IMG, function(e) {
        e.preventDefault();
        let $poster = $(this);
        let genre = $poster.attr('data-genre');
    
        setCarouselPosters(state.genreLists[genre], genre);
    });
}

function seasonPosterClick() {
    $(SEASONS_CONTAINER).on('click', SEASON_POSTER, function(e) {
        e.preventDefault();
        // make call for season details
        // display each episode
        let showName = $(this).attr('data-show-name');
        let showID = $(this).attr('data-show-id');
        let season = $(this).attr('data-season-number');
        seasonHandler(showName, showID, season);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * //
//    Carousel Poster clicks                                             
// * * * * * * * * * * * * * * * * * * * * * * * * * //

function trailerCarouselClick() {
    $(TRAILER_SLIDER).on('click', 'img', function(e) {
        e.preventDefault();
        $(FRAME).attr('src', $(this).attr('data-url'));
    });
}

function detailCarouselClick() {
    $(DETAIL_PAGE_SLIDER).on('click', DETAIL_SLIDE_IMG, function(e) {
        e.preventDefault();
        let $poster = $(this);
        if ($poster.attr('data-tv') == 'true') {
            tvDetailHandler($poster, false)
        } else {
            movieDetailPageHandler($poster, false);
        }
    });
}

function similarCarouselClick() {
    $(SIMILAR_MOVIES_SLIDER).on('click', SIMILAR_SLIDE_IMG, function(e) {
        e.preventDefault();
        movieDetailPageHandler($(this), false);
    });
}

// ================================================================================
//    Event Listener Groups
// ================================================================================
function watchNavItems() {
    // search
    searchNavClick();
    searchFormSubmit();
    navSearchGlassHover();
    searchFormFocus();
    // popular
    popularNavClick();
    popularTvFooterNavClick();
    // discover genres
    discoverNavClick();
    discoveryFooterNavClick();
    // mobile
    burgerMenuClick();
}

function utilities() {
    checkSizeHandler();
    responsiveReslick();
    fixNavOnScroll();
}

function displays() {
    // posters clicks
    posterImgClick();
    popularPosterClick();
    discoverPosterClick();
    seasonPosterClick();
    moreContentClick();
    // carousel poster clicks
    trailerCarouselClick();
    detailCarouselClick();
    similarCarouselClick();
}

function init() {
    handleUrl();
}

// ================================================================================
//    Entry Point
// ================================================================================
$(function() {
    watchNavItems();
    utilities();
    displays();

    init(); // Must come after event listeners are binded

    // showDetailPage();
    // initDiscoverySlider();
    // initStreamingLinksSlider();
    // console.log(obj);
});