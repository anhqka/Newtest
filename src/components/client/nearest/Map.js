import React, { useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { BiNavigation } from 'react-icons/bi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlinePhone } from 'react-icons/ai';
import { RiVideoAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { fetchAllInfoInOrders, setIndexServiceSelected, setListServiceSelected, setSylist } from 'page/client/Orders/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';



const apiKey = "AIzaSyAKjzo9xWrPixaFhBnb9uerRNpATN1xTng"

const mapStyles = {
    height: "50vh",
    width: "100%"
};

const Map = ({ distance }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch(0)
    const [map, setMap] = React.useState(null)
    const [selected, setSelected] = useState({})
    const { orders } = useSelector(data => data);
    const [center, setCenter] = useState({
        id: distance[0].destinationCoords.id,
        name: distance[0].destinationCoords.name,
        address: distance[0].destinationCoords.address,
        phone: distance[0].destinationCoords.phone,
        lat: parseFloat(distance[0].destinationCoords?.latitude),
        lng: parseFloat(distance[0].destinationCoords?.longitude)
    })
    const onSelect = item => {
        setSelected({
            name: item.name,
            location: {
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lng)
            }
        })
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const routingMap = (center) => {
        let res = center.address.replace(/ /g, "+");
        const url = res + `/@${center.lat + "," + center.lng}`
        window.open(`https://www.google.com/maps/dir//${url}`).focus();
    }

    const routingBigMap = (center) => {
        let res = center.address.replace(/ /g, "+");
        const url = res + `/@${center.lat + "," + center.lng}`
        window.open(`https://www.google.com/maps/place/${url}`).focus();
    }

    const handleOrders = (store) => {
        navigate(`/orders/service`)
        dispatch(fetchAllInfoInOrders("services/" + store.id))
        if(store.id === orders.allInfoOrders.data.id){
            console.log('old store');
        }else{
            dispatch(setIndexServiceSelected([]))
            dispatch(setListServiceSelected([]))
            dispatch(setSylist({}))
        }
        
    }

   
    return isLoaded ? (
        <div className='flex flex-col relative bg-[#f5f5f5]'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {
                    center.lat ?
                        <Marker
                            position={center}
                            draggable={false}
                            zoom={10}
                            onClick={() => onSelect(center)}
                        /> :
                        null
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
            <div className='absolute top-0 left-0 p-3 '>
                <div className='flex max-w-[250px] text-justify bg-white p-3 items-center md:items-start rounded-sm'>
                    <div className='mr-5 space-y-1 '>
                        <p className='text-[12px] m-0 font-semibold'>{center.name}</p>
                        <p className='text-[12px] font-normal m-0 hidden md:block'>{center.address}</p>
                        <p className='text-[12px] font-normal m-0 text-blue-500 cursor-pointer hidden md:block' onClick={() => routingBigMap(center)}>Xem bản đồ lớn hơn</p>
                    </div>
                    <div className='flex flex-col whitespace-nowrap items-center md:space-y-2 cursor-pointer ' onClick={() => routingMap(center)}>
                        <BiNavigation className='text-blue-500 mt-1' />
                        <p className='text-[9px] md:text-[12px] font-normal m-0 text-blue-500' >Chỉ đường</p>
                    </div>
                </div>
            </div>
            <div className='container flex flex-col mt-6'>
                <div className='flex flex-col px-3 bg-white'>
                    <div>
                        <h3 className="font-semibold text-2xl mt-3 mb-0">Địa chỉ Bbarber</h3>
                    </div>
                    <div className='grid space-y-3 justify-between mt-3 md:grid-cols-2  mb-6'>
                        <div className='col-span-1 flex items-center'>
                            <div className='flex items-center space-x-3'>
                                <FiMapPin className='text-xl ' />
                                <p className='font-semibold text-sm m-0'> {center.address}</p>
                            </div>
                        </div>
                        <div className='col-span-1 flex flex-col justify-between items-center md:flex-row space-y-3 md:space-y-0'>
                            <div className='flex items-center space-x-3'>
                                <AiOutlinePhone className='text-xl' />
                                <p className='font-semibold text-xl m-0' > {center.phone}</p>
                            </div>
                            <div className='flex space-x-3 items-center cursor-pointer bg-[#B4975A] p-2 mb-3'>
                                <RiVideoAddLine className='text-xl text-white' />
                                <p className='font-semibold text-lg uppercase m-0 text-white font-sans' onClick={() => handleOrders(center)}> Đặt lịch cắt</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-3 mt-6'>
                    <div>
                        <h3 className="font-semibold text-2xl mt-3 mb-0 uppercase">Salon gần nhất</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {distance?.map((store, index) => {
                            return (
                                <div key={index} class="relative mx-auto w-full" onClick={() => setCenter({
                                    id: store.destinationCoords.id,
                                    name: store.destinationCoords.name,
                                    address: store.destinationCoords.address,
                                    phone: store.destinationCoords.phone,
                                    lat: parseFloat(store.destinationCoords.latitude),
                                    lng: parseFloat(store.destinationCoords.longitude)
                                })}>
                                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                                        <div class="shadow p-4  bg-white">
                                            <div class="flex justify-center relative  overflow-hidden h-52">
                                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                                    <img class="absolute inset-0" src={store.destinationCoords.image} alt="" />
                                                </div>
                                                <span class="absolute top-0 left-0 inline-flex p-1 z-10 bg-[#B4975A] text-sm font-medium text-white select-none">
                                                    Cách {store.distanceInKilometers.toFixed(1)} KM
                                                </span>
                                            </div>

                                            <div class="mt-4">
                                                <p class="mt-2 text-sm text-gray-800 line-clamp-3 md:min-h-[4em]" >
                                                    123 {store.destinationCoords.address}
                                                </p>
                                            </div>

                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    ) : <></>
}
export default Map