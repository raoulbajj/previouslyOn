import React, { useEffect, useState } from 'react';

const Login = () => {

    const [hidden, setHidden] = useState('hidden transition-all duration-200');
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
    } , [rotation])

    const reverseHiddenOnClick = () => {
        if (hidden === 'hidden transition-all duration-200') {
            setHidden('flex flex-col items-center justify-center p-2 xs:p-0 tracking-widest transition-all duration-200 text-2xl italic thisIsTheWay')
        } else {
            setHidden('hidden transition-all duration-200')
        }
    }

    return (
        <div className='w-full flex flex-grow items-center justify-center'>
            <section className='bg-login-form rounded-2xl flex flex-col justify-center items-center border-2 border-neutral-800 p-2 xxs:p-0 transition-all duration-400'>
                <div
                    onClick={reverseHiddenOnClick}
                    className={`${rotation} rounded-full bg-red-700 m-3 mt-5 border-2 hover:border-black transition-all duration-200 hover:scale-95 active:scale-125 cursor-pointer`}>
                    <img src="../../src/assets/helmets-PNG/MandoHelmet6.png" alt="Hey Mandooooo !!!" width='100px' className='red-mando rounded-full transition-all duration-200' />
                </div>

                <p className={hidden}>THIS IS THE WAY !</p>

                <div className='flex flex-col items-center justify-center p-2 xs:p-0'>
                    <input className='bg-login-input rounded-2xl p-2 m-2 tracking-widest transition-all duration-200 w-full xs:w-5/6 outline-red-600' type='text' placeholder='Username' />
                    <input className='bg-login-input rounded-2xl p-2 m-2 tracking-widest transition-all duration-200 w-full xs:w-5/6 outline-red-600' type='password' placeholder='Password' />
                    <button onClick={rotateOnClick} className='bg-login-btn rounded-xl p-2 m-2 mt-4 tracking-wide text-2xl basic transition-all duration-200 hover:bg-red-300 active:bg-slate-600 active:text-white active:scale-90 hover:text-red-800 hover:scale-110'>
                        Login
                    </button>
                </div>

                <a href="">
                    <p className='tracking-widest text-neutral-400 hover:text-white transition-all duration-200 text-sm italic m-2 mt-0'>Inscrivez-vous !</p>
                </a>

            </section>
        </div >
    )
}

export default Login
