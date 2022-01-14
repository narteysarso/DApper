import { useEffect, useState } from "react";
import { getCoinHistory } from "../services/cryptoApi";

const cache = {};
export function useFetchCoinHistory({ coinId, timePeriod } = {}) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);


    useEffect(() => {


        const fetchCoinHistory = async () => {
            try {
                setLoading(true);
                const cacheData = cache[`${coinId}${timePeriod}`];
                if (cacheData) {
                    setData(cacheData.data);
                    return;
                }
                const response = await getCoinHistory({ coinId, timePeriod });

                if (response.status === 200) {
                    setData(response.data.data);
                    cache[`${coinId}${timePeriod}`] = {data: response.data.data};
                    return;
                }

                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
            } catch (error) {
                setFetchError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoinHistory();
    }, [coinId, timePeriod]);

    return [data, loading, fetchError];
}