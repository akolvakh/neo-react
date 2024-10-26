// Details.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../services/api';
import CamperInfo from '../../components/CamperInfo/CamperInfo';
import Gallery from '../../components/Gallery/Gallery';
import Features from '../../components/Features/Features';
import Reviews from '../../components/Reviews/Reviews';
import BookingForm from '../../components/BookingForm/BookingForm';
import TabNavigation from '../../components/TabNavigation/TabNavigation';
import detailsStyles from './Details.module.css';

const Details = () => {
    const { id } = useParams();
    const [camper, setCamper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('features');

    useEffect(() => {
        const fetchCamperData = async () => {
            try {
                const response = await api.fetchCamperDetails(id);
                setCamper(response);
            } catch (e) {
                setError('Failed to load camper details');
                toast.error('Failed to load camper details');
            } finally {
                setLoading(false);
            }
        };
        fetchCamperData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={detailsStyles.detailsContainer}>
            <Toaster position="top-right" reverseOrder={false} />
            {error && <div>{error}</div>}
            <CamperInfo name={camper?.name} rating={camper?.rating} location={camper?.location} price={camper?.price} />
            <Gallery gallery={camper?.gallery} name={camper?.name} />
            <p>{camper?.description}</p>
            <div>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className={detailsStyles.flexContainer}>
                {activeTab === 'features' ? <Features camper={camper} /> : <Reviews reviews={camper?.reviews} />}
                <BookingForm />
            </div>
            </div>
        </div>
    );
};

export default Details;
