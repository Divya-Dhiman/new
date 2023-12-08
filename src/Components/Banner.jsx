import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css'
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:3001/banner/getBanner');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  function goToAdd() {
    navigate('/AddBanner');
  }

  function Edit(id) {
    navigate(`/EditBanner?id=${id}`);
  }

  async function handleDeleteClick(id) {
    try {
      // Send DELETE request to delete banner with the specified id
      await axios.delete(`http://localhost:3001/banner/deleteBanner/${id}`);
      // Update banners state after successful deletion
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  }

  return (
    <div className="banner-container">
      <button className="add-button" onClick={goToAdd}>
        +
      </button>
      <table className="banner-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={index}>
              <td>{banner.title}</td>
              <td>{banner.description}</td>
              <td>{banner.status}</td>
              <td>
                <img src={banner.imageUrl} alt={banner.title} />
              </td>
              <td>
                <button onClick={() => Edit(banner.id)}>Edit</button>
                <br />
                <button onClick={() => handleDeleteClick(banner.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Banner;
