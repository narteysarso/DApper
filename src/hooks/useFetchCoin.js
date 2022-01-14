import { useEffect,useState } from "react";
import { getCoins } from "../services/cryptoApi";
import { debounce } from "../utils/debounce";

const TWO_MINUTES_DELAY = 1200000;
const cache = {current: {}}
export const useFetchCoin = ({limit = 100} = {}) => {
    const [cryptos, setCryptos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    
    
    useEffect( () => {
        const fetchCoins = async() => {

            try {
                setIsLoading(true);

                if(cache.current[limit] && (cache.current[limit].timestamp - Date.now()) < TWO_MINUTES_DELAY ){
                    console.log('cache');
                    setCryptos(cache.current[limit].data);
                    return;
                }
        
                const response = await getCoins({limit});
                console.log('new')
        
                if(response.status === 200){
                    setCryptos(response?.data?.data);
                    cache.current = { ...cache.current, data: response?.data?.data, timestamp: Date.now()}
                }
        
                if(response.status !== 200){
                    throw Error(response.statusText);
                }
                
            } catch (error) {
                setFetchError(error.message);
            }finally{
                setIsLoading(false)
            }
        }
        debounce(fetchCoins)({limit})
        return () => setCryptos([]);
    },[limit]);

    return [cryptos, isLoading, fetchError];
}