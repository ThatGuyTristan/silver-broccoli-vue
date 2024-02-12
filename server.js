import axios from 'axios';
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import process from 'process';

import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

const ORIGIN = process.env.ORIGIN 

const corsOptions = { 
    origin: ORIGIN || 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:  false }))

app.get('/', (function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, 'public/index.html'))
    // res.sendFile(path + 'index.html')
}))

const KEY = process.env.API_KEY

app.get('/retrieve', (function (req, res) { 
    axios
    //@ts-ignore
    .get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${req.query.username}`)
    .then((vanityResponse) => {
        const steamId = vanityResponse.data.response.steamid
        if(!steamId){
            console.log(`could not resolve steam username ${req.query.username}`);
            res.header('Access-Control-Allow-Origin', '*')
            res.status(400).send('Could not resolve username')
            return;
        }
        //@ts-ignore
        axios
            .get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${steamId}&include_appinfo=true`)
            .then((ownedGamesReponse) => { 
                res.header('Access-Control-Allow-Origin', '*')
                res.status(200).send(ownedGamesReponse.data.response) 
            })
    })
    //@ts-ignore
    .catch((error) => {
      console.log("error: ", error)
    })
}))

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})