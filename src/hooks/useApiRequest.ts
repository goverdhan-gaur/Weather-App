import { useState, useEffect } from 'react';
import axios from 'axios';

async function getAuthToken() {
    const response = await axios.get('/api/auth/access_token');
    const data = await response.data;
    return data;
}

function useAuthToken() {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const fetchAuthToken = async () => {
            const data = await getAuthToken();
            console.log(data)
            setAuthToken(data);
        };

        fetchAuthToken();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const token = await getAuthToken();
            setAuthToken(token);
        }, 120);

        return () => clearInterval(intervalId);
    }, []);

    return authToken;
}

export default useAuthToken;