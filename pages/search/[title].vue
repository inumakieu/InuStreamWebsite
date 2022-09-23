<template>
    <div>
        <div class="search-bar">
            <div class="back-button">
                <svg width="22px" height="22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="white"
                        d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                </svg>
            </div>
            <form onchange="console.log('changed!')">

                <input class="search-input" type="text" placeholder="Search for an anime..." name="anime_name"
                    id="anime_name" v-model="animeName" v-on:input="searchAnime">
            </form>
        </div>
        <div class="search-results">
            <div ref="result_data" class="result-data" v-for="anime in searchJson" v-bind:key="anime.id">
                <img class="anime-image" :src="anime.image" v-on:click="goToInfo(anime.id)" alt="">
                <div class="result-text">
                    <h1 class="result-title">
                        {{ anime.title.userPreferred }}
                    </h1>
                    <h2 class="result-date">

                        {{ anime.releaseDate }}
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'https://fonts.googleapis.com/css?family=Inter';

export default {
    data: () => ({
        animeName: null,
        searchJson: null
    }),
    methods: {
        async fetch() {
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
        },
        async goToInfo(id) {
            await navigateTo('/info/' + id, { replace: false })
        }
    },
    beforeMount() {
        this.animeName = this.$route.params.title.replaceAll('-', ' ')
        this.fetch()
    },
}
</script>

<style>
.search-bar {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.back-button {
    background-color: black;
    width: 46px;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 8px;
    margin-right: 40px;
}

.search-input {
    width: 80vw;
    font-size: 32px;
    color: white;
    background-color: transparent;
    outline: none;
    border: none;
}

.search-results {
    padding-left: 120px;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
}

.result-data {
    display: flex;
    margin-bottom: 30px;
    align-items: center;
}

.anime-image {
    width: 150px;
    height: 210px;
    border-radius: 12px;
    margin-right: 30px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.result-text {
    display: flex;
    flex-direction: column;
}

.result-title {
    margin-bottom: 20px;
}

.result-date {
    color: #999999;
}
</style>