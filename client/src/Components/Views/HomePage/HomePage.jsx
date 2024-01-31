import { useState } from "react"
import Card from "./HomeComponents/Card/Card"
import SearchBar from "./HomeComponents/SearchBar/SearchBar"
import style from "./HomePage.module.css"
import axios from "axios"

const [gameData, setGameData] = useState([])

const getVideogameById = async () => {
    data = await axios(`http://localhost:3001/videogames/1`)
    videogame = {
        name: data.name
    }
}
getVideogameById()
export default function HomePage() {
    return (
        <div className={style.HomePage}>
            <SearchBar/>
            <Card/>
        </div>
    )
}