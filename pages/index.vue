<template>
  <div class="body" v-scroll-directive>
    <header class="navbar">
      <div class="right-side">
        <div class="search-wrapper" v-on:click="openSearchBar()">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="white"
              d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </svg>
          <form class="search-form" @submit.stop.prevent="goToSearch">
            <input class="search" type="search" autocomplete="off" placeholder="Search..." ref="search" name="search"
              id="search-field" v-model="animeName">
          </form>
        </div>
        <img class="circle-avatar" src="https://i.pinimg.com/736x/53/e5/0e/53e50e5daa1b426d420c3437c90cf3dd.jpg">
      </div>
    </header>
    <div class="featured-content">
      <img class="featured-image" :src="(featuredAnime[currentFeaturedIndex].cover as string)" alt="feature image">
      <div class="featured-gradient"></div>
      <div class="featured-details">
        <div class="featured-duration">{{ featuredAnime[currentFeaturedIndex].duration }} min / Episode</div>
        <div class="featured-episodes">Episodes: <span class="red-text">{{
        featuredAnime[currentFeaturedIndex].totalEpisodes }}</span> - Status: <span class="red-text">{{
            featuredAnime[currentFeaturedIndex].status }}</span></div>
        <div class="featured-title">{{ (featuredAnime[currentFeaturedIndex].title as ITitle).english }}</div>
        <p class="featured-description" v-html="featuredAnime[currentFeaturedIndex].description"></p>
        <div class="button-wrapper">
          <div class="info-button">
            <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="white"
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            INFO
          </div>
          <div class="add-button">
            <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="white"
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            <div class="add-text">My List</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recently-released">
      Recently Released
      <div class="recent-list">
        <div class="recent-anime-wrapper" v-for="recentAnime in recentlyReleasedAnime"
          v-on:click="goToEpisode(recentAnime)">
          <img class="recent-image" :src="recentAnime.image" alt="">
          <div class="recent-title">{{ (recentAnime.title as ITitle).english }}</div>
          <div class="recent-number">Episode {{ recentAnime.episodeNumber }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="github-wrapper">
        <img class="github-icon" src="../images/github-icon.png" alt="">
        InumakiEU
      </div>
      <div class="disclaimer-text">
        Inu's Stream does not store any files on our server, we only linked to the media which is hosted on 3rd party
        services.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// IMPORTS
import { useHead } from '#app';
import { META, ANIME } from '@consumet/extensions';
import { IAnimeResult, ITitle } from '@consumet/extensions/dist/models/types';
import Anilist from '@consumet/extensions/dist/providers/meta/anilist';
import { Ref } from 'vue';

// VARIABLES

const ANILIST: Anilist = new META.Anilist(new ANIME.Zoro());
const featuredAnime: IAnimeResult[] = (await ANILIST.fetchTrendingAnime()).results;
const recentlyReleasedAnime: IAnimeResult[] = (await ANILIST.fetchRecentEpisodes()).results;

let currentFeaturedIndex: number = 0;
let animeName: Ref<String> = ref('');

// DIRECTIVES

let vScrollDirective = {
  beforeMount() {
    window.addEventListener('scroll', handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', handleScroll)
  },
}

// FUNCTIONS

function handleScroll() {
  var nav_bar = document.documentElement.querySelector('.navbar') as HTMLElement | null;
  if (window.scrollY >= 150) {
    nav_bar.style.backgroundColor = 'black';

  } else {
    nav_bar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)';
    nav_bar.style.backgroundColor = 'transparent';
  }
};

function openSearchBar() {
  console.log('SEARCHING');
  if (process.client && innerWidth <= 500) {
    let searchbar = document.querySelector('.search-form') as HTMLElement | null;
    console.log(searchbar);
    searchbar.style.display = 'flex';
    searchbar.style.width = '100%';
  }
};

async function goToSearch() {
  if (process.client)
    await navigateTo('/search/' + animeName.value.toLowerCase().replaceAll(' ', '-'), { replace: false })
};

async function goToEpisode(episodeJson: IAnimeResult) {
  if (process.client)
    await navigateTo('/stream/' + episodeJson.id.toString() + '/' + ((episodeJson.title as ITitle).english ?? (episodeJson.title as ITitle).romaji).toLowerCase().replaceAll(' ', '-') + '-ep-' + episodeJson.episodeNumber.toString(), { replace: false })
};

// META TAGS

useHead({
  title: `Inu's Stream`,
  meta: [
    {
      name: "og:title",
      content: `Inu's Stream`
    },
    {
      name: "og:type",
      content: "website"
    },
    {
      name: "og:url",
      content: `https://inu.watch/`
    },
    {
      name: "og:image",
      content: "https://i.imgur.com/7Hz4LEi.jpeg"
    },
    {
      name: "og:description",
      content: `Stream anime without annoying ads.`
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "theme-color",
      content: '#16151A'
    }
  ]
});
</script>

<style scoped lang="scss">
$mobile: 500px;

.body {
  background-color: #16151A;
  width: calc(100vw - 8px);
  height: 100vh;
  margin: 0;
  padding: 0;
}

.red-text {
  color: #DC1623;
  font-weight: bold;
}

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

.navbar {
  position: fixed;
  width: calc(100vw - 8px);
  height: 80px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
  transition: 0.4s background ease;

  & .right-side {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    width: 100%;
    transition: 0.4s background ease;

    & .search-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: #16151A;
      padding: 12px 12px;
      border-radius: 50px;
      margin-left: 20px;

      & .search-icon {
        width: 20px;
        aspect-ratio: 1 / 1;
        margin-right: 12px;
        pointer-events: none;
      }

      & .search-form {
        max-height: 20px;
        width: 80px;

        & .search {
          height: 20px;
          border-radius: 20px;
          background-color: #16151A;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        & #search-field {
          width: 100%;
          color: white;
          background-color: transparent;
          height: 20px;
          outline: none;
          border: none;
          transition: 0.3s all ease;

          &:focus {
            width: 300px;
          }
        }
      }
    }

    & .circle-avatar {
      width: 50px;
      aspect-ratio: 1 / 1;
      border-radius: 25px;
      object-fit: cover;
      object-position: center;
      margin-right: 20px;
    }
  }

  @media screen and (max-width: $mobile) {
    & .right-side {
      justify-content: space-between;

      & .search-wrapper {
        & .search-icon {
          margin-right: 0;
        }

        & .search-form {
          display: none;
        }
      }
    }
  }
}

.featured-content {
  width: calc(100vw - 8px);
  height: 70vh;
  overflow: hidden;
  position: relative;

  & .featured-image {
    position: absolute;
    width: 100%;
    height: 99%;
    object-fit: cover;
    object-position: center;
    filter: blur(2px);
  }

  & .featured-gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(22, 21, 26, 0.7) 56%, rgba(22, 21, 26, 1) 100%);
  }

  & .featured-details {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    margin-left: 80px;
    color: white;
    height: 90%;
    transition: 0.4s all ease;

    & .featured-duration {
      font-size: 16px;
    }

    & .featured-episodes {
      font-size: 20px;
    }

    & .featured-title {
      font-size: 38px;
      font-weight: bold;
      margin-bottom: 12px;
      transition: 0.4s all ease;
    }

    & .featured-description {
      display: -webkit-box;
      -webkit-line-clamp: 16;
      line-clamp: 16;
      -webkit-box-orient: vertical;
      overflow-y: hidden;
      max-width: 700px;
      transition: 0.4s all ease;
    }

    & .button-wrapper {
      display: flex;
      justify-content: flex-start;
      margin: 0px 20px;
      margin-top: 20px;
      margin-bottom: 30px;

      & .info-button {
        padding: 8px 16px;
        background-color: #1AAEFE;
        width: auto;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        gap: 12px;
        transition: 0.4s all ease;

        & .info-icon {
          width: 24px;
          aspect-ratio: 1 / 1;
        }

        &:hover {
          box-shadow: 0px 0px 14px 0px #1aaefed4;
          cursor: pointer;
        }
      }

      & .add-button {
        padding: 8px 16px;
        background-color: black;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin-left: 20px;

        & .add-icon {
          width: 24px;
          aspect-ratio: 1 / 1;
        }

        & .add-text {
          font-weight: bold;
          display: flex;
        }
      }
    }

    @media screen and (max-width: $mobile) {
      margin-left: 20px;
      margin-right: 20px;

      & .featured-duration {
        font-size: 10px;
      }

      & .featured-episodes {
        font-size: 14px;
      }

      & .featured-title {
        font-size: 24px;
        margin-bottom: 6px;
      }

      & .featured-description {
        font-size: 14px;
        font-weight: 400;
        -webkit-line-clamp: 10;
        line-clamp: 10;
      }

      & .button-wrapper {
        justify-content: space-between;


        & .add-button {
          padding: 8px;
          margin-left: 0;

          & .add-text {
            display: none;
          }
        }
      }
    }
  }
}

.recently-released {
  font-size: 32px;
  color: white;
  font-weight: bold;
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 30px;
  transition: 0.4s all ease;
  overflow: hidden;

  & .recent-list {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    margin-bottom: 40px;
    height: fit-content;
    overflow-x: scroll;

    & .recent-anime-wrapper {
      color: #999999;
      cursor: pointer;

      & .recent-image {
        width: 180px;
        height: 260px;
        border-radius: 24px;
        object-fit: cover;
        object-position: center;
      }

      & .recent-title {
        width: 180px;
        font-size: 16px;
        font-weight: 500;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow-y: hidden;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        text-overflow: ellipsis;
        margin-bottom: 6px;
      }

      & .recent-number {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 16px;
      }
    }
  }

  @media screen and (max-width: $mobile) {
    font-size: 24px;
    margin-left: 20px;
    margin-right: 20px;

    & .recent-list {
      gap: 20px;

      & .recent-anime-wrapper {
        & .recent-image {
          width: 140px;
          height: 200px;
          border-radius: 12px;
        }

        & .recent-title {
          width: 140px;
          font-size: 14px;
          margin-bottom: 6px;
        }

        & .recent-number {
          font-size: 10px;
          margin-bottom: 16px;
        }
      }
    }
  }
}

.footer {
  background-color: black;
  padding: 12px 24px;
  color: white;
  text-align: center;
  font-size: 14px;
  padding-bottom: 24px;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 90px;

  & .github-wrapper {
    position: absolute;
    left: 20px;
    display: flex;
    gap: 12px;
    color: #8e8d8c;
    justify-content: center;
    align-items: center;
    justify-self: center;

    & .github-icon {
      width: 56px;
      aspect-ratio: 1 / 1;
    }
  }

  & .disclaimer-text {
    position: absolute;
    max-width: 700px;
    width: 50vw;
  }

  @media screen and (max-width: $mobile) {
    flex-direction: column;
    height: 140px;

    & .github-wrapper {
      margin-bottom: 12px;
      position: relative;
    }

    & .disclaimer-text {
      position: relative;
    }
  }
}
</style>