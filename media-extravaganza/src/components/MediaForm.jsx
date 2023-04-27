import React, { useState, useEffect } from 'react';
import styles from './mediaform.module.css';
import { motion } from "framer-motion";

function MediaForm() {
  const [picture, setPicture] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const storedPicture = localStorage.getItem('picture');
    if (storedPicture) {
      setPicture(storedPicture);
    }
    const storedVideo = localStorage.getItem('video');
    if (storedVideo) {
      setVideo(storedVideo);
    }
  }, []);

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        localStorage.setItem('picture', base64String);
        setPicture(base64String);
      };
    } else {
      alert('Invalid file type. Please upload an image file.');
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        localStorage.setItem('video', base64String);
        setVideo(base64String);
      };
    } else {
      alert('Invalid file type. Please upload a video file.');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('picture');
    localStorage.removeItem('video');
    setPicture(null);
    setVideo(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.picture}>
        <motion.div
        initial={{ x: -600, scale: 1}}
        animate={{ x: 0}}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
        >
        <label htmlFor="picture">
        <input type="file" id="picture" accept="image/*" onChange={handlePictureChange}/>
        Add a picture
        </label>
        </motion.div>
        {picture && <img src={picture} alt="Uploaded picture" />}
      </div>
      <div className={styles.video}>
        <motion.div
        initial={{ x: -600, scale:1}}
        animate={{ x: 0}}
        transition={{ duration: 0.7 }}
        whileTap={{ scale: 0.95 }}
        >
        <label htmlFor="video">
        <input type="file" id="video" accept="video/*" onChange={handleVideoChange} />
        Add a video
        </label>
        </motion.div>
        {video && <video src={video} controls />}
      </div>
      <motion.div
        initial={{ x: -600, scale:1}}
        animate={{ x: 0}}
        transition={{ duration: 0.6 }}
        whileTap={{ scale: 0.95 }}
        >
      {picture || video ? <button type="button" onClick={handleClear}  className={styles.clear}>Clear</button> : null}
      <button type="submit">Save</button>
      </motion.div>
    </form>
  );
}

export default MediaForm;
