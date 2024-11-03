const GetAccesToken = () => {

    const client_id = import.meta.env.VITE_REACT_APP_APIKEY;
    const secret_key = import.meta.env.VITE_REACT_APP_SECRET_KEY_OAUTH_2_0;
    const redirect_uri = encodeURIComponent("http://localhost:5173/Home");

    const getCodeFromUrl = () => {
        const url = window.location.href;
        const code = url.split('?code=')[1];
        return code;
    }

    const getAccessToken = async () => {
        const code = getCodeFromUrl();
        const response = await fetch(`https://api.betaseries.com/oauth/access_token?client_id=${client_id}&client_secret=${secret_key}&redirect_uri=${redirect_uri}&code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const tokenAccessBetaSeries = await response.json();
        // console.log(tokenAccessBetaSeries);
        return tokenAccessBetaSeries
    }

    return { getAccessToken }

}

export default GetAccesToken