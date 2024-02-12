import axios from "axios"

export default { 
    async getGames(username:string) {
        let response;
        const params = { 
            username: username
        }
        try { 
            response = await axios.get("http://localhost:3000/retrieve", { params } )
        } catch (error) { 
            //@ts-ignore
            response = error.response
        }
            return response
    }
}