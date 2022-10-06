<template>
    <div>
        <Artplayer
            class="artplayer"
            @get-instance="getInstance"
            :option="option"
        />
    </div>
</template>

<script setup lang="ts">
import Artplayer from "../../../components/Artplayer.vue";
import Hls from "hls.js";
import { useFetch, useHead, useRoute } from "#app";

const route = useRoute();

console.log("testing");

var parameters = route.path.replace("/watch/", "").split("/");
var episodeNumber = parseInt(parameters[1].split("-ep-")[1]);

console.log(parameters);

const { error, data: episodes } = await useFetch(
    "https://api.consumet.org/meta/anilist/info/" +
        parameters[0] +
        "?provider=zoro"
);
if (error.value || !episodes.value) {
    throw createError({ statusCode: 404, message: "Episode not found" });
}

var anime = episodes.value;
console.log(anime.episodes[episodeNumber - 1].id);
//console.log(anime.episodes[episodeNumber - 1].id);

const { errorData, data: streamingData } = await useFetch(
    "https://api.consumet.org/meta/anilist/watch/" +
        anime.episodes[episodeNumber - 1].id +
        "?provider=zoro"
);
if (!streamingData.value) {
    throw createError({ statusCode: 404, message: "Streaming Data not found" });
}

var subtitles = [];
let artPlayer;
let sIndex = 0;
//console.log(streamingData.value);
subtitles.push({
    html: "Show Subs",
	icon: '',
    switch: true,
    onSwitch: function (item) {
        artPlayer.subtitle.show = !item.switch;
        return !item.switch;
    },
});
for (let i = 0; i < streamingData.value.subtitles.length; i++) {
    if (streamingData.value.subtitles[i].lang == "English") {
        sIndex = i;
        subtitles.push({
            default: true,
            url: streamingData.value.subtitles[i].url,
            html: streamingData.value.subtitles[i].lang,
        });
    } else if (streamingData.value.subtitles[i].lang == "Thumbnails") {
        // do nothing
    } else {
        subtitles.push({
            url: streamingData.value.subtitles[i].url,
            html: streamingData.value.subtitles[i].lang,
        });
    }
}
console.log(subtitles);
console.log(streamingData.value.sources);

let qualities = [];
let qIndex = 0;
for (let i = 0; i < streamingData.value.sources.length; i++) {
    if (streamingData.value.sources[i].quality == "1080p") {
        qIndex = i;
        qualities.push({
            default: true,
            html: streamingData.value.sources[i].quality,
            url: streamingData.value.sources[i].url,
        });
    } else {
        qualities.push({
            html: streamingData.value.sources[i].quality,
            url: streamingData.value.sources[i].url,
        });
    }
}

var base = streamingData.value.subtitles[
    streamingData.value.subtitles.length - 1
].url.substring(
    0,
    streamingData.value.subtitles[streamingData.value.subtitles.length - 1].url
        .length - 4
);
var urls = Array(3)
    .fill()
    .map((_, i) => `${base}${i}.jpg`);

function artplayerPluginThumbnails(option) {
    return (art) => {
        art.controls.add({
            name: "thumbnails",
            position: "top",
            index: 20,
            mounted: ($control) => {
                const {
                    template: { $progress },
                    events: { proxy },
                    constructor: {
                        utils: { setStyle, clamp },
                    },
                } = art;

                const cache = [];
                const { urls, width, height } = option;
                setStyle($control, "display", "none");
                setStyle($control, "height", `${height}px`);
                setStyle($control, "width", `${width}px`);
                setStyle($control, "backgroundSize", "contain");

                proxy($progress, "mousemove", (event) => {
                    setStyle($control, "display", "block");
                    const { left: progressLeft, width: progressWidth } =
                        $progress.getBoundingClientRect();
                    const eventLeft = clamp(
                        event.pageX - progressLeft,
                        0,
                        progressWidth
                    );
                    const perWidth = progressWidth / urls.length;
                    const index = clamp(
                        Math.ceil(eventLeft / perWidth) - 1,
                        0,
                        urls.length - 1
                    );

                    if (cache[index]) {
                        if (cache[index].startsWith("blob:")) {
                            setStyle(
                                $control,
                                "backgroundImage",
                                `url(${cache[index]})`
                            );
                        }
                    } else {
                        cache[index] = "loading";
                        fetch(urls[index])
                            .then(function (response) {
                                return response.blob();
                            })
                            .then((blob) => {
                                cache[index] = URL.createObjectURL(blob);
                                setStyle(
                                    $control,
                                    "backgroundImage",
                                    `url(${cache[index]})`
                                );
                            });
                    }

                    if (eventLeft <= width / 2) {
                        setStyle($control, "left", 0);
                    } else if (eventLeft > progressWidth - width / 2) {
                        setStyle(
                            $control,
                            "left",
                            `${progressWidth - width}px`
                        );
                    } else {
                        setStyle(
                            $control,
                            "left",
                            `${eventLeft - width / 2}px`
                        );
                    }
                });

                proxy($progress, "mouseout", () => {
                    setStyle($control, "display", "none");
                });
            },
        });

        return {
            name: "artplayerPluginThumbnails",
        };
    };
}

var introRight = "20px";
let animeTitle = anime.title.english ?? anime.title.romaji;
let episodeTitle = anime.episodes[episodeNumber - 1].title;

let option = {
    url: streamingData.value.sources[qIndex].url,
    customType: {
        m3u8: function (video, url) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
            } else {
                const canPlay = video.canPlayType(
                    "application/vnd.apple.mpegurl"
                );
                if (canPlay === "probably" || canPlay == "maybe") {
                    video.src = url;
                } else {
                    art.notice.show = "Does not support playback of m3u8";
                }
            }
        },
    },
    autoplay: true,
    fullscreen: true,
    fullscreenWeb: true,
    autoOrientation: true,
    pip: true,
    setting: true,
    theme: "#ffffff",
    subtitle: {
        url: streamingData.value.subtitles[sIndex].url,
        type: "vtt",
        encoding: "utf-8",
        style: {
			position: 'absolute',
			transition: '0.3s all ease',
			bottom: '70px',
            color: "#ffffff",
            "font-size": "30px",
            "text-shadow":
                "rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px",
        },
    },
    layers: [
        {
			name: 'intro',
            html: "SKIP OPENING",
            click: function () {
                artPlayer.seek = streamingData.value.intro.end;
            },
            style: {
                position: "absolute",
                bottom: "60px",
                right: '20px',
                opacity: "1.0",
                padding: "12px 20px",
                borderRadius: "8px",
                backgroundColor: "#464E6C",
                color: "white",
                fontWeight: "bold",
                zIndex: 100,
                transition: "0.3s all ease",
            },
        },
		{
            name: 'title',
            html: `<div style="transition: 0.3s all ease;padding: 20px 0 0 0;background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);display: flex; flex-direction: column; align-items: center; width: 100vw; font-weight: 500;"><div style="font-size: 20px; font-weight: bold;">${animeTitle} - <span style="color: #999999">EP: ${episodeNumber}</span></div>${episodeTitle}</div`,
            style: {
                position: 'absolute',
            },
        },
    ],
    settings: [
		{
			html: 'SETTINGS',
			name: "settingstitle",
		},
        {
            width: 300,
            html: "Subtitle",
            tooltip: streamingData.value.subtitles[sIndex].lang,
            icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="white" d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"/></svg>',
            selector: subtitles,
            onSelect: function (item) {
                art.subtitle.switch(item.url, {
                    name: item.html,
                });
                return item.html;
            },
        },
		{
            html: 'Select Quality',
            width: 150,
            tooltip: streamingData.value.sources[qIndex].quality,
            selector: qualities,
            onSelect: function (item, $dom, event) {
                console.info(item, $dom, event);
                artPlayer.switchQuality(item.url, item.html);

                // Change the tooltip
                return item.html;
            },
        },
		{
			width: 240,
			html: "Provider",
			tooltip: 'Zoro',
			selector: [
				{
					default: true,
					html: 'Zoro',
				}
			]
		}
    ],
    icons: {
        state: "",
    },
};

function getInstance(art) {
    console.log(art);
    art.on("ready", async (...args) => {
		artPlayer = art;
		art.layers.intro.style.display = 'none';
		document.querySelector('.art-setting-panel').firstElementChild.style.pointerEvents = "none";
	});

    art.on("subtitleUpdate", (text) => {
        console.log(text);
        //art.template.$subtitle.innerHTML.replaceAll('<p>', '').replaceAll('</p>', ' ').replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>').replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>')
        art.template.$subtitle.innerHTML = text
            .replaceAll("<p>", "")
            .replaceAll("</p>", " ")
            .replaceAll("&lt;i&gt;", "<i>")
            .replaceAll("&lt;/i&gt;", "</i>")
            .replaceAll("&lt;b&gt;", "<b>")
            .replaceAll("&lt;/b&gt;", "</b>");
    });

	art.on('pause', () => {
		art.layers.title.style.display = 'block';
	});

	art.on('play', () => {
		art.layers.title.style.display = 'none';
	});

    art.on("video:timeupdate", (...args) => {
        art.layers.intro.style.display = art.currentTime >= streamingData.value.intro.start && art.currentTime <= streamingData.value.intro.end ? 'block' : 'none';
    });

	art.on('blur', (...args) => {
		art.template.$subtitle.style.bottom = '30px';
	});
}
</script>

<style scoped>

[data-name="settingstitle"] {
    pointer-events: none;
}
.artplayer {
    width: 100vw;
    height: 100vh;
    background-color: black;
}
</style>
