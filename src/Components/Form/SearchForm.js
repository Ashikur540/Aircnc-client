import { CalendarIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router'
import PrimaryButton from '../Button/PrimaryButton'

const SearchForm = () => {

  const [location, setLocation] = useState('');
  const [arrivalDate, setArrivalDate] = useState(new Date());
  // same dine ei to ar bar hobe na so.. 1/2 din increae korar jnno ... 
  const [departureDate, setDepartureDate] = useState(new Date(arrivalDate.getTime() + 48 * 60 * 60 * 1000));

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(location, arrivalDate, departureDate);
    // for search function 
    const query = {
      location,
      from: arrivalDate,
      to: departureDate
    }
    console.log(query);
    // send soe data from previous page to new page.. using state  object 
    navigate('/search-result', { state: query })
  }

  return (
    <div className='w-full max-w-sm p-6 m-auto mx-auto'>
      <h1 className='text-xl font-semibold text-gray-700'>
        Where do you want to go
      </h1>

      <form className='mt-6' onSubmit={handleSubmit}>
        <div className='shadow-md rounded-md my-2 p-3'>
          <label
            htmlFor='location'
            className='block text-md font-bold text-gray-800'
          >
            Location
          </label>
          <input
            type='text'
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder='Add city, Landmark or address'
            className='block w-full mt-1 p-1 text-gray-700 bg-white   focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div className='flex justify-between'>
          <div className='shadow-md rounded-md my-2 p-3 flex justify-between items-center'>
            <div>
              <p className='block text-sm text-gray-500'>Arrival</p>
              <DatePicker selected={arrivalDate}

                onChange={(date) => setArrivalDate(date)}
                className='w-2/3' />
            </div>

            <CalendarIcon className='h5 w-5' />
          </div>
          <div className='shadow-md rounded-md my-2 p-3 flex justify-between items-center'>
            <div>
              <p className='block text-sm text-gray-500'>Departure</p>
              <DatePicker selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                className='w-2/3' />
            </div>

            <CalendarIcon className='h5 w-5' />
          </div>
        </div>

        <div className='mt-6'>
          <PrimaryButton
            type='submit'

            classes='w-full px-4 py-2 tracking-wide transition-colors duration-300 transform rounded-md'
          >
            Search
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
