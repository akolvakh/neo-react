import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/api";
import CamperInfo from "../../components/CamperInfo/CamperInfo";
import Gallery from "../../components/Gallery/Gallery";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import styles from "./Details.module.css";

const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "features"
  );
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCamperData = async () => {
      try {
        const response = await api.fetchCamperDetails(id);
        setCamper(response);
      } catch (e) {
        setError("Failed to load camper details");
        toast.error("Failed to load camper details");
      } finally {
        setLoading(false);
      }
    };
    fetchCamperData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.detailsContainer}>
      <Toaster position="top-right" reverseOrder={false} />
      {error && <div>{error}</div>}
      <div className={styles.camperTopInfo}>
        <CamperInfo
          name={camper?.name}
          rating={camper?.rating}
          location={camper?.location}
          price={camper?.price}
          reviews={camper?.reviews}
        />
        <Gallery gallery={camper?.gallery} name={camper?.name} />
        <p className={styles.camperDescription}>{camper?.description}</p>
      </div>
      <div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.flexContainer}>
          {activeTab === "features" ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper?.reviews} />
          )}
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default Details;
