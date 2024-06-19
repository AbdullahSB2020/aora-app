
import { View, Text, Alert } from 'react-native'
import { useEffect, useState } from 'react'

export type useAppwriteHookType = () => any

const useAppwriteHook = (fn: useAppwriteHookType) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        // fetch data
        try {
            const data = await fn();
            setData(data);
            console.log(JSON.stringify(data, null, 2))

        } catch (error) {
            Alert.alert("Error", "An error occurred while fetching data")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchData();
    }, []);

    const refresh = () => fetchData();

    return {
        data,
        loading,
        refresh,
    }
}

export default useAppwriteHook