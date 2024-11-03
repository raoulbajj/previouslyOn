import React, { useState, useEffect } from 'react';

const Login2 = () => {

    const client_id = import.meta.env.VITE_REACT_APP_APIKEY;
    const redirect_uri = encodeURIComponent("http://localhost:5173/Home");
    const authUrl = `https://www.betaseries.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    const [hidden, setHidden] = useState('hidden transition-all duration-200');
    const [hidden2, setHidden2] = useState('hidden transition-all duration-200');
    const [rotation, setRotation] = useState('');

    const rotateOnClick = () => {
        if (rotation === '') {
            setRotation('duration-0 rotation ')
        }
    }

    useEffect(() => {
        if (rotation === 'duration-0 rotation ') {
            setTimeout(() => {
                setRotation('')
            }, 970);
        }
    }, [rotation])

    const reverseHiddenOnClick = () => {
        if (hidden === 'hidden transition-all duration-200') {
            setHidden('flex flex-col items-center justify-center p-2 xs:p-0 tracking-widest transition-all duration-200 text-2xl italic thisIsTheWay')
        } else {
            setHidden('hidden transition-all duration-200')
        }
    }

    const redirectOnClick = () => {
        setInterval(() => {
            window.location.href = authUrl;
        }, 1000);
        setHidden('flex flex-col items-center justify-center p-2 xs:p-0 tracking-widest transition-all duration-200 text-2xl italic thisIsTheWay')
    }

    const rotateAndRedirectOnClick = () => {
        setHidden2('loader transition-all duration-200')
        rotateOnClick();
        redirectOnClick();
    };

    return (
        <div className='w-full justify-center items-center flex h-full flex-col gap-5'>
            <section className='bg-login-form min-form rounded-2xl flex flex-col justify-center items-center border-2 border-neutral-800 p-2 xxs:p-0 transition-all duration-400'>
                <div
                    onClick={reverseHiddenOnClick}
                    className={`${rotation} rounded-full bg-red-700 m-3 mt-5 border-2 hover:border-black transition-all duration-200 hover:scale-95 active:scale-125 cursor-pointer w-fit`}>
                    <img src="../../src/assets/helmets-PNG/MandoHelmet6.png" alt="Hey Mandooooo !!!" width='100px' className='red-mando rounded-full transition-all duration-200' />
                </div>

                <div className='flex justify-center items-center text-center p-3'>
                    <p className={hidden}>THIS IS THE WAY !</p>
                </div>

                <button
                    onClick={rotateAndRedirectOnClick}
                    className='basic text-4xl p-5 m-5 rounded-2xl hover:bg-red-700 bg-base-300 transition-all duration-200'>
                    LogIn
                </button>
            </section>

            <div className={`loader ${hidden2}`}></div>
            
        </div>
    );
}

export default Login2;
