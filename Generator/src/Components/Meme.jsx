import React from "react"
import MemeData from "../MemeData"

export default function Meme() {
    
    const [meme, setMeme]= React.useState({
        topText:"",
         bottomText:"",
          randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    
    const [allMemeImages, setAllMemeImages] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
    }, [])

    function getsMeme() {
        const memesArray = allMemeImages
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url=memesArray[randomNumber].url
        
        setMeme(prevState =>{return{
            ...prevState,randomImage:url}})
    }

    
    function handleChange(event){
    const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
   
    
    return (
        <main>
           
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getsMeme}
                >
                    Get a new meme image 🖼
                </button>

            </div>
            <div className="meme">
                <div className="image-div">
                    <img src={meme.randomImage} className="meme--img"/>
                </div>
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
        )
}
