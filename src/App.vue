<template>
  <v-app class="bg-black">
    <v-main :class="[mdAndUp ? 'w-50 mx-auto' : 'w-100 h-50']" class="d-flex flex-column bg-grey-darken-4" id="main">
      <div class="text-center font-weight-bold w-full flex-shrink-1 text-h5 mt-4" id="top">
        <div id="header-text">
          WHAT SHOULD I PLAY?
        </div>

        <div id="text-field">
            <v-text-field
              v-model="username" 
              color="success"
              hint="your user profile must be set to public"
              class="text-uppercase mr-4 my-4"
              placeholder="enter your Steam username"
              rounded="0"
            > 
            <template v-slot:prepend>
              <img
                class="ml-4 bg-white rounded-xl"
                id="prepend-icon"
                src="./assets/steam-logo-icon.png" />   
            </template>
            <template v-slot:append>
              <v-btn 
                @click="fetchGames" 
                rounded="0" 
                size=large 
                variant=text 
                color="green" 
                class="h-100"
                :disabled="username === store.storeUsername"
                > Search </v-btn>
            </template>
          </v-text-field>
        </div>
      </div>
      <div class="d-flex justify-center" id="middle">
            <GameCard :game="game" :error="error" :loading="loading"> </GameCard>
      </div>
      <div class="mx-auto mt-auto  my-lg-2 text-h5" v-if="gamesInLibrary.length > 1">
        Not feeling it? 
      </div>
      <div class="mt-4" id="bottom">
          <v-btn 
            v-if="gamesInLibrary.length > 1" 
            class="font-weight-bold"
            @click="findGame()" 
            id="find-button"
            rounded="0"
            :disabled="!gamesInLibrary.length"
            elevation="0"
            size="x-large"
            :ripple="false"
            block
            > 
              Find Another 
          </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGameStore } from "./stores/game"
import GameCard from '../src/components/GameCard.vue'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay();

type Game = { 
    appid: number,
    name: string,
    playtime_forever: number,
    img_icon_url: string,
}

const username: Ref<string> = ref('naithein')
const store = useGameStore();
//@ts-ignore

const gamesInLibrary = computed(() => {
  return store.games;
})

const loading = computed(() => {
  return store.loading;
})
//@ts-ignore
const game = computed<Game>(() => {
  return store.game;
})

const error = computed(() => {
  return store.error
})

const findGame = () => {
  //@ts-ignore
  game.value = store.randomGame();
}

const fetchGames = () => {
  store.reset();
  store.getSteamLibraryByUsername(username.value).then(() => findGame())
}
</script>

<style scoped>
@font-face {
  font-family: 'digitalix';
  src: url("/fonts/digitalix.ttf")
}

div:deep() .v-field__input, .v-field__append-inner { 
  background-color: black;
  color: green;
  padding-right: 0px;
}

div:deep() .v-field__append-inner {
  background-color: black;
  padding: 0;
  margin: 0;
}


#middle {
  min-height: 60vh;
}

#header-text { 
  font-family: 'digitalix', 'sans-serif';
}

#fetch-button {
  background-color: green;
  color: white;
}

#find-button {
  background-color:green;
  color: white
}

#prepend-icon {
  max-height: 46px;
  max-width: 46px;
}

@media screen and (min-width: 749px) {
  #app { 
    max-height: 600px;
  }
}
</style>