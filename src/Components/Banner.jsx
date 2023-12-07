import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css'
import AddBanner from './AddBanner';

function Banner() {
    const [banners, setBanners] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

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

      const handleAddButtonClick = () => {
        setShowCreateForm(true);
      };
    
      const handleBannerCreated = (newBanner) => {
        setBanners((prevBanners) => [...prevBanners, newBanner]);
      };


  return (
    <div className="banner-container">
     <button className="add-button" onClick={handleAddButtonClick}>
        +
      </button>
      <table className="banner-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Image URL</th>
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
          </tr>
        ))}
      </tbody>
    </table>
    {showCreateForm && (
        <AddBanner onClose={() => setShowCreateForm(false)} onBannerCreated={handleBannerCreated} />
      )}
    </div>
  );
}

export default Banner;
