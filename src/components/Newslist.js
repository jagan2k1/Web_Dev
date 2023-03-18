import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import NewsItems from './NewsItems'
import Pagination from './Pagination'
import './newslist.css'

const Newslist = () => {
    const[articles,setArticles]=useState([])
    const[loading, setLoading]=useState(false);
    const[currentPage, setCurretPage]= useState(1);
    const[postsPerPage]= useState(8);
    const[ipvalue,setIpValue] = useState('bitcoin')
    const[searchfield,setSearchfield] = useState('bitcoin')
    useEffect(() => {
        const getArticles = async () => {
            setLoading(true);
            const response = await axios.get('https://newsapi.org/v2/everything?q='+searchfield+'&apiKey=5b0268abcb3c460ea3b35937f7227b88')
            console.log(response);
            setArticles(response.data.articles);
            setLoading(false);
        }
        getArticles()
    }, [searchfield]) 

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentArticles= articles.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) =>setCurretPage(pageNumber)
    const onSearchChange=(event)=>{
        setIpValue(event.target.value)
    }
    const onButtonClick=(event)=>{
        setSearchfield(ipvalue)
    }

    return (
        <div className='newshomepage'>
            <br></br>
            <div>
                <input type='text' name='category' onChange={onSearchChange}/>
                <button onClick={onButtonClick}>Search</button>
            </div>
            <div className='pagination'>
                <br></br>
                <Pagination
                    postsPerPage = {postsPerPage}
                    totalPosts = {articles.length}
                    paginate={paginate}
                />
            </div>
            {currentArticles.map(currentArticles => {
                return(
                    <div className='container-mt-5'>
                        <NewsItems 
                            loading = {loading}
                            title={currentArticles.title}
                            description={currentArticles.description}
                            url={currentArticles.url}
                            urlToImage={currentArticles.urlToImage}
                        />
                        
                    </div>
                )
            })}
            <br></br>
            
            
        </div>
    )
}
export default Newslist;