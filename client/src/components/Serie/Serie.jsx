import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Serie = () => {

  const [show, setShow] = useState(null)
  const { id } = useParams()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const Token = accessToken.access_token
  const client_id = import.meta.env.VITE_REACT_APP_APIKEY

  // get  https://api.betaseries.com/shows/display

  const fetchShowById = async () => {
    const response = await fetch(`https://api.betaseries.com/shows/display?id=${id}&token=${Token}&client_id=${client_id}`, {
      method: 'GET',
    })
    const data = await response.json()
    console.log(data)
    setShow(data)
  }

  useEffect(() => {
    fetchShowById()

    if (show) {
      console.log(show)
    }
  }, [])


  return (
    <div className='h-full overflow-y-scroll'>
      <div className='flex flex-col justify-center items-center gap-5 p-5'>
        <h1 className='text-3xl font-bold text-center text-primary tracking-widest xs:text-xl'>{show?.show.title}</h1>
        <img className='w-[400px] rounded-2xl' src={show?.show.images.poster} alt={show?.show.title} />
        <p className='text-center tracking-widest netflix'>
          <p className='text-primary text-2xl'>
            Release date :
          </p> {show?.show.creation}</p>
        <p className='text-center tracking-widest netflix'>
          <p className='text-primary text-2xl'>
            Synopsis :
          </p>
          {show?.show.description}</p>
        <p className='text-center tracking-widest netflix'>
          <p className='text-primary text-2xl'>
            Rating :
          </p> {show?.show.notes.mean}/5</p>
      </div>
    </div >
  )
}

export default Serie