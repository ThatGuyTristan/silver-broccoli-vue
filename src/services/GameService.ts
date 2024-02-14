import axios from "axios"

export default { 
    async getGames(username:string) {
        let response;
        const params = { 
            username: username
        }
        try { 
            response = await axios.get(import.meta.env.VITE_APP_RETRIEVE_URL, { params } )
        } catch (error) { 
            //@ts-ignore
            response = error.response
        }
            return response
    }
}