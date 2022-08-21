<template>
    <div>
        <header class="nav-bar">
            <ul class="left-side-nav">
                <li class="list-item active">Home</li>
                <li class="list-item">Series</li>
                <li class="list-item">My List</li>
            </ul>
            <div class="right-side-nav">
                <div class="search-wrapper">
                    <div class="search">
                        <svg style="padding-right: 12px;" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path fill="white"
                                d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                        </svg>
                        <form @submit.stop.prevent="goToSearch">
                            <input type="search" autocomplete="off" placeholder="Search..." ref="search" name="search"
                                id="search-field" v-model="animeName" v-on:input="searchAnime">
                        </form>
                    </div>
                        <div class="searchSuggestions">
                            <div ref="search_result" class="search-result" v-on:click="goToInfo(anime.id)" v-for="anime in searchJson" v-bind:key="anime.id">
                                <img class="anime-image-nav" :src="anime.image" alt="">
                                <div class="result-text-nav">
                                    <h1 class="result-title-nav">
                                        {{ anime.title.userPreferred }}
                                    </h1>
                                    <h2 class="result-date-nav">

                                        {{ anime.releaseDate }}
                                    </h2>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="avatar"></div>
            </div>
        </header>
        <div>
            <div class="featured-content">
                <div class="clipper">
                    <div class="iframe-wrapper">
                        <iframe class="iframe-class"
                            src="https://www.youtube.com/embed/CFuuCA0duQU?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=CFuuCA0duQU"
                            frameborder="0"></iframe>
                    </div>
                </div>
                <div class="gradient"></div>
                <div class="featured-details">
                    <h3 class="duration">23 min / Episode</h3>
                    <h2 class="episode-count">Episodes: <span class="red-text">7</span> - Status: <span
                            class="red-text">CURRENTLY AIRING</span></h2>
                    <h1 class="title">Yofukashi no Uta</h1>
                    <h4 class="description-home">Wracked by insomnia and wanderlust, Kou Yamori is driven onto the moonlit
                        streets every night in an aimless search for something he can’t seem to name. His nightly ritual
                        is
                        marked by purposeless introspection — until he meets Nazuna, who might just be a vampire! Kou’s
                        new
                        companion could offer him dark gifts and a vampire’s immortality. But there are conditions that
                        must
                        be met before Kou can sink his teeth into vampirism, and he’ll have to discover just how far
                        he’s
                        willing to go to satisfy his desires before he can heed the Call of the Night!<br><br>(Source:
                        Sentai Filmworks)</h4>
                </div>
            </div>

            <div style="height: 800px;width: 800px;color: red;">{{ slug }}</div>
        </div>
    </div>
</template>

<script>
export default {
    transition: {
        name: 'home',
        mode: 'out-in'
    },
    data() {
        return {
            animeName: null,
            searchJson: null,
            magic_flag: false,
        }
    },
    methods: {
        handleScroll() {
            // Your scroll handling here
            console.log(window.scrollY)
            var nav_bar = document.documentElement.querySelector('.nav-bar');
            if (window.scrollY >= 150) {
                nav_bar.style.backgroundColor = 'black';

            } else {
                nav_bar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)';
                nav_bar.style.backgroundColor = 'transparent';
            }
        },
        async searchAnime() {
            this.searchJson = await fetch('https://consumet-api.herokuapp.com/meta/anilist/' + this.animeName + '?provider=zoro').then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
            }).then(function (data) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                //console.log(data)
                var results = data.results
                for (let index = 0; index < data.results.length; index++) {
                    if (data.results[index].status === "Not yet aired") {
                        results.splice(index, 1)
                    }
                }
                //console.log(results)
                return results; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
            });

            console.log(this.searchJson)

            if(this.searchJson != null && this.searchJson.length != 0) {
                this.$el.querySelector('.searchSuggestions').classList.add('display')
                this.$el.querySelector('.suggestionClipper').classList.add('display')
            } else {
                this.$el.querySelector('.searchSuggestions').classList.remove('display')
                this.$el.querySelector('.suggestionClipper').classList.remove('display')
            }
        },
        async goToSearch() {
            await navigateTo('/search/' + this.$refs.search.value.toLowerCase().replaceAll(' ', '-'), { replace: false })
        },
        async goToInfo(id) {
            await navigateTo('/info/' + id, { replace: false })
        },
    },
    mounted() {
        const password = document.querySelector('input[type="search"]');
        const suggestionClipper = document.querySelector('.suggestionClipper');
        const searchSuggestions = document.querySelector('.searchSuggestions');

        password.addEventListener('focus', (event) => {
            searchSuggestions.style.overflow.y = 'scroll';
            //this.searchAnime()
        });

        password.addEventListener('blur', (event) => {
            suggestionClipper.classList.remove('display');
            searchSuggestions.classList.remove('display');
            searchSuggestions.style.overflow = 'hidden';
        });
    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)
        
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style>
/* clears the 'X' from Internet Explorer */
input[type=search]::-ms-clear {
    display: none;
    width: 0;
    height: 0;
}

input[type=search]::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
}

/* clears the 'X' from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
    display: none;
}


* {

    padding: 0;
    margin: 0;
}

html {
    font-family: 'Inter';
    color: white;
}

body {
    background-color: #16151A;
    overflow-x: hidden;
}

/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #1a1a19;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #707179;
    border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #707179;
    border-radius: 4px;
}


.nav-bar {
    position: fixed;
    width: 100vw;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
    height: 60px;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    transition: 0.4s all ease;
}

.left-side-nav {
    display: flex;
    height: 60px;
    width: 300px;
    justify-content: space-between;
    padding-left: 120px;
    align-items: center;
    list-style: none;
}

.list-item {
    font-weight: normal;
    opacity: 0.7;
}

.list-item.active {
    font-weight: bold;
    opacity: 1;
}

.right-side-nav {
    width: 500px;
    padding-right: 120px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.search-result {
    display: flex;
    padding: 20px;
}


.result-data-nav {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    align-items: center;
}

.anime-image-nav {
    width: 60px;
    height: 90px;
    border-radius: 6px;
    margin-right: 12px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.result-text-nav {
    display: flex;
    flex-direction: column;
}

.result-title-nav {
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 6px;
}

.result-date-nav {
    color: #999999;
    font-size: 12px;
}



.search {
    height: 40px;
    padding: 0 20px;
    border-radius: 20px;
    background-color: #16151A;
    display: flex;
    align-items: center;
    justify-content: center;
}

#search-field {
    width: 80px;
    color: white;
    background-color: transparent;
    height: 40px;
    outline: none;
    border: none;
    transition: 0.3s all ease;
}

#search-field:focus {
    width: 200px;
}

.search-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}


.searchSuggestions {
    width: 320px;
    height: 0px;
}

.searchSuggestions.display {
    height: 180px;
    width: 300px;
    top: 54px;
    border-radius: 12px;
    position: absolute;
    background-color: #16151A;
    overflow-y: scroll;
    transition: 0.3s all ease;
}

.avatar {
    width: 40px;
    margin-left: 20px;
    aspect-ratio: 1;
    border-radius: 20px;
    background-color: red;
}

.featured-content {
    place-items: center;
    width: calc(100vw - 8px);
    height: 700px;
    overflow: hidden;
}

.clipper {
    position: absolute;
    width: calc(100vw - 8px);
    height: 700px;
    overflow: hidden;
}

.iframe-wrapper {
    width: calc(100vw - 8px);
    aspect-ratio: 16/9;
    overflow: hidden;
}

.iframe-class {
    width: 300%;
    height: 100%;
    margin-left: -100%;
}

.gradient {
    width: calc(100vw - 8px);
    height: 700px;
    position: absolute;
    background: linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 0.9) 72.92%, #16151A 100%);
}

.featured-details {
    width: 600px;
    height: 700px;
    position: absolute;
    padding-left: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h3 {
    font-size: 16px;
    font-weight: normal;
    padding-bottom: 8px;
}

h2 {
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 8px;
}

.title {
    font-size: 52px;
    padding-bottom: 20px;
}

.description-home {
    font-size: 14px;
    font-weight: normal;
    width: 40vw;
}

.red-text {
    color: #DC1623;
    font-weight: bold;
}
</style>