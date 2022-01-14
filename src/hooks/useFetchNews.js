import { useEffect, useState } from "react";
import { getNews } from "../services/newsApi";
import { debounce } from "../utils/debounce";

export function useFetchNews({searchword = "crypto", limit = 100} = {}) {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    

    useEffect( () => {

        const fetchNews = async () => {
            try {
                
                setIsLoading(true);
                const response = await getNews({ searchword, limit });
                if (response.status === 200) {
                    setNews(response.data.value);
                }
    
                if (response.status !== 200) {
                    
                    throw Error(response.statusText);
                }
    
            } catch (e) {
                setFetchError(e.message)
            } finally {
                setIsLoading(false)
            }
        }   
        debounce(fetchNews)({searchword, limit});
        return () => setNews([])
    }, [searchword,limit]);
    return [news, isLoading, fetchError];
}