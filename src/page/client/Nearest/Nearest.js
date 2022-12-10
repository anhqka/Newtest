import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Map from "components/client/nearest/Map";
import { fetchStoresAsynk, setLoading } from "../../admin/Store/StoreSlice";

const Nearest = () => {
    let distance = []
    let distanceLocationStore = []
    let currentLocation = {}
    const { stores } = useSelector((data) => data);
    const [currentPosition, setCurrentPosition] = useState({})
    const dispatch = useDispatch()
    console.log(stores.loading);
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(fetchStoresAsynk())
            .then(() => {
                navigator.geolocation.getCurrentPosition(position => {
                    setCurrentPosition(position.coords)
                })
            })      
    }, []);

    const calcDistance = (startingCoords, destinationCoords) => {
        let startingLat = degreesToRadians(startingCoords.latitude);
        let startingLong = degreesToRadians(startingCoords.longitude);
        let destinationLat = degreesToRadians(destinationCoords.latitude);
        let destinationLong = degreesToRadians(destinationCoords.longitude);

        let radius = 6571;

        let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
            Math.cos(startingLat) * Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)) * radius;

        return {
            distanceInKilometers,
            destinationCoords
        };
    }
    function degreesToRadians(degrees) {
        var radians = (degrees * Math.PI) / 150;
        return radians;
    }
    if (currentPosition.latitude && currentPosition.latitude > 0) {
        
        currentLocation = {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
        }
        stores.stores.data.data.map((store) => {
            let result = calcDistance(currentLocation, store)
            distanceLocationStore = [...distanceLocationStore, result]
        })
        distance = distanceLocationStore?.sort((a, b) => a.distanceInKilometers - b.distanceInKilometers)
    }

    return (
        <div className="bg-[#f5f5f5]">
            <div className="text-center mt-5 ">
                <h3 className="font-semibold text-2xl pt-3 py-1">Vị trí của BBarber</h3>
            </div>
            <Spin spinning={stores?.loading}>
                {distance.length > 0 && <Map distance={distance} />}
            </Spin>
            
        </div>
    )
}

export default Nearest