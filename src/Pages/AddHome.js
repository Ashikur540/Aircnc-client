import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addHome } from '../Api/services';
import { getImageUrl } from '../Api/UploadImage';
import AddServiceForm from '../Components/Form/AddServiceForm';
import { AuthContext } from '../contexts/AuthProvider';

const AddHome = () => {
  const { user } = useContext(AuthContext);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [preview, setPreview] = useState('')
  const [upload, setUpload] = useState('')
  const [uploadText, setUploadText] = useState('Upload Image')
  const [departureDate, setDepartureDate] = useState(
    new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000)
  )
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleAddHome = (event) => {
    event.preventDefault();
    const location = event.target.location.value
    const title = event.target.title.value
    // const from = format(arrivalDate, 'P')
    // const to = format(departureDate, 'P')
    const from = arrivalDate
    const to = departureDate
    const price = event.target.price.value
    const total_guest = event.target.total_guest.value
    const bedrooms = event.target.bedrooms.value
    const bathrooms = event.target.bathrooms.value
    const description = event.target.description.value
    const image = event.target.image.files[0]
    setLoading(true)
    getImageUrl(image)
      .then(ImgUrl => {

        const homeData = {
          location,
          title,
          from,
          to,
          price,
          total_guest,
          bedrooms,
          bathrooms,
          description,
          image: ImgUrl,
          host: {
            host_name: user?.displayName,
            host_image: user?.photoURL,
            host_email: user?.email,
          },
        }
        console.log(homeData);

        addHome(homeData).then(data => {
          console.log(data);
          toast.success('Home added successfully')
          setLoading(false);
          navigate('/dashboard/manage-homes')
        })
          .catch(err => {
            console.log(err.message);
            setLoading(false)
          })
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false)
      })

  }


  const handleImageChang = image => {
    console.log(image)
    setPreview(window.URL.createObjectURL(image))
    setUploadText(image.name)
  }
  return (
    <>
      <h1 className='text-3xl font-bold text-gray-800 py-8 text-center'>
        Add Home
      </h1>
      <AddServiceForm
        handleAddHome={handleAddHome}
        arrivalDate={arrivalDate}
        setArrivalDate={setArrivalDate}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        loading={loading}
        handleImageChang={handleImageChang}
        preview={preview}
        uploadText={uploadText}
      />
    </>
  )
}

export default AddHome
