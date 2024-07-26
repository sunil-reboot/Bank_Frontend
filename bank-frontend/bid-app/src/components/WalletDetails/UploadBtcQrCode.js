import Navbar from '../Navbar'
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadBtcQrCode() {

    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });
            alert("User uploaded successfully");
            console.log('User uploaded successfully:', response.data);
        } catch (error) {
            alert("Error while uploading");
            console.error('Error uploading user:', error);
        }
    };
  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit}>
            <div>
                <label>File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <button type="submit">Upload</button>
        </form>
    </>
  )
}
