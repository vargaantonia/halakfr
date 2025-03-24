import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const HalakDetails = () => {
    const [hal, setHal] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHal = async () => {
            try {
                const response = await axios.get(`https://halak.onrender.com/api/Halak/${id}`);
                setHal(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Hiba történt a hal lekéréskor:', error);
                setLoading(false);
            }
        }; 

        fetchHal();
    }, [id]);

    const handleEdit = () => {
        navigate(`/halak/modositas/${id}`);
      };

      const handleGoBack = () => {
        navigate(-1);
      };


      if (loading) {
        return <p className="loading">Töltés...</p>;
      }
    
      if (!hal) {
        return <p>Hal nem található!</p>;
      } 

    return (
        <div className="container my-4">
        <h1 className="text-center text-white mb-4">{hal.nev} részletei</h1>
        <div className="card shadow-sm">
          {hal.kep && (
            <img
              src={`data:image/jpeg;base64,${hal.kep}`}
              alt={hal.nev}
              className="card-img-top"
              style={{
                height: '300px',
                objectFit: 'cover',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
              }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{hal.nev}</h5>
            <p className="card-text">
              <strong>Faj:</strong> {hal.faj}
            </p>
            <p className="card-text">
              <strong>Méret:</strong> {hal.meretCm} cm
            </p>
            <p className="card-text">
              <strong>Tó neve:</strong> {hal.toId}
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-warning" onClick={handleEdit}>
                <i className="bi bi-pencil-square"></i> Módosítás
              </button>
              <button className="btn btn-secondary" onClick={handleGoBack}>
                <i className="bi bi-arrow-left"></i> Vissza
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HalakDetails;

