import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBanner() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [banners, setBanners] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
    try {
      const response = await fetch(`http://localhost:3001/banner/getBannerById/${id}`);
      const data = await response.json();

      setBanners({
        title: data.title,
        description: data.description,
        image: data.image,
      });
      setImagePreview(data.image);
      console.log('Fetched data:', data);

    } catch (error) {
      console.error('Error Fetching data:', error);
    }
  };
    fetchBanners();
  }, [id]);

  
  

  const handleInputChange = (e) => {
    setBanners({
      ...banners,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/banners/updateBanner/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banners),
      });

      if (response.ok) {
        fetchBanners();
        navigate('/Banner')
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanners((prevBanners) => ({
          ...prevBanners,
          image: reader.result,
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1>Edit banner</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={banners.title}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={banners.description}
          onChange={handleInputChange}
        />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" />}

        <button type="button" onClick={handleUpdate}>
          Update
        </button>
        <button onClick={() => navigate('/banner')}>Cancel</button>
      </form>
      
    </div>

    
  );
}

export default EditBanner;
