import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const HalakList = () => {
  const [halak, setHalak] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHalak = async () => {
      try {
        const response = await axios.get('https://halak.onrender.com/api/Halak');
        setHalak(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Hiba történt a halak lekérésekor:', error);
        setLoading(false);
      }
    };

    fetchHalak();
  }, []); 

  const handleEdit = (halId) => {
    navigate(`/halak/modositas/${halId}`);
  };


  if (loading) {
    return <p className="loading">Töltés...</p>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center text-white mb-4">Halak</h1>
      <div className="row">
        {halak.map((hal) => (
          <div key={hal.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              {hal.kep && (
                <img
                  src={`data:image/jpeg;base64,${hal.kep}`}
                  alt={hal.nev}
                  className="card-img-top"
                  style={{
                    height: '200px',
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
                  <button className="btn btn-warning" onClick={() => handleEdit(hal.id)}>
                    <i className="bi bi-pencil-square"></i> Módosítás
                  </button>
                  <Link to={`/hal/${hal.id}`} className="btn btn-info">
                    <i className="bi bi-info-circle"></i> Részletek
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HalakList;