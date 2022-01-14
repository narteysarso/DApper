import axios from "axios";

const newsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
}

const baseURL = 'https://bing-news-search1.p.rapidapi.com/'

const api = axios.create({ baseURL});


export async function getNews({limit = 100, searchword = "bitcoin" }){
    
    return await api.get(`/news/search?q=${searchword}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${limit}`,{
        headers: newsApiHeaders
    })
}