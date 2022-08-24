<template>
    <div>{{ index }} - {{ source.title }}</div>
</template>

<script>
export default {
    name: 'episodeComponent',
    props: {
        index: { // index of current item
            type: Number
        },
        source: { // here is: {uid: 'unique_1', text: 'abc'}
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>