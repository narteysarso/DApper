import { useEffect, useState } from "react";
import { getCoinDetail } from "../services/cryptoApi";

const cache = {};
export function useFetchCoinDetail({ coinId } = {}) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);


    useEffect(() => {

        const fetchCoinDetail = async () => {
            try {
                setLoading(true);

                if(cache[coinId]){
                    setData(cache[coinId].data);
                    return;
                }

                const response = await getCoinDetail({coinId});

                if (response.status === 200) {
                    setData(response?.data?.data?.coin);
                    cache[coinId] = { data: response?.data?.data?.coin};
                }

                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

            } catch (error) {
                setFetchError(error.message);
            }finally{
                setLoading(false);
            }

        }

        fetchCoinDetail();
    }, [coinId]);

    return [data, loading, fetchError];
}