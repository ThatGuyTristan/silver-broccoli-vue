import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import GameService from "../services/GameService"

export const useGameStore = defineStore('games', () => {
  const game = ref({})
  const games = ref([])
  const error = ref('')
  const loading = ref(false)
  const storeUsername: Ref<string> = ref('')

  const getSteamLibraryByUsername = async (username:string) => {
    loading.value = true
    if(storeUsername.value === username) return 
    storeUsername.value = username.trim()

    const response = await GameService.getGames(username);
    //@ts-ignore
    if (response.status == 200) { 
    //@ts-ignore
      games.value = response.data.games
    } else {
      error.value = response.data
    }
    loading.value = false
  }

  const randomGame = () => {
    game.value = games.value[Math.ceil(Math.random() * games.value.length)]
  }

  const reset = () => {
    error.value = ''
    game.value = {}
    games.value.length = 0
  }

  return { error, games, loading, storeUsername, game, getSteamLibraryByUsername, randomGame, reset }
})
