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
    fetchBanners();
  }, [id]);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`http://localhost:3001/banner/getBanner/${id}`);
      const data = await response.json();

      // Update the state with the fetched data
      setBanners({
        title: data.title,
        description: data.description,
        image: data.image, // Assuming your API returns an image URL
      });
      setImagePreview(data.image);
      console.log('Fetched data:', data);

    } catch (error) {
      console.error('Error Fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    // Update the form data as the user types
    setBanners({
      ...banners,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Send updated data to the server
      const response = await fetch(`http://localhost:3001/banners/updateBanner/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banners),
      });

      // Handle response as needed
      if (response.ok) {
        // Fetch updated data after a successful update
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
        // Update only the image property in the state
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
    // Add any additional form submission logic here if needed
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
