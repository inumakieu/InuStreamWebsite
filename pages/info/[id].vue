<template>
    <div class="info-wrapper">
        <div ref="bg" class="bg"></div>
        <div class="gradient"></div>
        <div class="overall-wrapper">
            <div class="details-wrapper">
                <div class="poster-wrapper">
                    <div ref="poster_image" class="poster-image"></div>
                    <h1 v-if="anilistJson != null" class="rating">Rating: {{ this.anilistJson.rating / 10 }} / 10</h1>
                    <h1 v-if="anilistJson != null" class="released">Released : {{ this.anilistJson.releaseDate }}</h1>
                </div>
                <div v-if="anilistJson != null" class="info-wrapper">
                    <h1 class="duration">{{ this.anilistJson.duration }} min / Episode</h1>
                    <h1 class="status">Episodes: <span class="red-text">{{ this.anilistJson.episodes.length }}</span> -
                        Status: <span class="red-text">{{ this.anilistJson.status }}</span></h1>
                    <h1 class="title">{{ this.anilistJson.title.english }}</h1>
                    <h1 class="title-native">{{ this.anilistJson.title.native }}</h1>
                    <p class="description"><span v-html="anilistJson.description"></span></p>
                </div>
            </div>
            <div class="lower-part">

                <div class="genre-list">
                    <div v-if="anilistJson != null" class="genre" v-for="genre in anilistJson.genres" v-html="genre">
                    </div>
                </div>
            </div>
            <div class="info-episode-list">
                <div v-if="anilistJson != null" v-for="episode in anilistJson.episodes" class="episode-card-info"
                    v-on:click="loadEpisode(episode)">
                    <div class="image-wrapper-info">
                        <img class="episode-bg-info" :src="episode.image">
                        <div class="episode-gradient-info"></div>
                        <h3 class="episode-number-text-info">{{ episode.number }}</h3>
                    </div>
                    <div class="episode-info-wrapper-info">
                        <div class="episode-title-text-info">
                            {{ episode.title != null ? episode.title : 'Episode ' + episode.number }}
                        </div>
                        <div class="episode-title-text-info"></div>
                    </div>
                </div>
            </div>


        </div>
    </div>

</template>

<script>

export default {
    data: () => ({
        anilistID: null,
        anilistJson: null,
        airingTime: null
    }),
    beforeMount() {
        console.log(this.$route.params.id)
        this.anilistID = this.$route.params.id
        this.fetch()
    },
    methods: {
        async loadEpisode(episode) {
            await navigateTo('/stream/' + this.anilistJson.id + '/' + this.anilistJson.title.english.toLowerCase().replaceAll(' ', '-') + '-ep-' + episode.number)
        },
        async fetch() {
            /* this.anilistJson = await anilistProvider.fetchAnimeInfo(this.anilistID).then(function (data) {
                console.log(data)
                return data;
            }); */

            this.anilistJson = await fetch('https://consumet-api.herokuapp.com/meta/anilist/info/' + this.anilistID + '?provider=zoro').then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
            }).then(function (data) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                console.log(data)
                return data; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
            });


            this.$refs.bg.style.backgroundImage = 'url(' + this.anilistJson.cover + ')'
            this.$refs.poster_image.style.backgroundImage = 'url(' + this.anilistJson.image + ')'

        },
        getAiringTime() {
            if (this.anilistJson != null) {
                //console.log(Date.now())
                this.airingTime = this.anilistJson.nextAiringEpisode.timeUntilAiring
            }
        }
    },

    head: {
        title: 'Info of',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Home page description'
            }
        ],
    }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
    height: 8px;
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


.bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(8px);
}

.gradient {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 0.9) 72.92%, #16151A 100%);
}

.overall-wrapper {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.details-wrapper {
    width: 100vw;
    height: 70vh;
    display: flex;
    align-items: center;
}

.poster-wrapper {
    padding-left: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 40px;
}

.poster-image {
    width: 220px;
    height: 320px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 24px;
    margin-bottom: 12px;
    -webkit-box-shadow: 0px 0px 12px 5px #000000;
    box-shadow: 0px 0px 12px 5px #000000;
}

.rating {
    font-size: 26px;
}

.released {
    color: #999999;
    font-size: 18px;
}

.duration {
    font-size: 16px;
    font-weight: normal;
}

.status {
    font-size: 22px;
    font-weight: normal;
}

.title {
    font-size: 52px;
    padding: 0;
}

.title-native {
    margin-bottom: 12px;
}

.description {
    font-size: 14px;
    font-weight: 400;
    width: 800px;
}

.red-text {
    color: #DC1623;
    text-transform: uppercase;
}

.genre-list {
    display: flex;
    padding-left: 120px;
}

.genre {
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 0 30px;
    background-color: black;
    text-transform: uppercase;
    border-radius: 20px;
    align-items: center;
    margin-right: 20px;
}

.info-episode-list {
    display: flex;
    margin-left: 120px;
    width: 90vw;
    height: 230px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.image-wrapper-info {
    position: static;
    width: 300px;
    aspect-ratio: 16/9;
    display: flex;
    justify-content: flex-end;
}

.episode-number-text-info {
    position: relative;
    padding: 8px 12px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    z-index: 5;
}

.episode-card-info {
    position: relative;
    margin-top: 20px;
    padding-right: 30px;
}

.image-wrapper-info {
    position: relative;
    width: 300px;
    aspect-ratio: 16/9;
    display: flex;
    justify-content: flex-end;
}

.episode-bg-info {
    position: absolute;
    margin-left: 360px;
    width: 300px;
    aspect-ratio: 16/9;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
    background-position: 0;
    background-repeat: no-repeat;
    object-fit: cover;
    border-radius: 12px;
    display: flex;
    justify-content: flex-end;
}

.episode-number-text-info {
    position: relative;
    padding: 8px 12px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    z-index: 5;
}


.episode-title-text-info {
    position: relative;
    color: #999999;
    font-size: 16px;
    padding-left: 8px;
    margin-top: 4px;
    margin-bottom: 0;
    padding-bottom: 0;
    width: 240px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
}

.episode-gradient-info {
    position: absolute;
    margin-left: 30px;
    border-radius: 12px;
    z-index: 3;
    width: 300px;
    aspect-ratio: 16/9;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
}
</style>