<template>
    <div class="body">
        <img class="cover-image" :src="(animeInfo.cover as string)" alt="">
        <div class="cover-gradient"></div>
        <div class="info-wrapper">
            <div class="top-wrapper">
                <div class="poster-wrapper">
                    <img class="poster-image" :src="animeInfo.image" alt="">
                </div>
                <div class="title-wrapper">
                    <h1 class="english-title">{{ (animeInfo.title as ITitle).english }}</h1>
                    <h1 class="native-title">{{ (animeInfo.title as ITitle).native }}</h1>
                </div>
            </div>
            <p class="description" v-html="animeInfo.description"></p>
            <h1 class="episode-text">Episodes</h1>
            <div class="episode-list">
                <div class="episode-wrapper" v-for="episode in episodeList" v-on:click="goToEpisode(episode)">
                    <img class="episode-image" :src="(episode.image as string)" alt="">
                    <div class="episode-info">
                        <h2 class="episode-title">{{ episode.title }}</h2>
                        <h2 class="episode-number">Episode {{ episode.number }}</h2>
                    </div>
                </div>
            </div>
        </div>
		<div class="bottom-nav-bar">
			<div class="selected-tab"></div>
			<ul class="navbar-list">
				<li class="navbar-item" v-on:click="changeTab(0)">More Info</li>
				<li class="navbar-item" v-on:click="changeTab(1)">Episodes</li>
				<li class="navbar-item" v-on:click="changeTab(2)">Characters</li>
				<li class="navbar-item" v-on:click="changeTab(3)">Related</li>
			</ul>
		</div>
    </div>
</template>

<script setup lang="ts">
// IMPORTS
import { useFetch, useHead } from '#app';
import { META, ANIME } from '@consumet/extensions';
import { IAnimeInfo, ITitle, IAnimeEpisode } from '@consumet/extensions/dist/models/types';
import Anilist from '@consumet/extensions/dist/providers/meta/anilist';

// VARIABLES
const route = useRoute();
let id: string = route.path.replace("/info/", "").replace('/', '');

const ANILIST: Anilist = new META.Anilist(new ANIME.Zoro());
const animeInfo: IAnimeInfo = await ANILIST.fetchAnilistInfoById(id);
let episodeList = ref([]);
const {
    episodeError,
    data: episodeResponse
} = await useFetch('https://consumet-api.herokuapp.com/meta/anilist/episodes/' + id + '?provider=zoro', { key: 'episodes' + id });

function loadEpisodes() {
    if (episodeResponse.value) {
        episodeList.value = episodeResponse.value;
    }
}

loadEpisodes()

watch(episodeResponse, () => {
    loadEpisodes()
});

async function goToEpisode(episode: IAnimeEpisode) {
    await navigateTo('/stream/' + animeInfo.id + '/' + ((animeInfo.title as ITitle).english ? (animeInfo.title as ITitle).english.toLowerCase().replaceAll(' ', '-') : (animeInfo.title as ITitle).native.toLowerCase().replaceAll(' ', '-')) + '-ep-' + episode.number);
}

function changeTab(index) {
	let currentTab = document.querySelector('.navbar-list').children[index] as HTMLElement;
	let width = currentTab.offsetWidth - 8;
	let x = currentTab.offsetLeft;
	console.log({x});
	let tabIndicator = document.querySelector('.selected-tab') as HTMLElement;
	tabIndicator.style.width = width + 'px';
	tabIndicator.style.paddingLeft = '0';
	tabIndicator.style.paddingRight = '0';
	tabIndicator.style.left = x + 'px';
}

useHead({
    title: `Info of ${(animeInfo.title as ITitle).english ?? (animeInfo.title as ITitle).native}`,
    meta: [
        {
            name: "og:title",
            content: `${(animeInfo.title as ITitle).english ?? (animeInfo.title as ITitle).native}`
        },
        {
            name: "og:type",
            content: "website"
        },
        {
            name: "og:url",
            content: `https://inu.watch/info/${animeInfo.id}`
        },
        {
            name: "og:image",
            content: animeInfo.cover || animeInfo.image
        },
        {
            name: "og:description",
            content: `${animeInfo.description}`
        },
        {
            name: "twitter:card",
            content: "summary_large_image"
        },
        {
            name: "theme-color",
            content: animeInfo.color ?? '#000000'
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

.cover-image {
    width: 100%;
    height: calc(50vh - 1px);
    object-fit: cover;
    object-position: center;
    transition: 0.3s all ease;
    position: absolute;

    @media screen and (max-width: $mobile) {
        height: 60vh;
    }
}

.cover-gradient {
    width: 100%;
    height: 50vh;
    background: linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 1) 100%);
    transition: 0.3s all ease;
    position: absolute;

    @media screen and (max-width: $mobile) {
        height: 60vh;
    }
}

.info-wrapper {
    position: absolute;
    width: 100%;
    overflow-x: hidden;

    & .top-wrapper {
        position: relative;
        height: 62vh;
        color: white;
        display: flex;
        font-size: 20px;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        margin-left: 60px;
        transition: 0.3s all ease;

        & .poster-wrapper {

            & .poster-image {
                width: 140px;
                aspect-ratio: 0.64150943396;
                object-fit: cover;
                object-position: center;
                border-radius: 20px;
                margin-bottom: 20px;
                margin-right: 20px;
            }
        }

        & .title-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 9vh;

            & .native-title {
                font-size: 18px;
                font-family: 'Zen Maru Gothic';
            }
        }



        @media screen and (max-width: $mobile) {
            font-size: 12px;
            height: 68vh;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            margin-left: 0;

            & .poster-wrapper {
                & .poster-image {
                    margin-right: 0;
                }
            }


            & .title-wrapper {
                align-items: center;
                padding-bottom: 0;

                & .native-title {
                    font-size: 14px;
                    font-family: 'Zen Maru Gothic';
                }
            }
        }
    }

    & .description {
        background-color: #1E222C;
        padding: 16px;
        text-align: start;
        font-size: 16px;
        margin: 30px;
        border-radius: 20px;
    }

    & .episode-text {
        font-size: 32px;
        font-weight: bold;
        margin-left: 30px;
        margin-bottom: 20px;
    }

    & .episode-list {
        display: flex;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        overflow-x: scroll;

        & .episode-wrapper {
            display: flex;
            margin-bottom: 20px;
            flex-direction: column;

            & .episode-image {
                width: 260px;
                aspect-ratio: 16 / 9;
                border-radius: 12px;
                margin-right: 12px;
            }

            & .episode-info {
                font-size: 10px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                & .episode-title {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow-y: hidden;
                }

                & .episode-number {
                    font-size: 12px;
                    color: #999999;
                    margin-top: 6px;
                }
            }
        }
    }

    @media screen and (max-width: $mobile) {
        & .description {
            text-align: center;
            font-size: 14px;
            border-radius: 12px;
        }

        & .episode-text {
            font-size: 24px;
        }

        & .episode-list {
            flex-direction: column;
            margin-bottom: 0;
            overflow-x: hidden;

            & .episode-wrapper {
                flex-direction: row;

                & .episode-image {
                    width: 126px;
                }
            }
        }
    }
}

.bottom-nav-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: calc(100vw - 40px);
	height: 70px;
	margin: 20px;
	background-color: black;
	border-radius: 12px;

	& .selected-tab {
		position: absolute;
		background-color: #1E222C;
		width: 80px;
		height: 36px;
		left: 0;
		margin-top: 17px;
		margin-left: 14px;
		border-radius: 18px;
		transition: 0.3s all ease;
	}

	& .navbar-list {
		position: absolute;
		text-decoration: none;
		list-style: none;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 100%;
		margin: 0 10px;

		& .navbar-item {
			background-color: transparent;
			padding: 10px 16px;
			border-radius: 50px;
			font-size: 3vw;
		}
	}
}
</style>