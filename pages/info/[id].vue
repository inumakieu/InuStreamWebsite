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
			<div class="tabs-wrapper">
				<div class="extra-info-tab-wrapper">
					<h1 class="extra-info-title">Synonyms:</h1>
					<div class="extra-info-item-wrapper" v-for="synonym in animeInfo.synonyms">
						<div class="extra-info-item">
							{{ synonym }}
						</div>
					</div>
					<h1 class="extra-info-title">Country of Origin:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ new Intl.DisplayNames(['en'], {type: 'region'}).of(animeInfo.countryOfOrigin as string)
							}}
						</div>
					</div>
					<h1 class="extra-info-title">Format:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ animeInfo.type }}
						</div>
					</div>
					<h1 class="extra-info-title">Studios:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item" v-for="studio in animeInfo.studios">
							{{ studio }}
						</div>
					</div>
					<h1 class="extra-info-title">Duration:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ animeInfo.duration }}
						</div>
					</div>
					<h1 class="extra-info-title">Episodes:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ animeInfo.totalEpisodes }}
						</div>
					</div>
					<h1 class="extra-info-title">Status:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ animeInfo.status.toUpperCase() }}
						</div>
					</div>
					<h1 class="extra-info-title">Released in:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ animeInfo.releaseDate }}
						</div>
					</div>
					<h1 class="extra-info-title">Season:</h1>
					<div class="extra-info-item-wrapper">
						<div class="extra-info-item">
							{{ animeInfo.season }}
						</div>
					</div>
				</div>
				<div class="episode-tab-wrapper">
					<p class="description" v-html="animeInfo.description"></p>
					<div class="genre-and-next-episode-wrapper">
						<div class="genre-wrapper">
							<div class="genre" v-for="genre in animeInfo.genres">{{ genre }}</div>
						</div>
						<div v-if="animeInfo.nextAiringEpisode != null" class="next-episode-indicator">
							Episode {{ (animeInfo.nextAiringEpisode as {'airingTime':
							number, 'timeUntilAiring': number, 'episode': number}).episode }}:
							<br>
							{{ secondsToDhms((animeInfo.nextAiringEpisode as {'airingTime':
							number, 'timeUntilAiring': number, 'episode': number}).timeUntilAiring) }}
						</div>
					</div>
					<h1 class="episode-text">Episodes</h1>
					<div class="episode-list">
						<span class="loader"></span>
						<div class="episode-wrapper" v-for="episode in episodeList" v-on:click="goToEpisode(episode)">
							<img class="episode-image"
								:src="'https://images.weserv.nl/?url=' + (episode.image as string)" alt="">
							<div class="episode-info">
								<h2 class="episode-title">{{ episode.title }}</h2>
								<h2 class="episode-number">Episode {{ episode.number }}</h2>
							</div>
						</div>
					</div>
				</div>
				<div class="character-tab-wrapper">
					<div class="character-info-wrapper" v-for="character in animeInfo.characters">
						<div class="voice-actor-image-wrapper">
							<img class="character-image" :src="character.image ?? ''" alt="">
							<div class="voice-actor-text">{{ character.role ?? "" }}</div>
						</div>
						<div class="character-text-wrapper">
							<div class="character-detail-wrapper">
								<div class="character-name">{{ character.name ? character.name.userPreferred : "" }}
								</div>
								<div class="character-name-native">{{ character.name ? character.name.native : ""}}
								</div>
							</div>
							<div class="voice-actor-detail-wrapper">
								<div class="voice-actor-name">{{ character.voiceActors[0] ?
								character.voiceActors[0].name.userPreferred : "" }}
								</div>
							</div>
						</div>
						<div class="voice-actor-image-wrapper">
							<img class="voice-actor-image"
								:src="character.voiceActors[0] ? character.voiceActors[0].image : ''" alt="">
						</div>
					</div>
				</div>
				<div class="related-tab-wrapper">
					<div class="related-anime-wrapper" v-for="related in animeInfo.relations"
						v-on:click="goToInfo(related.id)">
						<img class="related-anime-image" :src="related.image" alt="">
						<div class="related-anime-info-wrapper">
							<div class="related-anime-type">{{ (related.relationType as string) }}
							</div>
							<div class="related-title-wrapper">
								<div class="related-anime-title">{{ (related.title as ITitle).english }}
								</div>
								<div class="related-anime-title-native">{{ (related.title as
								ITitle).native }}</div>
							</div>
							<div class="related-bottom-wrapper">
								<div class="related-anime-type">{{ related.status }}</div>
								<div class="related-anime-type">{{ related.type }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mobile-spacer"></div>
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
let animeInfo: IAnimeInfo = await ANILIST.fetchAnilistInfoById(id);
let episodeList = ref([]);

// FUNCTIONS

onMounted(async () => {
	const {
		episodeError,
		data: episodeResponse
	} = await useFetch('https://consumet-api.herokuapp.com/meta/anilist/episodes/' + id + '?provider=zoro', { key: 'episodes' + id });


	function loadEpisodes() {
		if (episodeResponse.value && episodeList.value.length == 0) {
			let loader = document.querySelector('.loader') as HTMLElement;
			let episodeListElement = document.querySelector('.episode-list') as HTMLElement;
			episodeListElement.style.justifyContent = 'flex-start';
			loader.style.display = 'none';

			episodeList.value = episodeResponse.value;
		}
	}

	loadEpisodes()

	watch(episodeResponse, () => {
		loadEpisodes()
	});
});

async function goToEpisode(episode: IAnimeEpisode) {
	await navigateTo('/stream/' + animeInfo.id + '/' + ((animeInfo.title as ITitle).english ? (animeInfo.title as ITitle).english.toLowerCase().replaceAll(' ', '-') : (animeInfo.title as ITitle).native.toLowerCase().replaceAll(' ', '-')) + '-ep-' + episode.number);
}

async function goToInfo(id: string) {
	console.log("RELATED MOVE");
	await navigateTo('/info/' + id);
}

function changeTab(index) {
	let tabWrapper = document.querySelector('.tabs-wrapper') as HTMLElement;
	let currentTab = document.querySelector('.navbar-list').children[index] as HTMLElement;
	let width = currentTab.offsetWidth + 2;
	let x = currentTab.offsetLeft + 10;
	console.log({ x });
	let tabIndicator = document.querySelector('.selected-tab') as HTMLElement;
	tabIndicator.style.width = width + 'px';
	tabIndicator.style.paddingLeft = '0';
	tabIndicator.style.paddingRight = '0';
	tabIndicator.style.left = x + 'px';
	if (index == 0) {
		tabWrapper.style.transform = 'translateX(0%)';
	} else if (index == 1) {
		tabWrapper.style.transform = 'translateX(-100%)';
	} else if (index == 2) {
		tabWrapper.style.transform = 'translateX(-200%)';
	} else if (index == 3) {
		tabWrapper.style.transform = 'translateX(-300%)';
	}
	//tabWrapper.style.height = '659px';
}

function secondsToDhms(seconds: number) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);

	if (d > 0) {
		return d > 0 ? d + (d == 1 ? " day, " : " days ") : "";
	} else {
		return h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
	}
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

.loader {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	position: relative;
	animation: rotate 1s linear infinite
}

.loader::before {
	content: "";
	box-sizing: border-box;
	position: absolute;
	inset: 0px;
	border-radius: 50%;
	border: 5px solid #FFF;
	animation: prixClipFix 2s linear infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg)
	}
}

@keyframes prixClipFix {
	0% {
		clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
	}

	25% {
		clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
	}

	50% {
		clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
	}

	75% {
		clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
	}

	100% {
		clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
	}
}

.body {
	background-color: #16151A;
	width: calc(100vw - 8px);
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow-x: hidden;
}

.cover-image {
	width: 100%;
	height: calc(50vh - 1px);
	object-fit: cover;
	object-position: center;
	transition: 0.3s all ease;
	position: absolute;

	@media screen and (max-width: $mobile) {
		height: calc(60vh - 1px);
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
	width: 100vw;
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

			& .english-title {
				text-align: center;
			}

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

	& .tabs-wrapper {
		display: flex;
		justify-content: flex-start;
		transition: 0.4s all ease;
		position: relative;

		& .extra-info-tab-wrapper {
			width: 220px;
			height: fit-content;
			margin: 30px;
			background-color: #1E222C;
			padding: 20px;
			border-radius: 12px;

			& .extra-info-title {
				width: 100%;
				font-size: 18px;
				margin-bottom: 10px;
			}

			& .extra-info-item-wrapper {
				& .extra-info-item {
					width: 180px;
					margin-left: 4px;
					padding: 0px 12px;
					margin-bottom: 10px;
					border-radius: 10px;
					background-color: transparent;
					transition: 0.3s all ease;
					color: #999999;
					font-weight: 500;
					font-size: 16px;
				}
			}
		}

		& .episode-tab-wrapper {
			width: 60vw;
			margin: 30px;
			margin-left: 0px;

			& .description {
				background-color: #1E222C;
				padding: 16px;
				text-align: start;
				font-size: 16px;
				margin-bottom: 30px;
				border-radius: 20px;
			}

			& .genre-and-next-episode-wrapper {
				margin-bottom: 20px;
				display: flex;
				justify-content: space-between;

				& .genre-wrapper {
					display: flex;
					gap: 10px;
					width: 54vw;
					margin-right: 20px;
					overflow-x: scroll;

					&::-webkit-scrollbar {
						width: 8px;
						height: 8px;
						z-index: 99;
						display: none;
					}

					& .genre {
						background-color: black;
						padding: 10px 18px;
						border-radius: 40px;
						font-weight: bold;
						font-size: 14px;
					}
				}

				& .next-episode-indicator {
					background-color: #EE4546;
					border-radius: 16px;
					padding: 10px 18px;
					text-align: center;
					font-weight: bold;
					font-size: 12px;
					width: 80px;
				}
			}

			& .episode-text {
				font-size: 32px;
				font-weight: bold;
				margin-bottom: 20px;
			}

			& .episode-list {
				width: 100%;
				display: flex;
				margin-right: 30px;
				flex-direction: row;
				overflow-x: scroll;
				justify-content: center;
				align-items: flex-start;
				overflow-y: hidden;
				height: 260px;

				&::-webkit-scrollbar-track {
					background: transparent;
				}

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
						width: 90%;
						padding: 0 10px;
						display: flex;
						flex-direction: column;
						justify-content: center;

						& .episode-title {
							padding-top: 10px;
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
		}

		& .character-tab-wrapper {
			width: 360px;
			margin: 30px;
			margin-left: 0px;
			margin-right: 0px;
			display: flex;
			align-items: flex-end;
			flex-direction: column;
			height: 540px;
			overflow-y: scroll;
			position: relative;

			&::-webkit-scrollbar-track {
				background: transparent;
			}

			& .character-info-wrapper {
				background-color: #1E222C;
				margin-bottom: 12px;
				height: 90px;
				padding: 0;
				width: 18vw;
				border-radius: 10px;
				display: flex;
				justify-content: space-between;

				& .character-image {
					position: absolute;
					width: 60px;
					height: 90px;
					object-fit: cover;
					object-position: center;
					border-radius: 10px;
				}

				& .voice-actor-image {
					position: absolute;
					width: 60px;
					height: 90px;
					object-fit: cover;
					object-position: center;
					border-radius: 10px;
				}

				& .voice-actor-image-wrapper {
					position: relative;
					width: 60px;
					height: 90px;



					& .voice-actor-text {
						position: absolute;
						width: 60px;
						height: 86px;
						border-radius: 8px;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						font-size: 0.4vw;
						font-weight: bold;
						padding-bottom: 4px;
						background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
					}
				}

				& .character-text-wrapper {
					background-color: #1E222C;
					width: calc(18vw - 120px);
					text-align: center;
					height: fit-content;
					overflow-y: unset;

					& .background-role {
						position: absolute;
						width: calc(18vw - 120px);
						height: 90px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 74px;
						font-weight: bold;
						text-align: center;
						overflow: hidden;
						background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						background-clip: text;
					}

					& .character-detail-wrapper {
						position: absolute;
						width: calc(18vw - 120px);
						height: 90px;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;
						margin-left: 12px;

						& .character-name {
							position: relative;
							font-size: 16px;
							font-weight: bold;
						}

						& .character-name-native {
							position: relative;
							font-size: 10px;
							font-weight: regular;
							font-family: 'Zen Maru Gothic';
						}
					}

					& .voice-actor-detail-wrapper {
						width: calc(18vw - 120px);
						height: 90px;
						position: absolute;
						display: flex;
						justify-content: flex-end;
						align-items: flex-end;

						& .voice-actor-name {
							font-size: 12px;
							color: #999999;
							padding-right: 12px;
							padding-bottom: 12px;
							font-weight: bold;
						}
					}


				}
			}
		}

		& .related-tab-wrapper {
			margin: 30px;
			width: calc(100vw - 12px);
			position: relative;
			border-radius: 12px;

			& .related-anime-wrapper {
				display: flex;
				margin-bottom: 20px;

				& .related-anime-image {
					object-fit: cover;
					object-position: center;
					width: 100px;
					height: auto;
					border-radius: 12px;
					margin-right: 12px;
				}

				& .related-anime-info-wrapper {
					display: flex;
					flex-direction: column;
					width: calc(100vw - 100px - 60px - 12px);
					justify-content: space-between;
					margin: 10px 0;
					font-size: 14px;
					font-weight: bold;


					& .related-title-wrapper {
						display: flex;
						flex-direction: column;

						& .related-anime-title-native {
							font-size: 10px;
							font-weight: bold;
							color: #999999;
							font-family: 'Zen Maru Gothic';
						}
					}

					& .related-bottom-wrapper {
						display: flex;
						justify-content: space-between;
						width: 94%;
					}
				}
			}
		}
	}



	@media screen and (max-width: $mobile) {
		& .tabs-wrapper {
			transform: translateX(-100%);

			& .extra-info-tab-wrapper {
				width: calc(100vw - 60px);
				margin: 30px;

				& .extra-info-item-wrapper {
					width: calc(100vw - 100px);

					& .extra-info-item {
						width: 100%;
					}
				}
			}

			& .episode-tab-wrapper {
				width: 100vw;
				margin-left: 30px;

				& .description {
					width: calc(100vw - 90px);
					text-align: center;
					font-size: 14px;
					border-radius: 12px;
				}

				& .genre-and-next-episode-wrapper {
					height: 60px;
					width: calc(100vw - 60px);
					display: flex;
					align-items: center;

					& .genre-wrapper {
						height: 40px;
						width: 60%;
					}

					& .next-episode-indicator {
						width: 70px;
					}
				}

				& .episode-text {
					font-size: 24px;
				}

				& .episode-list {
					flex-direction: column;
					margin-bottom: 0;
					overflow-x: hidden;
					height: fit-content;
					align-items: flex-start;

					& .episode-wrapper {
						flex-direction: row;

						& .episode-image {
							width: 126px;
						}
					}
				}
			}

			& .character-tab-wrapper {
				width: 100vw;
				height: fit-content;
				flex-direction: column;
				margin-left: 30px;
				position: static;
				align-items: flex-start;

				& .character-info-wrapper {
					width: calc(100vw - 66px);
					position: static;
					min-height: 90px;
					background-color: red;

					& .voice-actor-image-wrapper {
						position: static;

						& .voice-actor-text {
							font-size: 2vw;
						}
					}

					& .voice-actor-image {
						position: absolute;
						width: 60px;
						height: 90px;
						object-fit: cover;
						object-position: center;
						background-color: red;
					}

					& .character-text-wrapper {
						position: static;
						width: calc((100vw - 66px) - 120px);

						& .background-role {
							width: calc((100vw - 66px) - 120px);
						}

						& .character-detail-wrapper {
							width: calc((100vw - 66px) - 120px);
						}

						& .voice-actor-detail-wrapper {
							width: calc((100vw - 66px) - 120px);
						}
					}
				}
			}

			& .related-tab-wrapper {
				position: static;
				margin-left: 100vw;
			}
		}


	}
}

.mobile-spacer {

	height: 80px;
}

.bottom-nav-bar {
	position: fixed;
	bottom: -100px;
	left: 0;
	width: calc(100vw - 60px);
	height: 70px;
	margin: 20px;
	background-color: black;
	border-radius: 12px;
	padding-right: 20px;
	transition: 0.3s all ease;

	& .selected-tab {
		position: absolute;
		background-color: #1E222C;
		width: 20%;
		height: 50%;
		left: calc(12px + 25%);
		top: 25%;
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
		width: calc(100vw - 60px);

		& .navbar-item {
			background-color: transparent;
			border-radius: 50px;
			font-size: 3vw;
			width: 20%;
			height: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media screen and (max-width: $mobile) {
		bottom: 0;
	}
}
</style>