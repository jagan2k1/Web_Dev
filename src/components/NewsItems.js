import React from 'react'
import './newsitem.css'

const NewsItems = ({loading, title, description, url, urlToImage}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
    return(
        <div className='main'>
        <div className='news-app'>
            <div className='news-item'>
                <img className='news-img'src={urlToImage} alt={urlToImage} />
                <h3><a href={url}>{title}</a></h3>
                <p>{description}</p>
            </div>
        </div>
        </div>
    )
}
export default NewsItems;