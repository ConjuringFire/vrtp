import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface BreweryMapProps {
    latitude?: string | null;
    longitude?: string | null;
}

const BreweryMap: React.FC<BreweryMapProps> = ({ latitude, longitude }) => {
    // load the google maps API script
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    });

    // display error if loading google maps API fails
    if (loadError) {
        return <p>Error loading maps!</p>;
    }

    // display loading message while google maps API is loading
    if (!isLoaded) {
        return <p>Loading Maps...</p>;
    }

    const mapStyles = {
        height: '400px',
        width: '100%'
    };

    // define center value of map using brewery latitude and longitude
    const center = {
        lat: parseFloat(latitude || '0'),
        lng: parseFloat(longitude || '0')
    };

    return (
        <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={14}>
            <Marker position={center} />
        </GoogleMap>
    );
};

export default BreweryMap;
