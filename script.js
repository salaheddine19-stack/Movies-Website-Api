const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='


const mainElement = document.querySelector('#main')
const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')


form.addEventListener('submit', function (e){
    e.preventDefault()
    let url = SEARCH_API + searchInput.value

    if(searchInput.value === '') {
        getMovies(API_URL)
    }else {
        getMovies(url)
    }
})

getMovies(API_URL)

function getMovies(url) {
    fetch(url)
     .then(function (res) {
         return res.json()
     })
     .then(function (data) {
         console.log(data.results);

         let movies = data.results

         mainElement.innerHTML = ''
         movies.forEach(function (movie) {
             console.log(movie);

             mainElement.innerHTML += `
             <div class="movie">
                    <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <span class="${getVoteColor(movie.vote_average)}">${movie.vote_average}</span>
                    </div>
                    <div class="overview">
                       <h3>Overview</h3>
                       ${movie.overview}
                    </div>
                </div>  
                `

         })

     })
}

function getVoteColor(vote) {
    let colorClass = ''

    if (vote > 8) {
        colorClass = 'green'
    } else if (vote > 5) {
        colorClass = 'orange'
    } else {
        colorClass = 'red'
    }

    return colorClass
}