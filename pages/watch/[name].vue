<template>
    <div class="body-wrapper">
        <div class="video-container">
            <Player autoplay ref="vime">
                <video crossorigin="">
                    <source src="https://media.vimejs.com/720p.mp4" type="video/mp4" />
                </video>
                <Ui>
                    <ClickToPlay />
                </Ui>
            </Player>
        </div>
    </div>
</template>

<script>
import { Player, Ui, ClickToPlay } from '@vime/vue-next';

export default {
    components: {
        Player,
        Ui,
        ClickToPlay,
    },
};
</script>

<style scoped>
.body-wrapper {
    display: flex;
    padding: 30px;
}

.video-container {
    width: 70vw;
    height: 70vh;
}
</style>