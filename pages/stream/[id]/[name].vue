<template>
    <div class="body" id="container">
        <div class="video-wrapper-netflix">
            <Artplayer class="artplayer" @get-instance="getInstance" :option="option" :style="stylesObject" />
            <div class="subtitles">
                <h2 class="subtitle-shadow"></h2>
                <h2 class="subtitle-text"></h2>
            </div>
            <div class="gradient-controls"></div>
            <div class="custom-controls">

                <div class="bottom-controls">
                    <svg class="skip-back-button" width="40px" height="22px" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path fill="white"
                            d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z" />
                    </svg>
                    <div class="play-pause-wrapper">
                        <svg class="pause-button" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512">
                            <path fill="white"
                                d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                        </svg>
                        <svg class="play-button" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512">
                            <path fill="white"
                                d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                        </svg>
                    </div>
                    <svg class="skip-forward-button" width="40px" height="22px" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path fill="white"
                            d="M468.9 32.11c13.87 0 27.18 10.77 27.18 27.04v145.9c0 10.59-8.584 19.17-19.17 19.17h-145.7c-16.28 0-27.06-13.32-27.06-27.2c0-6.634 2.461-13.4 7.96-18.9l45.12-45.14c-28.22-23.14-63.85-36.64-101.3-36.64c-88.09 0-159.8 71.69-159.8 159.8S167.8 415.9 255.9 415.9c73.14 0 89.44-38.31 115.1-38.31c18.48 0 31.97 15.04 31.97 31.96c0 35.04-81.59 70.41-147 70.41c-123.4 0-223.9-100.5-223.9-223.9S132.6 32.44 256 32.44c54.6 0 106.2 20.39 146.4 55.26l47.6-47.63C455.5 34.57 462.3 32.11 468.9 32.11z" />
                    </svg>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <div class="time-text">
                        00:00 / 00:00
                    </div>
                    <svg class="volume-button" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512">
                        <path fill="white"
                            d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z" />
                    </svg>

                    <svg class="episodes-button" width="45" height="30" viewBox="0 0 54 39" fill="none"
                        xmlns="http://www.w3.org/2000/svg" v-on:click="episodeSelectorLogic()">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 14C1.34326 14 0 15.3431 0 17V36C0 37.6569 1.34326 39 3 39H37C38.6567 39 40 37.6569 40 36V17C40 15.3431 38.6567 14 37 14H3ZM26.5 26.866C27.1665 26.4811 27.1665 25.5189 26.5 25.134L17.5 19.9378C16.8335 19.5529 16 20.0341 16 20.8038V31.1962C16 31.9659 16.8335 32.4471 17.5 32.0622L26.5 26.866Z"
                            fill="white" />
                        <path
                            d="M10 7C10 7 7 7 7 9.5C7 12 10 12 10 12H39C40.6567 12 42 13.3431 42 15V29C42 29 42 32 44.5 32C47 32 47 29 47 29V10C47 8.34314 45.6567 7 44 7H10Z"
                            fill="white" />
                        <path
                            d="M17 0C17 0 14 0 14 2.5C14 5 17 5 17 5H46C47.6567 5 49 6.34314 49 8V22C49 22 49 25 51.5 25C54 25 54 22 54 22V3C54 1.34314 52.6567 0 51 0H17Z"
                            fill="white" />
                    </svg>

                    <svg class="next-episode-button" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"
                        v-on:click="loadEpisode(anime.episodes[parseInt(episodeNumber)])" viewBox="0 0 640 512">
                        <path fill="white"
                            d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z" />
                    </svg>

                    <svg class="expand-button" width="32px" height="32px" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="white"
                            d="M128 32H32C14.31 32 0 46.31 0 64v96c0 17.69 14.31 32 32 32s32-14.31 32-32V96h64c17.69 0 32-14.31 32-32S145.7 32 128 32zM416 32h-96c-17.69 0-32 14.31-32 32s14.31 32 32 32h64v64c0 17.69 14.31 32 32 32s32-14.31 32-32V64C448 46.31 433.7 32 416 32zM128 416H64v-64c0-17.69-14.31-32-32-32s-32 14.31-32 32v96c0 17.69 14.31 32 32 32h96c17.69 0 32-14.31 32-32S145.7 416 128 416zM416 320c-17.69 0-32 14.31-32 32v64h-64c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c17.69 0 32-14.31 32-32v-96C448 334.3 433.7 320 416 320z" />
                    </svg>
                </div>
            </div>
            <div class="intro-skip-mask">

                <div class="intro-skip-wrapper" v-on:click="skipIntro()">
                    Skip Opening
                </div>
            </div>
            <div class="episode-selector">
                <h1 class="episode-selector-title">Episodes</h1>
                <div class="episode-selector-list" v-if="anime != null">
                    <div class="episode-selector-card"
                        v-for="episode in anime.episodes.slice(episodeNumber, anime.episodes.length)"
                        v-on:click="loadEpisode(episode)">
                        <div class="episode-selector-wrapper">
                            <img class="episode-selector-image" :src="'https://images.weserv.nl/?url=' + episode.image"
                                alt="">
                            <div class="episode-selector-gradient"></div>
                            <div class="episode-selector-number">{{ episode.number }}</div>
                            <div class="episode-selector-name">{{ episode.title }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="error-popup">
                <div class="error-title-bar">
                    <div class="left-wrapper-error">
                        <div class="left-error-x">
                            <svg width="10px" height="10px" class="left-error-icon" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path fill="#1E222C"
                                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                            </svg>
                        </div>
                        <div class="error-title">Error loading the Episode</div>
                    </div>
                    <svg v-on:click="closeError()" width="20px" height="20px" class="right-error-icon"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="white"
                            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                </div>
                <div class="error-description">Zoro updates its secret key every ~40 mins, and the current key that we
                    use is outdated, please retry loading an episode in a few minutes.</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import 'https://fonts.googleapis.com/css?family=Inter';
import { useFetch, useHead, useRoute } from '#app';

const route = useRoute();

console.log('testing')

var parameters = route.path.replace("/stream/", "").split('/');
var episodeNumber = parameters[1].split('-ep-')[1];

console.log(parameters);

const { error, data: episodes } = await useFetch('https://consumet-api.herokuapp.com/meta/anilist/info/' + parameters[0] + '?provider=zoro');
if (error.value || !episodes.value) {
    throw createError({ statusCode: 404, message: "Episode not found" })
}

var anime = episodes.value;

async function loadEpisode(episode) {
    console.log("NEXT EPISODE");
    console.log(anime);
    await navigateTo('/stream/' + anime.id + '/' + anime.title.english.toLowerCase().replaceAll(' ', '-') + '-ep-' + episode.number, { replace: true })
};

function closeError() {
    let errorPopup = document.querySelector('.error-popup');
    errorPopup.classList.remove('show');
}

useHead({
    title: `${anime.title.english} EP ${episodeNumber}`,
    meta: [
        {
            name: "og:title",
            content: `${anime.title.english} Episode ${episodeNumber}`
        },
        {
            name: "og:type",
            content: "website"
        },
        {
            name: "og:url",
            content: `https://inu.watch/stream/${anime.id}/${anime.title.english.toLowerCase().replaceAll(' ', '-')}`
        },
        {
            name: "og:image",
            content: anime.episodes[episodeNumber - 1].image || anime.cover || anime.image
        },
        {
            name: "og:description",
            content: `Watch Episode ${episodeNumber}${anime.episodes[episodeNumber - 1].title ? `\n${anime.episodes[episodeNumber - 1].title}` : ""} of ${anime.title.english} online on Inu's Stream ${anime.episodes[episodeNumber - 1].description ? ` - ${anime.episodes[episodeNumber - 1].description}` : ""}`
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

<script>
import Artplayer from "../../../components/Artplayer.vue";
import Hls from 'hls.js';
import { META, ANIME } from '@consumet/extensions';

const ANILIST = new META.Anilist(new ANIME.Zoro());

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
            stylesObject: {
                width: "100%",
                height: "100%",
            },
            anilistJson: null,
            episodeNumber: 0,
            streamingData: null,
            artPlayer: null,
            fullscreenBool: false,
            netflixUI: false,
            doneLoading: false,
            showIntroSkip: false,
            showEpisodeSelector: false,
        };
    },
    components: {
        Artplayer,
    },
    methods: {
        skipIntro() {
            this.artPlayer.seek = this.streamingData.intro.end;
        },
        episodeSelectorLogic() {
            this.showEpisodeSelector = !this.showEpisodeSelector;
            document.querySelector('.episode-selector').classList.toggle('display')
        },
        getInstance(art) {

            art.on('destroy', (...args) => {
                console.log("destroyed");
                this.artPlayer = null;
                art = null;
            });

            art.on('ready', async (...args) => {
                this.artPlayer = art;
                this.$el.querySelector('.art-bottom').style.display = 'none'
                this.$el.querySelector('.art-state').style.display = 'none'
                this.$el.querySelector('.art-notice').style.display = 'none'
                this.$el.querySelector('.art-layers').style.display = 'none'

                await this.fetch()
                art.switchUrl(this.streamingData.sources[0].url, '')

                var englishSubs = null
                for (var subLang in this.streamingData.subtitles) {
                    if (this.streamingData.subtitles[subLang].lang == 'English') {
                        englishSubs = this.streamingData.subtitles[subLang]
                    }
                }

                setTimeout(() => {
                    if (englishSubs != null) {
                        art.subtitle.url = englishSubs.url;
                    } else {

                        art.subtitle.url = this.streamingData.subtitles[0].url;
                    }
                }, 100);

                var subtitle = this.$el.querySelector('.art-subtitle').style.display = 'none'
                var subtitle = this.$el.querySelector('.art-layers').style.display = 'none'

                var controls = this.$el.querySelector('.custom-controls')
                var gradient = this.$el.querySelector('.gradient-controls')
                var subs = this.$el.querySelector('.subtitles')
                var artplayerElement = this.$el.querySelector('.artplayer')

                var progress_indication = this.$el.querySelector('.progress-bar').addEventListener('click', (e) => {
                    // e = Mouse click event.
                    var rect = e.target.getBoundingClientRect();
                    var x = e.clientX - rect.left; //x position within the element.
                    art.seek = (art.duration * (x / rect.width))

                    //var y = e.clientY - rect.top;  //y position within the element.
                    //console.log("Left? : " + x + " ; Top? : " + y + ".");
                })


                //this.$el.querySelector('.episode-selector-card').children.item(this.episodeNumber - 1).classList.add('selected')




                controls.addEventListener('mouseover', (event) => {
                    controls.style.opacity = '1'
                    gradient.style.opacity = '1'
                });
                controls.addEventListener('mouseout', (event) => {
                    controls.style.opacity = '0'
                    gradient.style.opacity = '0'
                });

                this.$el.querySelector('.skip-back-button').addEventListener('click', function () {
                    art.seek = art.currentTime - 10
                })

                this.$el.querySelector('.skip-forward-button').addEventListener('click', function () {
                    art.seek = art.currentTime + 10
                })

                var play_button = this.$el.querySelector('.play-button');
                var pause_button = this.$el.querySelector('.pause-button');

                play_button.addEventListener("click", function () {
                    pause_button.style.display = 'flex';
                    play_button.style.display = 'none';
                    art.play();
                });
                pause_button.addEventListener("click", function () {
                    art.pause();
                    pause_button.style.display = 'none';
                    play_button.style.display = 'flex';
                });



                var expand_button = this.$el.querySelector('.expand-button')
                var video_wrapper = this.$el.querySelector('.video-wrapper')
                var video_wrapper_netflix = this.$el.querySelector('.video-wrapper-netflix')
                console.log(video_wrapper_netflix)
                expand_button.addEventListener("click", function () {
                    console.log('FULLSCREEN')
                    if (!this.fullscreenBool) {
                        this.fullscreenBool = true
                        if (this.netflixUI) {
                            video_wrapper.requestFullscreen()
                        } else {
                            video_wrapper_netflix.requestFullscreen()
                        }
                    } else {
                        this.fullscreenBool = false
                        window.document.exitFullscreen()
                    }
                });

                window.document.addEventListener('fullscreenchange', function () {
                    if (!window.document.fullscreenElement) {
                        this.fullscreenBool = false
                    }
                });

                var timeout;
                var isHidden = false;

                document.addEventListener("mousemove", magicMouse);

                function magicMouse() {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(function () {
                        if (!isHidden) {
                            document.querySelector("body").style.cursor = "none";
                            controls.style.opacity = '0'
                            gradient.style.opacity = '0'
                            isHidden = true;
                        }
                    }, 5000);
                    if (isHidden) {
                        document.querySelector("body").style.cursor = "auto";
                        controls.style.opacity = '1'
                        gradient.style.opacity = '1'
                        isHidden = false;
                    }
                };

                document.querySelector(".intro-skip-wrapper").addEventListener('click', function () {
                    ;
                });

                document.addEventListener('keydown', (e) => {
                    if (e.code == 'Space') {
                        art.toggle()
                    }
                    if (e.code == 'KeyI') {
                        this.showIntroSkip = !this.showIntroSkip;
                        document.querySelector(".intro-skip-wrapper").classList.toggle('display');
                    }
                    if (e.code == 'KeyM') {
                        // toggle mute
                    }
                    if (e.code == 'ArrowRight') {
                        art.seek = art.currentTime + 10
                    }
                    if (e.code == 'ArrowLeft') {
                        art.seek = art.currentTime - 10
                    }
                    if (e.code == 'KeyF') {
                        if (!this.fullscreenBool) {
                            this.fullscreenBool = true
                            if (this.netflixUI) {
                                video_wrapper.requestFullscreen()
                            } else {
                                video_wrapper_netflix.requestFullscreen()
                            }
                            subs.style.bottom = 'calc(50px)'
                        } else {
                            this.fullscreenBool = false
                            window.document.exitFullscreen()
                            subs.style.bottom = 'calc(50px)'
                        }
                    }
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
                    new_sub.innerHTML = subtitle.innerHTML.replaceAll('<p>', '').replaceAll('</p>', ' ').replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>').replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>')
                    new_sub_shadow.innerHTML = subtitle.innerHTML.replaceAll('<p>', '').replaceAll('</p>', ' ').replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>').replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>')
                } else {
                    new_sub.innerHTML = ''
                    new_sub_shadow.innerHTML = ''
                }

                if (this.streamingData.intro != null) {
                    if (art.currentTime > this.streamingData.intro.start && Math.floor(art.currentTime) <= this.streamingData.intro.end) {
                        this.showIntroSkip = true;
                        document.querySelector(".intro-skip-wrapper").classList.add('display');

                    } else {
                        this.showIntroSkip = false;
                        document.querySelector(".intro-skip-wrapper").classList.remove('display');
                    }
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

            this.streamingData = await fetch('https://consumet-api.herokuapp.com/meta/anilist/watch/' + this.anilistJson.episodes[this.episodeNumber - 1].id + '?provider=zoro').then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            });

            if (this.streamingData['sources'] == null || this.streamingData['sources'] == undefined) {
                let errorPopup = document.querySelector('.error-popup');
                errorPopup.classList.add('show');
            }

            console.log(this.streamingData)
            /* this.streamingData = await fetch('https://consumet-api.herokuapp.com/anime/zoro/watch?episodeId=' + this.anilistJson.episodes[this.episodeNumber - 1].id).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            }); */
        },
        yourCallBackFunction() {
            alert('BACK')
        }
    },
    mounted: function () {
        this.$el.querySelector('.expand-button').addEventListener("click", function () {
            this.$el.querySelector('.expand-button').requestFullscreen()
        });

        this.netflixUI = localStorage.getItem('netflixSetting')
        this.doneLoading = true
    },
    unmounted: function () {
        console.log(this.artPlayer);
    }
};
</script>

<style scoped lang="scss">
.error-popup {
    position: absolute;
    bottom: -100px;
    right: 30px;
    z-index: 10000;
    background-color: #1E222C;
    border-radius: 12px;
    padding: 14px;
    transition: 0.4s all ease;

    & .error-title-bar {
        display: flex;
        justify-content: space-between;

        & .left-wrapper-error {
            display: flex;
            align-items: center;

            & .left-error-x {
                width: 22px;
                height: 22px;
                border-radius: 11px;
                background-color: #C31B10;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            & .error-title {
                color: #C31B10;
                font-size: 14px;
                font-weight: bold;
                margin-left: 12px;
            }
        }


    }

    & .error-description {
        width: 400px;
        margin-top: 10px;
        padding-left: 34px;
        margin-right: 30px;
        font-size: 12px;
        color: #999999;
        font-weight: 500;
    }

    &.show {
        bottom: 30px;
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

.episode-selector-list {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80%;
    overflow-y: hidden;
    overflow-x: scroll;
}

.episode-selector-title {
    font-weight: bold;
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
}

.episode-selector-card {
    position: relative;
    margin-right: 20px;
    width: 170px;
    aspect-ratio: 16/9;
    border-radius: 12px;
    transition: 0.3s all ease;
}

.episode-selector-wrapper {
    position: static;
    width: 170px;
    aspect-ratio: 16/9;
    display: flex;
    transition: 0.3s all ease;
}

.episode-selector-number {
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    top: 4px;
    padding-left: 154px;
}

.episode-selector-gradient {
    position: absolute;
    width: 100%;
    height: 100%;
}

.episode-selector-image {
    position: absolute;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.episode-selector {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.episode-selector-gradient {
    position: absolute;
    border-radius: 11px;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
}

.episode-selector-name {
    position: absolute;
    font-size: 8px;
    border-radius: 0px 0px 10px 10px;
    font-weight: bold;
    background-color: black;
    width: 100%;
    max-width: 100%;
    min-height: 28px;
    padding: 6px 0px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}



.episode-selector.display {
    z-index: 200;
    position: absolute;
    bottom: 110px;
    right: 60px;
    width: 450px;
    height: 160px;
    background-color: #16151A;
    border-radius: 12px;
    transition: 0.3s all ease;
}

.episode-selector {
    height: 0;
    position: absolute;
    bottom: 110px;
    right: 60px;
}

.intro-skip-mask {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    right: 60px;
    bottom: 120px;
    width: 300px;
    height: 100px;
    overflow: hidden;
    pointer-events: none;
}

.intro-skip-wrapper {
    pointer-events: all;
    position: relative;
    transform: translateX(120%);
    z-index: 30;
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 50px;
    font-weight: bold;
    color: white;
    opacity: 0.8;
    cursor: pointer;
    background-color: #16151A;
    transition: 0.3s all ease;
}

.intro-skip-wrapper.display {
    transform: translateX(0%);
}

.intro-skip-wrapper.display:hover {
    transform: scale(1.05);
    opacity: 1;
}

.play-pause-wrapper {
    display: flex;
    position: relative;
    margin-right: 50px;
    margin-left: 0;
    margin-top: 0;
    padding: 0;
    margin-bottom: 22px;
}

.left-side {
    margin: 0;
    padding: 0;
    width: 80vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}

.video-wrapper {
    position: relative;
    width: 77vw;
    height: 77vh;
    margin: 40px;
    margin-bottom: 0px;
    box-shadow: 0px 0px 15px 5px black;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
}

.video-wrapper-netflix {
    position: relative;
    width: 100vw;
    height: 100vh;
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
    width: 100%;
    height: 100%;
    bottom: calc(50px);
    font-family: 'Trebuchet MS';
    pointer-events: none;
}

.subtitle-shadow {
    pointer-events: none;
    text-align: center;
    margin-left: 4px;
    margin-top: 2px;
    font-size: 30px;
    bottom: -2px;
    position: absolute;
    color: black;
    text-shadow: rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px;
}

.subtitle-text {
    pointer-events: none;
    text-align: center;
    position: absolute;
    font-size: 30px;
    color: white;
    text-shadow: rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px;
}

.gradient-controls {
    position: absolute;
    z-index: 21;
    width: 100%;
    height: 100%;
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
    width: 100%;
    height: 100%;
    transition: 0.3s all ease;
}

.bottom-controls {
    width: 100%;
    margin: 30px 60px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.play-button {
    position: absolute;
    display: flex;
    transition: 0.3s all ease;
}

.pause-button {
    position: absolute;
    display: none;
    margin-right: -4px;
    margin-top: -1px;
    transition: 0.3s all ease;
}

.next-episode-button {
    transition: 0.3s all ease;
}

.play-button:hover,
.pause-button:hover,
.skip-back-button:hover,
.skip-forward-button:hover,
.expand-button:hover,
.volume-button:hover,
.episodes-button:hover,
.next-episode-button:hover {
    transform: scale(1.2);
}

.skip-back-button,
.skip-forward-button {
    margin-right: 40px;
    padding: 8px;
    transition: 0.3s all ease;
}

.progress-bar {
    height: 6px;
    border-radius: 3px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
}


.progress {
    height: 6px;
    border-radius: 3px;
    width: 0%;
    pointer-events: none;
    background-color: #FF4242;
}

.time-text {
    font-weight: 400;
    font-size: 14px;
    width: 150px;
    color: white;
    margin-left: 40px;
}

.volume-button,
.expand-button {
    margin-left: 40px;
    transition: 0.3s all ease;
}

.expand-button {
    padding-right: 8px;
}

.volume-button,
.episodes-button {
    margin-right: 40px;
    transition: 0.3s all ease;
}

.top-info {
    display: flex;
    justify-content: space-between;
}

.episode-info {
    margin: 20px 40px;
    width: 70vw;
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

.description-watch {
    width: 60vw;
    font-size: 18px;
    font-weight: 400;
    color: white;
    padding-left: 20px;
}

.right-side {
    margin: 0;
    padding-left: 40px;
    padding: 0;
    width: 20vw;
    height: 100vh;
    overflow-y: scroll;
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

.episode-card {
    position: relative;
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