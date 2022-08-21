<template>
    <div style="display: flex; justify-content: space-between;">
        <div class="left-side">
            <div class="video-wrapper">
                <Artplayer class="artplayer" @get-instance="getInstance" :option="option" :style="style" />
                <div class="subtitles">
                    <h2 class="subtitle-shadow"></h2>
                    <h2 class="subtitle-text"></h2>
                </div>
                <div class="gradient-controls"></div>
                <div class="custom-controls">
                    <div class="bottom-controls">

                        <svg class="play-button" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512">
                            <path fill="white"
                                d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                        </svg>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <div class="time-text">
                            00:00 / 00:00
                        </div>
                        <svg class="volume-button" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512">
                            <path fill="white"
                                d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z" />
                        </svg>
                        <svg class="expand-button" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path fill="white"
                                d="M128 32H32C14.31 32 0 46.31 0 64v96c0 17.69 14.31 32 32 32s32-14.31 32-32V96h64c17.69 0 32-14.31 32-32S145.7 32 128 32zM416 32h-96c-17.69 0-32 14.31-32 32s14.31 32 32 32h64v64c0 17.69 14.31 32 32 32s32-14.31 32-32V64C448 46.31 433.7 32 416 32zM128 416H64v-64c0-17.69-14.31-32-32-32s-32 14.31-32 32v96c0 17.69 14.31 32 32 32h96c17.69 0 32-14.31 32-32S145.7 416 128 416zM416 320c-17.69 0-32 14.31-32 32v64h-64c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c17.69 0 32-14.31 32-32v-96C448 334.3 433.7 320 416 320z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div v-if="this.anilistJson != null" class="episode-info">
                <div class="top-info">
                    <div class="title-wrapper">

                        <div class="anime-title">
                            {{ anilistJson.title.english }}
                        </div>
                        <div v-if="anilistJson.episodes[episodeNumber - 1].title != null" class="episode-title">
                            {{ anilistJson.episodes[episodeNumber -
                                    1].description.title
                            }}
                        </div>
                    </div>
                    <div class="episode-number">
                        Episode {{ episodeNumber }}
                    </div>
                </div>
                <div class="spacer"></div>
                <div class="description">
                    {{ anilistJson.episodes[episodeNumber - 1].description != null ? anilistJson.episodes[episodeNumber
                            -
                            1].description : 'This is Episode ' + episodeNumber + ' of ' + anilistJson.title.english
                    }}
                </div>
            </div>
        </div>
        <div class="right-side">
            <h1 class="episode-list-title">
                Next Episodes
            </h1>
            <div v-if="this.anilistJson != null" v-for="episode in anilistJson.episodes" class="episode-list">
                <div v-if="episode.number > episodeNumber" class="episode-card" v-on:click="loadEpisode(episode)">
                    <div class="image-wrapper">
                        <img class="episode-bg" :src="episode.image">
                        <div class="episode-gradient"></div>
                        <h3 class="episode-number-text">{{ episode.number }}</h3>
                    </div>
                    <div class="episode-info-wrapper">
                        <div class="episode-title-text">
                            {{ episode.title != null ? episode.title : 'Episode ' + episode.number }}
                        </div>
                        <div class="episode-title-text"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Artplayer from "../../../components/Artplayer.vue";
import Hls from 'hls.js';

export default {
    data() {
        return {
            option: {
                url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                customType: {
                    m3u8: function (video, url) {
                        if (Hls.isSupported()) {
                            const hls = new Hls();
                            hls.loadSource(url);
                            hls.attachMedia(video);
                        } else {
                            const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
                            if (canPlay === 'probably' || canPlay == 'maybe') {
                                video.src = url;
                            } else {
                                art.notice.show = 'Does not support playback of m3u8';
                            }
                        }
                    },
                },
                autoPlayback: true,
                subtitle: {
                    url: 'https://cc.zorores.com/9c/69/9c69e8bbd17a0bb4d9fa56b66b6ef3a0/eng-2.vtt',
                    type: 'vtt',
                    encoding: 'utf-8',
                    style: {
                        color: '#ffffff',
                        'font-size': '30px',
                        'text-shadow': 'rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px'
                    },
                },
            },
            style: {
                width: "78vw",
                height: "70vh",
            },
            anilistJson: null,
            episodeNumber: 0,
            streamingData: null,
            artPlayer: null
        };
    },
    components: {
        Artplayer,
    },
    methods: {
        async loadEpisode(episode) {
            await navigateTo('/stream/' + this.anilistJson.id + '/' + this.anilistJson.title.english.toLowerCase().replaceAll(' ', '-') + '-ep-' + episode.number)
        },
        getInstance(art) {

            art.on('ready', async (...args) => {
                this.$el.querySelector('.art-bottom').style.display = 'none'
                this.$el.querySelector('.art-state').style.display = 'none'
                this.$el.querySelector('.art-notice').style.display = 'none'

                await this.fetch()
                art.switchUrl(this.streamingData.sources[0].url, '')

                setTimeout(() => {
                    art.subtitle.url = this.streamingData.subtitles[0].url;
                }, 100);

                var subtitle = this.$el.querySelector('.art-subtitle').style.display = 'none'
                var subtitle = this.$el.querySelector('.art-layers').style.display = 'none'

                var controls = this.$el.querySelector('.custom-controls')
                var gradient = this.$el.querySelector('.gradient-controls')


                controls.addEventListener('mouseover', (event) => {
                    controls.style.opacity = '1'
                    gradient.style.opacity = '1'
                });
                controls.addEventListener('mouseout', (event) => {
                    controls.style.opacity = '0'
                    gradient.style.opacity = '0'
                });

                this.$el.querySelector('.play-button').addEventListener("click", function () {
                    art.toggle();
                })
            });

            art.on('video:timeupdate', () => {
                var progress_indicattion = this.$el.querySelector('.progress')
                var time_text = this.$el.querySelector('.time-text')

                var minutes = Math.floor(art.currentTime / 60);
                var seconds = Math.floor(art.currentTime - minutes * 60);

                var current_time_text = (minutes < 10 ? "0" : "") + minutes + ':' + (seconds < 10 ? "0" : "") + seconds

                var minutes = Math.floor(art.duration / 60);
                var seconds = Math.floor(art.duration - minutes * 60);

                var duration_text = (minutes < 10 ? "0" : "") + minutes + ':' + (seconds < 10 ? "0" : "") + seconds


                time_text.innerHTML = current_time_text + ' / ' + duration_text

                progress_indicattion.style.width = ((Math.round(art.currentTime) / Math.floor(art.duration)) * 100) + '%'

                var subtitle = this.$el.querySelector('.art-subtitle')
                var new_sub = this.$el.querySelector('.subtitle-text')
                var new_sub_shadow = this.$el.querySelector('.subtitle-shadow')
                if (subtitle.firstChild != undefined) {
                    subtitle.firstChild.innerHTML = subtitle.firstChild.innerHTML.replace('&lt;i&gt;', '<i>').replace('&lt;/i&gt;', '</i>')
                    new_sub.innerHTML = subtitle.firstChild.innerHTML
                    new_sub_shadow.innerHTML = subtitle.firstChild.innerHTML
                } else {
                    new_sub.innerHTML = ''
                    new_sub_shadow.innerHTML = ''
                }
            });
        },
        async fetch() {

            console.log(this.$route.path.replace("/stream/", ""))

            var parameters = this.$route.path.replace("/stream/", "").split('/')
            this.episodeNumber = parameters[1].split('-ep-')[1]

            this.anilistJson = await fetch('https://consumet-api.herokuapp.com/meta/anilist/info/' + parameters[0] + '?provider=zoro').then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            });


            this.streamingData = await fetch('https://consumet-api.herokuapp.com/anime/zoro/watch?episodeId=' + this.anilistJson.episodes[this.episodeNumber - 1].id).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            });
        },
    },
};
</script>

<style>
.left-side {
    margin: 0;
    padding: 0;
    width: 78vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}

.video-wrapper {
    width: 78vw;
    height: 70vh;
    margin: 40px;
    margin-bottom: 0px;
    box-shadow: 0px 0px 15px 5px black;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
}

.artplayer {

    position: absolute;
    border-radius: 12px;
    overflow: hidden;
}

.subtitles {
    border-radius: 12px;
    overflow: hidden;
    z-index: 25;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 78vw;
    height: 70vh;
    bottom: calc(30vh + 20px);
    font-family: 'Trebuchet MS';
}

.subtitle-shadow {
    padding-left: 2px;
    margin-top: 2px;
    font-size: 30px;
    color: black;
    text-shadow: rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px;
}

.subtitle-text {
    position: absolute;
    font-size: 30px;
    color: white;
    text-shadow: rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px;
}

.gradient-controls {
    position: absolute;
    z-index: 21;
    border-radius: 12px;
    width: 78vw;
    height: 70vh;
    transition: 0.3s all ease;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%);
}

.custom-controls {
    border-radius: 12px;
    overflow: hidden;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 78vw;
    height: 70vh;
    transition: 0.3s all ease;
}

.bottom-controls {
    width: 78vw;
    margin: 30px 60px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.play-button {
    margin-right: 50px;
}

.progress-bar {
    height: 8px;
    border-radius: 4px;
    width: 100%;
    background-color: white;
}

.progress {
    height: 8px;
    border-radius: 4px;
    width: 50%;
    background-color: #FF4242;
}

.time-text {
    font-weight: 400;
    font-size: 14px;
    width: 124px;
    color: white;
    margin-left: 40px;
}

.volume-button,
.expand-button {
    margin-left: 40px;
}

.top-info {
    display: flex;
    justify-content: space-between;
}

.episode-info {
    margin: 20px 40px;
    width: 78vw;
}

.anime-title {
    font-weight: bold;
    font-size: 36px;
    color: white;
}

.episode-number {
    font-weight: bold;
    font-size: 32px;
    color: #999999;
}

.spacer {
    height: 3px;
    width: 100%;
    margin: 20px 0;
    border-radius: 1.5px;
    background-color: #3a383d;
}

.description {
    font-size: 18px;
    font-weight: 400;
    color: white;
    padding-left: 20px;
}

.right-side {
    margin: 0;
    padding-left: 40px;
    padding: 0;
    width: 26vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.episode-list-title {
    margin-top: 50px;
    font-size: 28px;
    margin-bottom: 30px;
}


.image-wrapper {
    width: 240px;
    aspect-ratio: 16/9;
    display: flex;
    justify-content: flex-end;
}

.episode-bg {
    position: absolute;
    width: 240px;
    aspect-ratio: 16/9;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
    background-position: 0;
    background-repeat: no-repeat;
    object-fit: cover;
    border-radius: 12px;
    display: flex;
    justify-content: flex-end;
}

.episode-gradient {
    position: absolute;
    border-radius: 12px;
    width: 240px;
    aspect-ratio: 16/9;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
}

.episode-number-text {
    padding: 8px 12px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    z-index: 5;
}

.episode-title-text {
    color: #999999;
    font-size: 16px;
    padding-left: 8px;
    margin-top: 4px;
    margin-bottom: 10px;
    width: 240px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
}
</style>