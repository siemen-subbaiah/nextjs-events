import React, { useState } from 'react';
import { API_URL } from '../config';
import styles from '../styles/Form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = ({ eventId, ImageUploaded, token }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('files', image);
      formData.append('ref', 'events');
      formData.append('refId', eventId);
      formData.append('field', 'image');

      setLoading(true);

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        ImageUploaded();
      }
      setLoading(false);
    } else {
      toast.error('Please upload an image!');
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <ToastContainer />
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
      {loading && <h3>Loading...</h3>}
    </div>
  );
};

export default ImageUpload;
