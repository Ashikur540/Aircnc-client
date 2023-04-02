import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const WhosComing = ({ setSelectedIndex, setBookingData, bookingData }) => {
  const { user } = useContext(AuthContext)
  const host = user

  return (
    <>
      <h1 className='text-2xl font-bold'>Traveling for work?</h1>
      <div className='flex gap-10 flex-wrap-justify-between'>
        <div>
          <p className='my-3 text-gray-500'>Say hello to your host</p>
          <p className='my-3 text-gray-500'>
            Let {host?.name} know a little about yourself and why you're coming.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img
            alt=''
            className='w-16 h-16 border rounded-full'
            src={host?.photoURL}
          />
          <p>{host?.displayName}</p>
        </div>
      </div>
      <textarea
        className='border block my-5 p-2'
        placeholder={`Hello, I am  ${host?.displayName}! Cant wait to spend 4 night in your hotel etc..`}
        name=''
        id=''
        cols='60'
        rows='10'
        value={bookingData.message}
        // just updating the booking data 
        onChange={(e) => setBookingData({
          ...bookingData, message: e.target.value
        })}
      ></textarea>
      <button
        className='py-2 px-4 rounded-md hover:text-gray-100 bg-gradient-to-r from-emerald-500 to-lime-500 text-white'
        onClick={() => setSelectedIndex(2)}
      >
        Continue
      </button>
    </>
  )
}

export default WhosComing
