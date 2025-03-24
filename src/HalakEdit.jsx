import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const HalakEdit = () => {
    const [hal, setHal] = useState({
        nev: "",
        faj: "",
        meret: "",
        toId : 0,
        kep: "",
    });
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
                console.error('Hiba történt a hal módosításakor :', error);
            }
        };  
        fetchHal();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://halak.onrender.com/api/Halak/${id}`, hal);
            alert("Hal adatai sikeresen frissítve!")
            navigate("/");
        } catch (error) {
            console.error('Hiba történt a hal módosításakor :', error);
        }
    };

    if (loading) {
        return <p className="loading">Töltés...</p>;
    }

    return (
        <div className="container my-4">
      <h1 className="text-center text-white mb-4">Hal módosítása</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nev" className="form-label">Hal neve</label>
          <input
            type="text"
            className="form-control"
            id="nev"
            value={hal.nev}
            onChange={(e) => setHal({ ...hal, nev: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="faj" className="form-label">Faj</label>
          <input
            type="text"
            className="form-control"
            id="faj"
            value={hal.faj}
            onChange={(e) => setHal({ ...hal, faj: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="meretCm" className="form-label">Méret (cm)</label>
          <input
            type="number"
            className="form-control"
            id="meretCm"
            value={hal.meretCm}
            onChange={(e) => setHal({ ...hal, meretCm: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="toId" className="form-label">Tó neve</label>
          <input
            type="text"
            className="form-control"
            id="toId"
            value={hal.toId}
            onChange={(e) => setHal({ ...hal, toId: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="kep" className="form-label">Kép</label>
          <input
            type="file"
            className="form-control"
            id="kep"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setHal({ ...hal, kep: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

        </div>
        <button type="submit" className="btn btn-primary">Mentés</button>
      </form>
    </div>
  );
};

export default HalakEdit;