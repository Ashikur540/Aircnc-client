import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { updateHome } from '../../Api/services'
import { getImageUrl } from '../../Api/UploadImage'
import UpdateServiceForm from '../Form/UpdateService'

const EditModal = ({ setIsEditModalOpen, isOpen, home, fetchHomes }) => {
    // kisu state nia initiallly value gula dekhabbo database theke load kore ene like : home
    const [loading, setLoading] = useState(false)
    const [arrivalDate, setArrivalDate] = useState(new Date(home?.from))
    const [departureDate, setDepartureDate] = useState(new Date(home?.to))
    // initially db theke oi specific home ta asbe then amra update korle state dia update korbo
    const [homeData, setHomeData] = useState({
        ...home,
        from: arrivalDate,
        to: departureDate
    })
    // will come from from element then we will update this is our state
    const handleImageUpdate = image => {
        setLoading(true);
        getImageUrl(image)
            .then(res => {
                console.log(res);
                setHomeData({
                    ...homeData,
                    image: res
                })
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }


    const handleSubmit = event => {
        event.preventDefault()
        // this will we the updated homeData
        console.log(homeData);
        // as we are using put mathod here so notun kore akta object make hobe mongo te with new id ..tai ager id conflict korte pare...so _id ta delete kore row updated data ta backend e pathabo

        const updatedHouseData = Object.assign({}, { ...homeData })
        delete updatedHouseData._id
        // console.log('after Delete', updatedHouseData);
        setLoading(true);
        updateHome(updatedHouseData)
            .then(data => {
                console.log(data);
                toast.success("home Updated")
                setLoading(false)
                fetchHomes();
                setIsEditModalOpen(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsEditModalOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-medium leading-6 text-gray-900'
                                >
                                    Update Home Info
                                </Dialog.Title>
                                <div className='mt-2'>
                                    <UpdateServiceForm
                                        handleSubmit={handleSubmit}
                                        arrivalDate={arrivalDate}
                                        setArrivalDate={setArrivalDate}
                                        departureDate={departureDate}
                                        setDepartureDate={setDepartureDate}
                                        homeData={homeData}
                                        setHomeData={setHomeData}
                                        handleImageUpdate={handleImageUpdate}
                                        loading={loading}
                                    />
                                </div>
                                <hr className='mt-8 ' />
                                <div className='mt-2 '>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={() => setIsEditModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditModal