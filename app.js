'use strict';

let state = {
    popularMovies: [],
    popularTv: [],
    query: '',
    isMobile: false,
    count: 0
};

// Selectors

// banner
const BANNER = '.banner';
const TITLE = '.title';
const DISCOVER = '.discover';
const SEARCH = '.search';
const POPULAR = '.popular';

// main body
const MAIN = 'main';
const LANDING_CONTENT = '#landing-content';
const LANDING_PAGE = '.landing';
const LANDING_HEADER = '.landing-header';

// search
const NAV_SEARCH_INPUT = '#nav-search-input';
const NAV_SEARCH_GLASS = '.nav-search-glass';
const SEARCH_PAGE = '.search-page';
const SEARCH_FORM = '.search-form';
const MAIN_INPUT = '#main-input';

const QUERY_INPUT = '.query-input';
const CONTENT = '.content';

const DISCOVER_CONTAINER = '.discover-container';
const DISCOVER_CONTENT = '.discover-content';
const DISCOVER_SLIDER = '.discover-slider';

const POSTER_IMG = '.poster img';

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
const WRITERS = '.js-writers';
const CAST = '.js-cast';
const FRAME = '.js-frame';
const TRAILER_SLIDER = '.trailer-slider';

// streaming options carousel
const STREAMING_LINKS_SLIDER = '.streaming-links-slider';
const STREAMING_LINKS_CONTAINER = '.streaming-links-container';
const PURCHASE_LINKS = '.purchase-links';
const SUBSCRIPTION_LINKS = '.subscription-links';
const TV_LINKS = '.tv-links';


// ================================================================================
// Displays
// ================================================================================
            //  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
let widths = ["w92","w154","w185","w342","w500","w780","original"]
let img_width = widths[2];
      
let IMG_BASE_URL = `https://image.tmdb.org/t/p`;
// "https://image.tmdb.org/t/p/w500/pGwChWiAY1bdoxL79sXmaFBlYJH.jpg"
// "https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg"

//
// Returns template for movie poster
//
function posterTemplate(tv, poster_path, title, id, overview, release_date, backdrop_path) {
    return `<div class="${tv ? 'tv': ''} poster">
                <div class="poster-img-wrap">
                    <img src="${IMG_BASE_URL}/${img_width}/${poster_path}" 
                        alt="Poster image for ${title}."
                        id="${id}"
                        data-tv="${tv}" 
                        data-title="${title}"
                        data-id="${id}"
                        data-overview="${overview}"
                        data-release-date="${release_date}"
                        data-backdrop="${backdrop_path}"
                    >
                </div>
                <div class="poster-overlay" data-id="${id}" data-tv="${tv}">
                    <span class="view-detail">View Details</span>
                </div>
                <label for="${id}" class="poster-label">
                    <span>${title}</span><br>
                    <span>${release_date.slice(0,4)}</span>
                </label> 
            </div>`;
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular movie posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularMovies() {
    let movies = state.popularMovies.map(function(movie) {
        let overview = movie.overview.replace(/["]/g, "'");
        return posterTemplate(false,
                              movie.poster_path,
                              movie.title,
                              movie.id,
                              overview,
                              movie.release_date,
                              movie.backdrop_path);
    });
    let movie_section = `<div class="movie-section">
                            <h3 id="popular-movies">Movies</h3>
                            ${movies.join('')}
                        </div>
                     `;
    $(LANDING_CONTENT).append(movie_section);
}



// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular tv show posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularTv() {
    let shows = state.popularTv.map(function(show) {
        let overview = show.overview.replace(/["]/g, "'");
        return posterTemplate(true,
                              show.poster_path,
                              show.name,
                              show.id,
                              overview,
                              show.first_air_date,
                              show.backdrop_path);
    });
    let tv_section = `<div class="tv-section">
                        <h3 id="popular-tv">TV</h3>
                        ${shows.join('')}
                     </div>
                     `;
    $(LANDING_CONTENT).append(tv_section);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Display detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailPage(tmdb, imdb, guidebox) {
    console.log('\n\n\ntmdb: ' , tmdb, ' \n\n\nimdb: ', imdb, ' \n\n\nguidebox: ', imdb);
    // Poster container data
    $(MOVIE_TITLE).text(imdb.Title);
    $(YEAR).text(imdb.Year);
    $(RATED).text(imdb.Rated);
    $(RUNTIME).text(imdb.Runtime);
    $(DETAIL_POSTER).attr('src', `${IMG_BASE_URL}/w342/${tmdb.poster_path}`);
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

    // meta-data -- People 
    $(PLOT).text(imdb.Plot);
    $(DIRECTOR).text(imdb.Director);
    $(WRITERS).text(imdb.Writer);
    $(CAST).text(imdb.Actors);

    // Streaming links data -- GUIDEBOX DATA
    unslick(STREAMING_LINKS_SLIDER); // unslicks previous slider(s) if initialized
    $(STREAMING_LINKS_CONTAINER).empty(); // clears previous slider(s)

    // let movie = guidebox; // GUIDEBOX
    let movie = obj; // ALIEN (TESTING)
    // let movie = theater; // WONDERWOMAN (IN-THEATERS TESTING)
    if (movie.in_theaters) {
        $(STREAMING_LINKS_CONTAINER).append(`<h3>STILL IN THEATERS</h3>`);
        if(movie.other_sources.movie_theater) {
            $(STREAMING_LINKS_CONTAINER).append(`<h4>Grab Tickets</h4>`);
            let theater_links = getTheaterSources(movie);
            $(STREAMING_LINKS_CONTAINER).append(theater_links);
        }
    }

    // let purch_srcs = guidebox.purchase_web_sources; // GUIDEBOX  
    let purch_srcs = obj.purchase_web_sources; // ALIEN (TESTING)
    // let purch_srcs = theater.purchase_web_sources; // WONDERWOMAN (IN-THEATERS TESTING)

    // let sub_srcs = guidebox.subscription_web_sources; // GUIDEBOX
    let sub_srcs = obj.subscription_web_sources; // ALIEN (TESTING)
    // let sub_srcs = theater.subscription_web_sources; // WONDERWOMAN (IN-THEATERS TESTING)

    // let tv_srcs = guidebox.tv_everywhere_web_sources; // GUIDEBOX
    let tv_srcs = obj.tv_everywhere_web_sources; // ALIEN (TESTING)
    // let tv_srcs = theater.tv_everywhere_web_sources;// WONDERWOMAN (IN-THEATERS TESTING)

    // let free_srcs = guidebox.free_web_sources; // GUIDEBOX
    let free_srcs = obj.free_web_sources; // ALIEN (TESTING)

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
        // let free_slides = getSources(free_srcs, 'free');
        // let free_slider = `<label for="free-links">Free</label>
        //                   <ul id="free-links" class="free-links streaming-links-slider">
        //                         ${free_slides.join('')}
        //                   </ul>`;
        // $(STREAMING_LINKS_CONTAINER).append(free_slider);
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
            }
            slide += `</li>`;                     
            return slide;
        });
}

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


// ================================================================================
// Slick Carousel 
// ================================================================================

//
// Discover by genre carousels
//
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

//
// streaming options carousel
//
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


//
// trailers carousels
//
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
//  Used to reslick sliders on window resize. 
//  Slick settings also handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function responsiveReslick() {
    $(window).resize(function() {
        let width = parseInt($('body').css('width'));
        if(width < 400) {
            if($(DISCOVER_SLIDER, STREAMING_LINKS_SLIDER).hasClass('slick-initialized')) {
                unslick($(DISCOVER_SLIDER));
                unslick($(STREAMING_LINKS_SLIDER));
            }
        } else {
            if(!$(DISCOVER_SLIDER).hasClass('slick-initialized')) {
                initDiscoverySlider();
            }
            if(!$(STREAMING_LINKS_SLIDER).hasClass('slick-initialized')) {
                initStreamingLinksSlider();
            }
        }
    });
}

// ================================================================================
// Utilities / Helper Functions
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Helper function to print JSON response data to
// console for debugging
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function printResp(resp) {
    console.log(resp);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Discovery page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showDiscoverPage() {
    $(LANDING_PAGE).addClass('hidden');
    $(DETAIL_PAGE).addClass('hidden');
    $(DISCOVER_CONTAINER).removeClass('hidden');
    $(MAIN).removeClass('detail-page-main');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Landing / Search / Popular page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showPopularPage() {
    // $(SEARCH_PAGE).addClass('hidden');
    $(DISCOVER_CONTAINER).addClass('hidden');
    $(DETAIL_PAGE).addClass('hidden');
    $(LANDING_PAGE).removeClass('hidden');
    $(MAIN).removeClass('detail-page-main');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Detail page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showDetailPage() {
    clearDetailPage();
    $(LANDING_PAGE).addClass('hidden');
    $(DISCOVER_CONTAINER).addClass('hidden');
    $(DETAIL_PAGE).removeClass('hidden');
    $(MAIN).addClass('detail-page-main');
}

function clearDetailPage() {
    $(MOVIE_TITLE).text('');
    $(YEAR).text('');
    $(RATED).text('');
    $(RUNTIME).text('');
    $(DETAIL_POSTER).attr('src', '');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handler to collapse and expand nav bar upon scroll
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
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target, duration = 1200) {
    $('body, html').animate({
        scrollTop: $(target).offset().top
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

// ================================================================================
// API Handlers
// ================================================================================

function popularHandler() {
    $(LANDING_CONTENT).empty();
    $(MAIN_INPUT).val('')
    $(LANDING_HEADER).text('Browse Popular Titles');

    smoothScroll(MAIN);
    showPopularPage();
    popularMoviesHandler();
    popularTvShowsHandler();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular movies
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularMoviesHandler() {
    discoverMoviesTMDB(1, function(resp) {
        // console.log(resp);
        state.popularMovies = resp.results;
        displayPopularMovies();
    });
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular Tv shows
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularTvShowsHandler() {
    discoverTvTMDB(1, function(resp) {
        // console.log(resp);
        state.popularTv = resp.results;
        displayPopularTv();
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for movie / tv show search
// * * * * * * * * * * * * * * * * * * * * * * * * *
function searchMultiHandler() { 
    $(LANDING_HEADER).text('Loading . . .');
    $(MAIN_INPUT).val('');
    $(NAV_SEARCH_INPUT).val('');

    showPopularPage();
    smoothScroll(MAIN);

    searchAllTMDB(state.query, 1, function(resp) {
        searchAllTMDB(state.query, 2, function(resp_p2) {
            let results = resp.results.concat(resp_p2.results);
            let posters = results.filter(result => {
                                    return result.media_type == 'person' ?  false : true;
                                }).map(function(result) {
                let isTvShow = result.media_type == 'tv';
                // let poster_path = result.poster_path == null ? findPoster(isTvShow, result.id) : result.poster_path;
               
                let overview = result.overview.replace(/["]/g, "'");
                if (result.poster_path != null) {
                    return posterTemplate(  isTvShow, // tells function to process data-attr as movie or tv-show
                                            result.poster_path,
                                            result.media_type == 'movie' ? result.title : result.name,
                                            result.id,
                                            overview,
                                            result.media_type == 'movie' ? result.release_date : result.first_air_date,
                                            result.backdrop_path);
                }
            });
            $(LANDING_HEADER).text(`'${state.query}' Results`);
            $(LANDING_CONTENT).empty().append(posters.join(''));
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for detail page. Fetches all metadata
//  for movies and tv shows and prepares them to 
//  display to user
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailPageHandler(poster) {
    showDetailPage();
    smoothScroll(MAIN);
    if (poster.attr('data-tv') == 'true') {
        getTvDetailsTMDB(poster.attr('data-id'), function(detail_resp) {
            getTVExternalIdsTMDB(detail_resp.id, function(ids_resp) {
                searchByIdOMDB(ids_resp.imdb_id, function(imdb_resp) {
                    // call to guidebox for streaming links / prices
                    // searchByExternalIdGuidebox(imdb_resp.imdbID, 'show', 'imdb', function(gbox_s_resp) {
                    //     getShowGuidebox(gbox_s_resp.id, function(gbox_tv_resp) {
                    //         console.log(gbox_tv_resp);
                    //         displayDetailPage(detail_resp, imdb_resp, gbox_tv_resp);
                    //     });
                    // });
                });
            });
            getTvVideosTMDB(detail_resp.id, function(video_resp) {
                trailerHandler(video_resp);
            });
        });
    } else {
        getMovieDetailsByIdTMDB(poster.attr('data-id'), function(detail_resp) {
            searchByIdOMDB(detail_resp.imdb_id, function(imdb_resp) {
                displayDetailPage(detail_resp, imdb_resp);
                // call to guidebox for streaming links / prices
                // searchByExternalIdGuidebox(imdb_resp.imdbID, 'movie', 'imdb', function(gbox_s_resp) {
                //     getMovieGuidebox(gbox_s_resp.id, function(gbox_m_resp) {
                //         displayDetailPage(detail_resp, imdb_resp, gbox_m_resp);
                //     });
                // });
            });
            getMovieVideosTMDB(detail_resp.id, function(video_resp) {
                trailerHandler(video_resp);
            });
        });
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for trailers, collects them and creates
//  carousel on detail page with thumbails
// * * * * * * * * * * * * * * * * * * * * * * * * *
function trailerHandler(resp) {
    unslick(TRAILER_SLIDER);
    $(TRAILER_SLIDER).empty();

    let trailers = resp.results.filter(function(trailer) {
                    return (trailer.type.toLowerCase() == 'trailer' 
                                && trailer.site.toLowerCase() == 'youtube');
    });
    console.log(trailers);
    if (trailers.length > 0) {
        let mainTrailer = trailers.find(function(trailer) {
        let name = trailer.name.toLowerCase() ;
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
        // makes JSON request for each trailer obj and maps each call to array
        let jsonRequests = trailers.map(function(trailer) {
                return searchVideoByIdYoutube(trailer.key, function(youtube_resp) {
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
                    $(TRAILER_SLIDER).append(alt_trailer_thumbnail);
                });
        });
        // waits for array of JSON requests to finish, then executes code block
        $.when.apply($, jsonRequests).then(function() {
            initTrailerSlider();
            console.log('mainTrailer', mainTrailer);
            $(FRAME).attr('src', `https://www.youtube.com/embed/${mainTrailer.key}?`);
        });
    } // end if     
}

               //  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
// let widths = ["w92","w154","w185","w342","w500","w780","original"]
// let img_width = widths[2];
function discoverHandler() {
    $(DISCOVER_CONTENT).empty();
    $(MAIN_INPUT).val('');

    showDiscoverPage();
    $(DISCOVER_CONTAINER).css({'height': '0px', 'overflow': 'hidden'}); // Hide content to wait for slick
    smoothScroll(MAIN);

    let jsonRequests = genres.map(function(genre) {
        return discoverMoviesByGenreTMDB(genre.id, 1, function(resp) {
                let genreSlides = resp.results.map(function(movie) {
                    // let overview = movie.overview.replace(/["]/g, "'");
                    return `<div class="disc-slide">
                                <div class="slide-poster">
                                    <img src="${IMG_BASE_URL}/${widths[0]}/${movie.poster_path}"
                                            id="${movie.id}"
                                    >
                                    <div class="poster-overlay" data-id="${movie.id}">
                                        <span class="view-detail">View Details</span>
                                    </div>
                                </div>
                            </div>`;
                });
                                        
                let sliderTemplate = `<div class="discover-wrap">
                                        <h3 class="genre">${genre.name}</h3>
                                        <div class="discover-slider">
                                            ${genreSlides.join('')}
                                        </div>
                                    </div>`;
                // Use genre name to dynamically add slider to appropriate container
                $(DISCOVER_CONTENT).append(sliderTemplate);
            });
    });

    // Waits until all 'discoverMoviesByGenreTMDB' api requests are 
    // successful then triggers callback
    $.when.apply($, jsonRequests).then(function(a) {
        initDiscoverySlider(); // slider element is created, no need to unslick
        $(DISCOVER_CONTAINER).css({'height': '', 'overflow': ''}); // Once slicked, display content
    });
}



// ================================================================================
//    API Calls   ~   TMDB, OMDB, Guidebox
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * //
// Searches YouTube data API by video ID number      //
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
//  TMDB API calls                                   //
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
    $.getJSON(TMDB_DISCOVER_MOVIES_URL, query, callback);
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
    $.getJSON(TMDB_DISCOVER_TV_URL, query, callback);
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
//  OMDB API calls                                   //
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
//  Guidebox API calls                                   //
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
    let SHOW_GBOX_URL = `${GBOX_BASE_URL}/shows/${showID}/episodf es`;
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
//    Event Listeners
// ================================================================================
function searchNavClick() {
    $(SEARCH).on('touchstart click', function(e) {
        e.preventDefault();

        // Needs UPDATED

        $(LANDING_PAGE).addClass('hidden');
        $(SEARCH_PAGE).removeClass('hidden');
        $(SEARCH_FORM).focusin();
        $(MAIN_INPUT).val('').focus();
    }); 
}

function popularNavClick() {
    $(POPULAR).on('touchstart click', function(e) {
        e.preventDefault();
        popularHandler();
    });
}

function discoverNavClick() {
    $(DISCOVER).on('touchstart click', function(e) {
        e.preventDefault();
        discoverHandler();
    });
}

function posterImgClick() {
    $(CONTENT).on('click', '.poster-overlay', function(e) {
        e.preventDefault();
        let $poster = $(this);
        displayDetailPageHandler($poster);
    });
}

function searchFormSubmit() {
    $(SEARCH_FORM).submit(function(e) {
        e.preventDefault();
        let $input = $(this).find(QUERY_INPUT);
        state.query = $input.val();
        searchMultiHandler();
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

function navSearchGlassClick() {
    $(NAV_SEARCH_GLASS).click(e => {
        e.preventDefault();
        // $(NAV_SEARCH_INPUT).show().focus();
        $(NAV_SEARCH_INPUT).show()
                            .animate({width: '200px'}, {
                                    duration: 500,
                                    easing: 'linear',
                                    complete: () => {
                                        $(NAV_SEARCH_INPUT).focus();
                                    }
        });
    });

    $(NAV_SEARCH_INPUT).focusout(e => {
        e.preventDefault();
        $(NAV_SEARCH_INPUT).animate({width: '0'}, {
                                    duration: 300,
                                    easing: 'linear',
                                    complete: () => {
                                        $(NAV_SEARCH_INPUT).hide();
                                    }
        });
    });
}

function trailerCarouselClick() {
    $(TRAILER_SLIDER).on('click', 'img', function(e) {
        e.preventDefault();
        $(FRAME).attr('src', $(this).attr('data-url'));
    });
}


// ================================================================================
//    Event Listener Groups
// ================================================================================
function init() {
    $(SEARCH_FORM).focusin();
    $(MAIN_INPUT).focus();
    // popularMoviesHandler();
    // popularTvShowsHandler();
}

function watchNavItems() {
    searchNavClick();
    popularNavClick();
    discoverNavClick();
    searchFormSubmit();
    navSearchGlassClick();
    searchFormFocus();
}

function displays() {
    posterImgClick();
    trailerCarouselClick();
}

function utilities() {
    checkSizeHandler();
    responsiveReslick();
    // collapseNavHandler();
}

// ================================================================================
//    Entry Point
// ================================================================================
$(function() {
    watchNavItems();
    utilities();
    displays();
    init();

    // showDetailPage();

    // initDiscoverySlider();
    initStreamingLinksSlider();

    console.log(obj);
});