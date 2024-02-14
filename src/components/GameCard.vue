<template>
    <div class="d-flex flex-column" id="main">
        <div class="text-h4 text-center mb-2" v-if="!error">
            <div v-if="game.name">
                How about. . . 
            </div>
            <div v-else>
                <div>
                    Welcome
                </div>
                <div class="mt-2">
                    Enter your steam Username to get started
                </div>
            </div>
        </div>
        <div v-else-if="loading"> 
            Loading . . .
        </div>
        <div class="text-center mx-auto text-red" v-else>
            {{ error }}. Try again
        </div>
        <div class="d-flex justify-center mt-auto">
            <v-avatar :size="mdAndUp ? '300px' : '64px' ">
                <v-img :src="imgUrl" class="justify-space-evenly"> </v-img>
            </v-avatar>
        </div> 

        <div class="text-h4 text-center my-auto">
            <span class="d-inline-block" id="game-name"> {{ game.name }} </span>
        </div>
        
        <div v-if="game.name" class="mt-10 w-100">
            <div class="text-center text-h5">
                Time Played: {{ computedPlaytimeForever }}
            </div>
            <div class="text-center text-h5">
                Last played: {{ computedLastPlayed }} 
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay();

type Game = { 
    appid: number,
    name: string,
    playtime_forever: number,
    img_icon_url: string,
    rtime_last_played?: number
}

const props = defineProps<{
    game: Game
    error: string,
    loading: boolean
}>()

const computedPlaytimeForever = computed(() => {
    if(!props.game) return;
    const hoursPlayed = Math.floor(props.game.playtime_forever / 60)

    if(hoursPlayed < 1 && hoursPlayed > 0){ 
        return "Less than one hour"
    } else if(hoursPlayed === 0) {
        return "None"
    } else {
        return hoursPlayed === 1 ? `1 hour` : `${hoursPlayed} hours`
    }
})

const computedLastPlayed = computed(() => {
    if(!props.game) return;
    if(props.game.rtime_last_played === 0){
        return 'Never 😿'
    }  else if (!props.game.rtime_last_played){ 
        return 'Not even Steam knows.'
    } else { 
       return new Date(props.game.rtime_last_played * 1000).toDateString();
    }
})

const imgUrl = computed(() => {
    if(!props.game) return;
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${props.game.appid}/${props.game.img_icon_url}.jpg`
    })
</script>

<style>
    #game-name {
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: block;
        line-height: 1em;
        max-height: 2em;
    }
</style>