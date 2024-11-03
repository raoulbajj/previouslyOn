import { useEffect, useState } from 'react';
import GetAccessToken from './Hooks/GetAccesToken';
import Profile from './Profile/Profile';

const HomePage = () => {

  const { getAccessToken } = GetAccessToken();
  const [accessToken, setAccessToken] = useState(null);
  const code = window.location.href.split('?code=')[1];
  localStorage.setItem('code', code);

  // Récupération du token d'accès, puis stockage dans le localStorage
  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);

      if (localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === undefined)
      {
        localStorage.setItem('accessToken', JSON.stringify(token));
      }
    };

    fetchAccessToken();
  }, []);


  return (
    <div className='p-5 flex flex-col items-center h-full overflow-y-scroll'>
      <Profile />
    </div>
  );
}

export default HomePage;


