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
        navigate('/Banner');
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
    <div className="container mt-5">
      <h1>Edit banner</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="title"
            value={banners.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="description"
            value={banners.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input type="file" className="form-control-file form-control-sm" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 img-fluid" />}
        </div>

        <div className="btn-group">
          <button type="button" className="btn btn-primary btn-sm" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/banner')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBanner;
