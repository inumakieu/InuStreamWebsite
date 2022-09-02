<template>
  <div v-custom-directive class="info-wrapper-new">
    <img v-if="anime != null" class="bg-new" :src="anime.cover">
    <div class="info-gradient"></div>
    <div class="info-detail-wrapper">
      <div class="top-main-info-wrapper">
        <div class="left-top-info-wrapper">
          <div class="poster-image-wrapper">
            <img v-if="anime != null" class="poster-image-new" :src="anime.image">
            <div class="poster-gradient"></div>
            <div class="poster-text-details">
              <h2 class="rating-text">Rating: {{ (anime.rating / 10) }} / 10</h2>
              <h2 class="release-text">Released: {{ anime.releaseDate }}</h2>
            </div>
          </div>
        </div>
        <div class="title-top-wrapper">
          <h1 class="anime-title">{{ anime.title.english }}</h1>
          <h1 class="anime-title-romaji">{{ anime.title.native }}</h1>
        </div>
      </div>
      <div class="bottom-main-info-wrapper">
        <div v-if="showLeftBar" class="left-side-info-wrapper">
          <div class="detail-left-wrapper">
            Studios:
            <div class="studio-column" v-for="studio in anime.studios">
              <div class="studio-name">{{ studio }}</div>
            </div>
          </div>
          <div class="detail-left-wrapper">
            Duration:
            <div class="studio-column">
              <div class="studio-name">{{ anime.duration }}</div>
            </div>
          </div>
          <div class="detail-left-wrapper">
            Episodes:
            <div class="studio-column">
              <div class="studio-name">{{ anime.totalEpisodes }}</div>
            </div>
          </div>
          <div class="detail-left-wrapper">
            Season:
            <div class="studio-column">
              <div class="studio-name">{{ anime.season }}</div>
            </div>
          </div>
          <div class="detail-left-wrapper">
            Released:
            <div class="studio-column">
              <div class="studio-name">{{ anime.releaseDate }}</div>
            </div>
          </div>
          <div class="detail-left-wrapper">
            Genre:
            <div class="studio-column" v-for="genre in anime.genres">
              <div class="studio-name">{{ genre }}</div>
            </div>
          </div>
        </div>
        <div class="right-main-info-wrapper">
          <div class="description-related-wrapper">
            <p class="anime-description" v-html="anime.description"></p>
            <div v-if="!isMobile" class="related-column-wrapper">
              <h1 class="related-title">Related Anime</h1>
              <div class="related-list-wrapper">
                <div v-for="related in anime.relations" class="characters-list">
                  <div class="related-wrapper" v-on:click="goToInfo(related.id)">
                    <div class="related-image-wrapper">
                      <img class="related-image" :src="related.cover">
                    </div>
                    <div class="related-details-wrapper">
                      <div class="character-role">{{ related.relationType.replaceAll('_', ' ') }}
                      </div>
                      <div class="related-name-wrapper">
                        <div class="related-name">{{ related.title.userPreferred }}</div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div class="episode-detail-wrapper">
                  <div class="watched">WATCHED</div>
                  <div class="episode-bottom-wrapper">

                    <div class="episode-title-wrapper">{{ episode.title }}</div>
                  </div>
                </div>
                <h3 class="episode-number-text-info">{{ episode.number }}</h3>
                <div class="play-episode-button" v-on:click="streamEpisode(episode, anime)">
                  <svg class="play-button-icon" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 384 512">
                    <path fill="white"
                          d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notify">
      <div class="-ad-banner-">
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {useFetch, useHead, useRoute} from '#app';
import {META} from '@consumet/extensions';
import {IAnimeInfo} from "@consumet/extensions/dist/models";

const ANILIST = new META.Anilist();


const route = useRoute();

let innerW = ref(0);
let showLeftBar = ref(true);
let isMobile = ref(false)
if (process.client) {
  innerW.value = window.innerWidth
  window.addEventListener('resize', () => {
    console.log(window.innerWidth)
    innerW.value = window.innerWidth
    if (innerW.value > 900) {
      showLeftBar.value = true
      isMobile.value = false
    } else if (innerW.value <= 500) {
      isMobile.value = true
    } else if (innerW.value <= 900) {
      showLeftBar.value = false
    } else if (innerW.value > 500) {
      isMobile.value = false
    }
  });
}

let vCustomDirective = {
  onBeforeMount: () => {
    if (process.client) {
      innerW.value = window.innerWidth
      window.addEventListener('resize', () => {
        console.log(window.innerWidth)
        innerW.value = window.innerWidth
        if (innerW.value > 900) {
          showLeftBar.value = true
          isMobile.value = false
        } else if (innerW.value <= 500) {
          isMobile.value = true
        } else if (innerW.value <= 900) {
          showLeftBar.value = false
        } else if (innerW.value > 500) {
          isMobile.value = false
        }
      });
    }

  },
  mounted: () => {
    let notifier : Element = document.querySelector(".notify");
    if (notifier) {
      if (notifier.style.width == "1px") {
        alert('No AdBlocker');
      } else {
        alert('AdBlocker Detected');
      }
    }
  }
};

let id = route.path.replace("/info/", "").replace('/', '');
let episodeNumber = 1;
let charactersIndex = ref(0);
let loadingHtml = ref('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
let episodeList = ref([]);
let loadedEpisodes = false;

const episodes = await ANILIST.fetchAnilistInfoById(id);

let anime: IAnimeInfo = null

function loadAnime() {
  if (episodes) {
    anime = episodes;
  }
}

loadAnime()

watch(episodes, () => {
  loadAnime()
})


async function goToInfo(id) {
  await navigateTo('/info/' + id, {replace: false, key: id})
};

function animateList() {
  let cards = document.querySelectorAll('.episode-card-info');
  console.log('ANIMATING');
  if (!loadedEpisodes) {

    console.log(cards)
    for (let index in cards) {
      if (cards[index] != null) {
        cards[index].style.transitionDelay =  + `${(index / 10)}s`
        cards[index].classList.add('loaded')
      }

    }
    loadedEpisodes = true
  }
}


const vMyDirective = {
  mounted: async (el) => {

    let id = route.path.replace("/info/", "");

    console.log('GETTING EPISODES')

    const {
      episodeError,
      data: episodeResponse
    } = await useFetch('https://consumet-api.herokuapp.com/meta/anilist/episodes/' + id + '?provider=zoro', {key: 'episodes' + id});
    //const episodeResponse = await ANILIST.fetchEpisodesListById(id);
    console.log(episodeResponse.value);

    function loadEpisodes() {
      if (episodeResponse.value) {
        loadingHtml.value = '';
        episodeList.value = episodeResponse.value;
        setTimeout(() => {
          let cards = document.querySelectorAll('.episode-card-info');
          if (!loadedEpisodes) {
            for (let index in cards) {
              if (cards[index] != null) {
                cards[index].style.transitionDelay = index / 5 + 's'
                cards[index].classList.add('loaded')
              }

            }

            loadedEpisodes = true
          }

        }, 100)
      }
    }

    loadEpisodes()

    watch(episodeResponse, () => {
      loadEpisodes()
    })
    console.log('SCROLL LOADED')
    let slider = document.querySelector('.info-episode-list');
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
.-ad-banner- {
  width: 1px;
}

.info-wrapper-new {
  display: flex;
  position: relative;
  overflow-x: hidden;
}

.bg-new {
  width: 100vw;
  height: 60vh;
  position: absolute;
  object-fit: cover;
  object-position: center;
}

.info-gradient {
  width: 100vw;
  height: 60vh;
  position: absolute;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(22, 21, 26, 0.9) 70%, rgba(22, 21, 26, 1) 100%);
}

.top-main-info-wrapper {
  position: static;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100vw;
  height: 62vh;
  padding: 0 0 0 5vw;
}

.left-top-info-wrapper {
  position: relative;
  width: 20vh;
  aspect-ratio: 1/ 1.5;
  margin-right: 2vw;
}

.poster-image-wrapper {
  position: relative;
}

.poster-image-new {
  position: absolute;
  width: 100%;
  aspect-ratio: 1/ 1.5;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 2vh;
}

.poster-gradient {
  position: absolute;
  width: 100%;
  aspect-ratio: 1/ 1.5;
  border-radius: 1.8vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}

.poster-text-details {
  position: absolute;
  width: 100%;
  aspect-ratio: 1/ 1.5;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.rating-text {
  position: relative;
  color: white;
  font-weight: bold;
  font-size: 2.2vh;
  padding-bottom: 4px;
}

.release-text {
  position: relative;
  color: #999999;
  font-weight: bold;
  font-size: 1.5vh;
  padding-top: 0;
  padding-bottom: 12px;
}

.title-top-wrapper {
  position: relative;
  width: 80%;
  margin-right: 0;
  padding-right: 0;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.anime-title {
  width: 80%;
  font-weight: bold;
  font-size: 4vh;
  color: white;
}

.anime-title-romaji {
  width: 80%;
  font-weight: 500;
  font-size: 2.8vh;
  color: white;
}

.bottom-main-info-wrapper {
  margin-top: 40px;
  display: flex;
  width: 100vw;
  height: 900px;
}

.left-side-info-wrapper {
  width: 16vw;
  min-width: 12vw;
  height: fit-content;
  font-size: 1vw;
  background-color: #1f212b;
  border-radius: 20px;
  margin: 0 38px 0 40px;
  color: #B8B8B8;
  font-weight: bold;
  padding: 1.6vw;
}

.detail-left-wrapper {
  margin-bottom: 0.8vh;
}

.studio-column {
  font-size: 0.8vw;
  color: white;
  font-weight: 500;
  padding-left: 1.4vw;
  margin-top: 0.8vh;
}

.studio-name {
  padding: 6px 10px;
  border-radius: 1vh;
  margin-bottom: 1vh;
}

.studio-name:hover {
  background-color: #16151abb;
}

span {
  color: #C73030;
  font-weight: 600;
}

.right-main-info-wrapper {
  width: 100%;
  height: 100%;
}

.related-column-wrapper {
  width: 30vw;
}

.anime-description {
  width: 100%;
  height: fit-content;
  background-color: #1f212b;
  border-radius: 20px;
  padding: 4vh;
  font-size: 1.7vh;
  margin-right: 4vw;
}

.description-related-wrapper {
  display: flex;
}


/* 

OLD CSS

*/


.play-episode-button {
  position: absolute;
  justify-content: center;
  align-items: center;
  margin-right: 6.5vw;
  margin-top: 6vh;
  width: 3vw;
  aspect-ratio: 1 / 1;
  display: flex;
  opacity: 0.0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  transition: 0.3s all ease;
  z-index: 5;
}

.image-wrapper-info:hover > .play-episode-button {
  opacity: 1.0;
  transition: 0.3s all ease;
}

.play-button-icon {
  pointer-events: none;
  width: 1.2vw;
  aspect-ratio: 1 / 1;
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
  font-size: 4vh;
  font-weight: bold;
  color: white;
  margin-top: 5vh;
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
  font-size: 3vh;
  padding: 0;

}

.characters-title {
  margin-top: 80px;
  padding: 0;
}

.related-list-wrapper {
  width: 20vw;
  min-width: 20vw;
  height: 18vh;
  display: flex;
  gap: 2vw;
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

.character-wrapper:hover > .character-image-wrapper > .character-image {
  width: 140px;
  height: 210px;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
  transition: 0.4s all ease;
}

.character-wrapper > .character-image-wrapper > .character-image {
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

.character-wrapper:hover > .character-details-wrapper > .character-name {
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
  width: 10vw;
  aspect-ratio: 16/9;
  border-radius: 2vh;
  overflow: hidden;
  transition: 0.4s all ease;
}

.related-wrapper:hover {
  width: 13vw;
  aspect-ratio: 16/9;
  transition: 0.4s all ease;
}

.related-details-wrapper {
  position: absolute;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 2vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  transition: 0.4s all ease;
}

.related-image-wrapper {
  position: absolute;
  overflow: hidden;
}

.related-image {
  width: 10vw;
  aspect-ratio: 16/9;
  border-radius: 2vh;
  object-fit: cover;
  object-position: center;
  transition: 0.4s all ease;
}

.related-wrapper:hover > .related-image-wrapper > .related-image {
  width: 13vw;
  aspect-ratio: 16/9;
  border-radius: 3vh;
  transition: 0.4s all ease;
}

.related-name-wrapper {
  width: 100%;
  height: 40px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  transition: 0.4s all ease;
}

.related-name {
  margin-left: 10px;
  margin-right: 10px;
  width: 90%;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 8px;
  font-weight: bold;
  transition: 0.4s all ease;
  text-overflow: ellipsis;
}

.related-wrapper:hover > .related-details-wrapper > .related-name-wrapper {
  height: 50px;
  transition: 0.4s all ease;
}

.related-wrapper:hover > .related-details-wrapper > .related-name-wrapper > .related-name {
  font-size: 10px;
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
  width: 74vw;
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
  width: 16vw;
  aspect-ratio: 16/9;
  display: flex;
  justify-content: flex-end;
}

.episode-bg-info {
  position: absolute;
  width: 16vw;
  aspect-ratio: 16/9;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
  background-position: 0;
  background-repeat: no-repeat;
  object-fit: cover;
  border-radius: 2vh;
  display: flex;
  justify-content: flex-end;
}

.episode-detail-wrapper {
  position: absolute;
  width: 16vw;
  aspect-ratio: 16/9;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.watched {
  width: fit-content;
  padding: 0.5vh 1.2vw;
  font-weight: bold;
  border-radius: 2vh 0 1.5vh 0;
  background-color: black;
}

.episode-title-wrapper {
  display: -webkit-box;
  background-color: black;
  font-weight: 700;
  font-size: 1.4vh;
  max-height: 3.6vh;
  line-height: 1.8vh;
  padding: 10px 1.2vh;
  text-align: center;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  max-lines: 2;
  overflow-y: hidden;
  word-wrap: break-word;
}

.episode-bottom-wrapper {
  max-height: 10vh;
  overflow: hidden;
  border-radius: 0 0 2vh 2vh;
}

.episode-number-text-info {
  position: relative;
  padding: 8px 12px;
  font-size: 2.7vh;
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
  border-radius: 1.8vh;
  z-index: 3;
  width: 16vw;
  aspect-ratio: 16/9;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
}
</style>