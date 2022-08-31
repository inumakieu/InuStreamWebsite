<template>
    <div class="info-page-wrapper">
        <img v-if="anime != null" ref="bg" class="bg" :src="anime.cover">
        <div class="gradient-info"></div>
        <div class="overall-wrapper">
            <div class="details-wrapper">
                <div class="row-wrapper">
                    <div class="left-side-row">

                        <div class="poster-wrapper">
                            <img v-if="anime != null" ref="poster_image" class="poster-image" :src="anime.image">
                            <h1 v-if="anime != null" class="rating">Rating: {{  anime.rating / 10  }} / 10</h1>
                            <h1 v-if="anime != null" class="released">Released : {{  anime.releaseDate  }}</h1>
                        </div>
                        <div v-if="anime != null" class="info-wrapper">
                            <h1 class="duration">{{  anime.duration  }} min / Episode</h1>
                            <h1 class="status">Episodes: <span class="red-text">{{  anime.totalEpisodes  }}</span> -
                                Status: <span class="red-text">{{  anime.status  }}</span></h1>
                            <h1 class="title">{{  anime.title.english  }}</h1>
                            <h1 class="title-native">{{  anime.title.native  }}</h1>
                            <p class="description"><span v-html="anime.description"></span></p>
                        </div>
                        <div class="studio-wrapper">
                            <h2 class="studios-top-title">Studios:</h2>
                            <div v-for="studio in anime.studios" class="studio-name-wrapper">
                                <h2 class="studio-name-text">{{  studio  }}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="right-side-row">
                        <div class="right-side-wrapper">
                            <h1 class="characters-title">Characters</h1>
                            <div class="character-list-wrapper">
                                <div v-for="character in anime.characters" class="characters-list">
                                    <div class="character-wrapper">
                                        <div class="character-image-wrapper">
                                            <img class="character-image" :src="character.image">
                                        </div>
                                        <div class="character-details-wrapper">
                                            <div class="character-role">{{  character.role  }}</div>
                                            <div class="character-name">{{  character.name.userPreferred  }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 class="related-title">Related Anime</h1>
                            <div class="related-list-wrapper">
                                <div v-for="related in anime.relations" class="characters-list">
                                    <div class="related-wrapper" v-on:click="goToInfo(related.id)">
                                        <div class="related-image-wrapper">
                                            <img class="related-image" :src="related.cover">
                                        </div>
                                        <div class="related-details-wrapper">
                                            <div class="character-role">{{  related.relationType.replaceAll('_', ' ')  }}
                                            </div>
                                            <div class="related-name">{{  related.title.userPreferred  }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lower-part">
                <div class="genre-list">
                    <div v-if="anime != null" class="genre" v-for="genre in anime.genres" v-html="genre">
                    </div>
                </div>
            </div>
            <h1 class="episodes-title">Episodes</h1>
            <div v-my-directive class="info-episode-list" :ref="episodeListRef">
                <div class="loading-wrapper" v-html="loadingHtml">
                </div>
                <div v-if="episodeList != null && episodeList.length > 0" v-for="episode in episodeList"
                    class="episode-card-info">
                    <div class="image-wrapper-info">
                        <img class="episode-bg-info" :src="episode.image">
                        <div class="episode-gradient-info"></div>
                        <h3 class="episode-number-text-info">{{  episode.number  }}</h3>
                        <div class="play-episode-button" v-on:click="streamEpisode(episode, anime)">
                            <svg class="play-button-icon" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="white"
                                    d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                            </svg>
                        </div>
                    </div>
                    <div class="episode-info-wrapper-info">
                        <div class="episode-title-text-info">
                            {{  episode.title ?? 'Episode ' + episode.number  }}
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

var id = route.path.replace("/info/", "").replace('/', '');
var episodeNumber = 1;
var charactersIndex = ref(0);
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


async function goToInfo(id) {
    await navigateTo('/info/' + id, { replace: false, key: id })
};

function animateList() {
    var cards = document.querySelectorAll('.episode-card-info');
    console.log('ANIMATING');
    if (!loadedEpisodes) {

        console.log(cards)
        for (var index in cards) {
            if (cards[index] != null) {
                cards[index].style.transitionDelay = index / 10 + 's'
                cards[index].classList.add('loaded')
            }

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
                setTimeout(() => {
                    var cards = document.querySelectorAll('.episode-card-info');
                    console.log('ANIMATING');
                    if (!loadedEpisodes) {

                        console.log(cards)
                        for (var index in cards) {
                            if (cards[index] != null) {
                                cards[index].style.transitionDelay = index / 5 + 's'
                                cards[index].classList.add('loaded')
                            }

                        }

                        loadedEpisodes = true
                    }

                }, "100")

            }
        }
        loadEpisodes()

        watch(episodeResponse, () => {
            loadEpisodes()
        })
        console.log('SCROLL LOADED')
        var slider = document.querySelector('.info-episode-list');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            console.log('DOWNNNN')
            isDown = true;
            slider.classList.add('active')
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        })

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active')
        })

        slider.addEventListener('mouseup', () => {
            isDown = false;
            e.preventDefault();
            slider.classList.remove('active')
        })

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = x - startX;
            slider.scrollLeft = scrollLeft - walk;
        })

    },
}

watch(episodeList, () => {
    console.log(episodeList)
})

async function streamEpisode(episode, anime) {
    console.log('GOING TO EPISODE')
    await navigateTo('/stream/' + anime.id + '/' + (anime.title.english ? anime.title.english.toLowerCase().replaceAll(' ', '-') : anime.title.native.toLowerCase().replaceAll(' ', '-')) + '-ep-' + episode.number)
}

useHead({
    title: `Info of ${anime.title.english ?? anime.title.native}`,
    meta: [
        {
            name: "og:title",
            content: `${anime.title.english ?? anime.title.native}`
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

<style scoped>
.play-episode-button {
    position: absolute;
    justify-content: center;
    align-items: center;
    margin-right: 125px;
    margin-top: calc(25% - 12.5px);
    width: 50px;
    height: 50px;
    display: flex;
    opacity: 0.0;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.3s all ease;
    z-index: 5;
}

.image-wrapper-info:hover>.play-episode-button {
    opacity: 1.0;
    transition: 0.3s all ease;
}

.play-button-icon {
    pointer-events: none;
}

.row-wrapper {
    width: 100vw;
    height: 63vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left-side-row {
    display: flex;
}

.studio-wrapper {
    padding-left: 80px;
    height: 36vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.studio-name-text {
    margin: 0;
    padding: 0;
    font-size: 32px;
    color: white;
    font-weight: bold;
}

.studios-top-title {
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: black;
    font-weight: bold;
}

.episodes-title {
    font-size: 32px;
    font-weight: bold;
    color: white;
    margin-left: 120px;
    margin-top: 20px;
}


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
    display: none;
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
    height: 63vh;
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

.right-side-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: flex-end;
    margin-right: 60px;
    width: 16vw;
}

.character-wrapper:hover {
    position: relative;
    width: 140px;
    height: 210px;
    border-radius: 20px;
    margin-right: 20px;
    overflow: hidden;
    color: black;
    transition: 0.4s all ease;
}

.character-wrapper {
    position: relative;
    width: 110px;
    height: 170px;
    border-radius: 12px;
    margin-right: 20px;
    overflow: hidden;
    color: black;
    transition: 0.4s all ease;
}

.related-title {
    margin-top: 10px;
    padding: 0;
}

.characters-title {
    margin-top: 80px;
    padding: 0;
}

.related-list-wrapper {
    width: 20vw;
    height: 170px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    align-items: center;
}

.character-list-wrapper {
    width: 20vw;
    height: 230px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    align-items: center;
}

.character-wrapper:hover>.character-image-wrapper>.character-image {
    width: 140px;
    height: 210px;
    border-radius: 20px;
    object-fit: cover;
    object-position: center;
    transition: 0.4s all ease;
}

.character-wrapper>.character-image-wrapper>.character-image {
    width: 110px;
    height: 170px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center;
    transition: 0.4s all ease;
}

.character-image-wrapper {
    position: absolute;
    overflow: hidden;
}



.character-name {
    width: 110px;
    height: 40px;
    background-color: black;
    color: white;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    transition: 0.4s all ease;
    text-overflow: ellipsis;
}

.character-wrapper:hover>.character-details-wrapper>.character-name {
    width: 140px;
    font-size: 12px;
    transition: 0.4s all ease;
}

.character-details-wrapper {
    position: absolute;
    width: 110px;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    transition: 0.4s all ease;
}

.character-details-wrapper:hover {
    width: 140px;
    height: 210px;
    transition: 0.4s all ease;
}

.character-role {
    border-radius: 0 0 0 8px;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    background-color: black;
    color: white;
}

.related-wrapper {
    position: relative;
    width: 150px;
    height: 90px;
    margin-right: 20px;
    border-radius: 12px;
    overflow: hidden;
    transition: 0.4s all ease;
}

.related-wrapper:hover {
    width: 190px;
    height: 120px;
    transition: 0.4s all ease;
}

.related-details-wrapper {
    position: absolute;
    width: 150px;
    height: 90px;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    transition: 0.4s all ease;
}

.related-wrapper:hover>.related-details-wrapper {
    width: 190px;
    height: 120px;
    transition: 0.4s all ease;
}

.related-image-wrapper {
    position: absolute;
    overflow: hidden;
}

.related-image {
    width: 150px;
    height: 90px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center;
    transition: 0.4s all ease;
}

.related-wrapper:hover>.related-image-wrapper>.related-image {
    width: 190px;
    height: 120px;
    border-radius: 20px;
    transition: 0.4s all ease;
}

.related-name {
    width: 150px;
    height: 30px;
    padding: 4px 12px;
    text-align: center;
    background-color: black;
    color: white;
    font-size: 8px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    transition: 0.4s all ease;
    text-overflow: ellipsis;
}

.related-wrapper:hover>.related-details-wrapper>.related-name {
    width: 190px;
    height: 40px;
    transition: 0.4s all ease;
}

.info-wrapper {
    width: 36vw;
    align-self: center;
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
}

.episode-number-text-info {
    position: relative;
    justify-self: flex-end;
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