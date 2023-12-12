import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBanner() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleCreateBanner = async () => {
    try {
      let imageDataUrl = '';

      if (imageFile) {
        imageDataUrl = await convertImageToBase64(imageFile);
      }

      await axios.post('http://localhost:3001/banner/createBanner', {
        title,
        description,
        imageUrl: imageDataUrl,
      });
      navigate('/Banner');
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
    }
  };

  return (
   <div className="container  p-0">
  <div className="row justify-content-center ">
    <div className="col-md-6">
      <h2>Create Banner</h2>
      <form>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="form-control form-control-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" className="form-control form-control-sm" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" className="form-control-file form-control-sm" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-group text-center btn btn-secondary btn-sm">
          <button type="button" className="btn btn-primary" onClick={handleCreateBanner}>
            Create Banner
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}

export default AddBanner;
