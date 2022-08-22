<template>
    <div class="info-wrapper">
        <img v-if="anime != null" ref="bg" class="bg" :src="anime.cover">
        <div class="gradient-info"></div>
        <div class="overall-wrapper">
            <div class="details-wrapper">
                <div class="poster-wrapper">
                    <img v-if="anime != null" ref="poster_image" class="poster-image" :src="anime.image">
                    <h1 v-if="anime != null" class="rating">Rating: {{ anime.rating / 10 }} / 10</h1>
                    <h1 v-if="anime != null" class="released">Released : {{ anime.releaseDate }}</h1>
                </div>
                <div v-if="anime != null" class="info-wrapper">
                    <h1 class="duration">{{ anime.duration }} min / Episode</h1>
                    <h1 class="status">Episodes: <span class="red-text">{{ anime.totalEpisodes }}</span> -
                        Status: <span class="red-text">{{ anime.status }}</span></h1>
                    <h1 class="title">{{ anime.title.english }}</h1>
                    <h1 class="title-native">{{ anime.title.native }}</h1>
                    <p class="description"><span v-html="anime.description"></span></p>
                </div>
            </div>
            <div class="lower-part">
                <div class="genre-list">
                    <div v-if="anime != null" class="genre" v-for="genre in anime.genres" v-html="genre">
                    </div>
                </div>
            </div>
            <div v-my-directive class="info-episode-list">
                <div class="loading-wrapper" v-html="loadingHtml">
                </div>
                <div v-if="episodeList != null && episodeList.length > 0" v-for="episode in episodeList"
                    class="episode-card-info" ref="episodeCardInfo" v-on:click="loadEpisode(episode, anime)">
                    <div class="image-wrapper-info">
                        <img v-on:load="animateList(self)" class="episode-bg-info" :src="episode.image">
                        <div class="episode-gradient-info"></div>
                        <h3 class="episode-number-text-info">{{ episode.number }}</h3>
                    </div>
                    <div class="episode-info-wrapper-info">
                        <div class="episode-title-text-info">
                            {{ episode.title ?? 'Episode ' + episode.number }}
                        </div>
                        <div class="episode-title-text-info"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>
import { useFetch, useHead, useRoute } from '#app';

const route = useRoute();

console.log('testing')

var id = route.path.replace("/info/", "");
var episodeNumber = 1;
var loadingHtml = ref('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
var episodeList = ref([]);
var loadedEpisodes = false;

const { error, data: episodes } = await useFetch('https://consumet-api.herokuapp.com/meta/anilist/data/' + id, { key: id });
if (error.value || !episodes.value) {
    throw createError({ statusCode: 404, message: "Episode not found" })
}

var anime = null

function loadAnime() {
    if (episodes.value) {
        anime = episodes.value;
    }
}
loadAnime()

watch(episodes, () => {
    loadAnime()
})

function animateList(element) {
    console.log(document.querySelectorAll('.episode-card-info'))
    if (!loadedEpisodes) {

        console.log(document.querySelectorAll('.episode-card-info'))
        for (var index in document.querySelectorAll('.episode-card-info')) {
            document.querySelectorAll('.episode-card-info').style.transitionDelay = index / 6 + 's'
            document.querySelectorAll('.episode-card-info').classList.add('loaded')

        }
        loadedEpisodes = true
    }
}

const vMyDirective = {
    mounted: async (el) => {

        var id = route.path.replace("/info/", "");

        console.log('GETTING EPISODES')

        const { episodeError, data: episodeResponse } = await useFetch('https://consumet-api.herokuapp.com/meta/anilist/episodes/' + id + '?provider=zoro', { key: 'episodes' + id });
        function loadEpisodes() {
            if (episodeResponse.value) {
                loadingHtml.value = '';
                episodeList.value = episodeResponse.value;
            }
        }
        loadEpisodes()

        watch(episodeResponse, () => {
            loadEpisodes()
        })
    },
}

watch(episodeList, () => {
    console.log(episodeList)
})

async function loadEpisode(episode, anime) {
    await navigateTo('/stream/' + anime.id + '/' + anime.title.english.toLowerCase().replaceAll(' ', '-') + '-ep-' + episode.number)
}

useHead({
    title: `Info of ${anime.title.english}`,
    meta: [
        {
            name: "og:title",
            content: `${anime.title.english}`
        },
        {
            name: "og:type",
            content: "website"
        },
        {
            name: "og:url",
            content: `https://inu.watch/info/${anime.id}`
        },
        {
            name: "og:image",
            content: anime.cover || anime.image
        },
        {
            name: "og:description",
            content: `${anime.description}`
        },
        {
            name: "twitter:card",
            content: "summary_large_image"
        },
        {
            name: "theme-color",
            content: anime.color ?? '#000000'
        }
    ]
});
</script>

<style>
.loading-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}


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
    object-fit: cover;
    object-position: center;
    filter: blur(8px);
}

.gradient-info {
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
    flex-direction: row;
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
    transform: scale(0.0);
    transition: 0.4s ease all;
}

.episode-card-info.loaded {
    transform: scale(1.0);
    transition: 0.4s ease all;
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