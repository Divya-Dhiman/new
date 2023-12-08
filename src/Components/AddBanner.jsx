import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function AddBanner({ onClose, onBannerCreated }) {
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

      const response = await axios.post('http://localhost:3001/banner/createBanner', {
        title,
        description,
        imageUrl: imageDataUrl,
      });
      navigate('/Banner');

      onBannerCreated(response.data);
      onClose();
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
    <div className="create-form">
      <h2>Create Banner</h2>
      <form>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />
      <button onClick={handleCreateBanner}>Create Banner</button>
      </form>
    </div>
  );
}

export default AddBanner;
