<template>
    <div id="container">
        TEST
        <div class="thumbnail-wrapper">
            <img class="thumbnail-source" src="https://preview.zorores.com/89/891bcc461bc651324e6043b099f043ba/thumbnails/sprite-0.jpg" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

let x : number = 0;
let y : number = 0;
if(process.client)
{
    document.addEventListener('click', () => {
        x++;
        if(x % 7 == 0){
            y++;
            x = 0;
        }
        console.log({x});
        console.log({y});
        let newPos : string = (x * 16.7).toString() + '% ' + (y * 16.7).toString() + '%';
        console.log(newPos);
        console.log((document.querySelector('.thumbnail-source') as HTMLElement).style.objectPosition);
        (document.querySelector('.thumbnail-source') as HTMLElement).style.setProperty('object-position', newPos);
        console.log((document.querySelector('.thumbnail-source') as HTMLElement).style.objectPosition);
    });
}


</script>

<style scoped lang="scss">
#container {
    display: block;
}

@media only screen and (orientation:portrait) {

    #container {

        height: 100vw;

        -webkit-transform: rotate(90deg);

        -moz-transform: rotate(90deg);

        -o-transform: rotate(90deg);

        -ms-transform: rotate(90deg);

        transform: rotate(90deg);

    }

}

@media only screen and (orientation:landscape) {

    #container {

        -webkit-transform: rotate(0deg);

        -moz-transform: rotate(0deg);

        -o-transform: rotate(0deg);

        -ms-transform: rotate(0deg);

        transform: rotate(0deg);

    }
}

.thumbnail-wrapper {
    width: 177px;
    height: 99px;
    overflow: hidden;
    position: relative;

    & .thumbnail-source {
        position: absolute;
        width: 177px;
        height: 99px;
        overflow: hidden;
        object-fit: none;
        object-position: 0 0; /* 16.7% = one image width/ */
    }
}


</style>