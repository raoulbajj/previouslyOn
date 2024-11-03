import { useEffect, useState } from 'react';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const [friendList, setFriendList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const response = await fetch(`https://api.betaseries.com/friends/list?token=${accessToken.access_token}`, {
          method: 'GET',
          headers: {
            'X-BetaSeries-Key': apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.users) {
          setFriends(data.users);
        }
        console.log(data);
      } catch (error) {
        console.log(accessToken.access_token);
        console.error('Error fetching friend list:', error);
      }
    };

    fetchFriendList();
  }, [friendList]);

  const handleDeleteFriend = async (friendId) => {
    try {
      const response = await fetch(`https://api.betaseries.com/friends/friend?token=${accessToken.access_token}`, {
        method: 'DELETE',
        headers: {
          'X-BetaSeries-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: friendId }),
      });

      const jsonData = await response.json();
      if (jsonData.errors.length > 0) {
        setError(jsonData.errors[0]);
      } else {
        setFriendList((prevList) => prevList.filter((friend) => friend.id !== friendId));
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
      setError('Error deleting friend');
    }
  };
  return (

    <div className='p-5 flex flex-col items-center h-full gap-5'>

      <p className='text-6xl mb-5 tracking-widest xs:text-4xl'>
        Friends
      </p>

      <div className='flex justify-center items-center gap-5 flex-wrap'>

        {/* CARD */}
        {friends.map((friend) => (
          <div key={friend.id} className="card bg-base-100 shadow-xl hover:scale-95 transition-all duration-200 hover:bg-base-200">
            <figure><img src={friend.avatar || '/images/stock/photo-1635805737707-575885ab0820.jpg'} width='250px' alt={friend.login} /></figure>
            <div className="card-body">
              <h2 className="card-title tracking-widest">{friend.login}</h2>
              <p className='tracking-widest'>XP: {friend.xp}</p>
              <div className="card-actions justify-end flex-wrap my-2">
                <button
                  className="tracking-widest btn btn-primary w-full poppins"
                  onClick={() => handleDeleteFriend(friend.id)}>
                  Delete Friend
                </button>
              </div>
              <button className="tracking-widest btn btn-outline btn-error poppins">
                  Bloquer ce membre
                </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FriendList;


