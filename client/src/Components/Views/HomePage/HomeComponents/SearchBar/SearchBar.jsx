import style from "./SearchBar.module.css"

export default function SearchBar() {
    return (
        <div className={style.searchContainer}>
            Search A VideoGame: 
            <input type="text" className={style.searchInput}/>
            <button className={style.searchButton}/>
        </div>
    )
}