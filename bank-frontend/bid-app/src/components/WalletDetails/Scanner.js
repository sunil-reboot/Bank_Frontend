import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Scanner() {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchLatestImage = async () => {
            try {
                // Fetch the latest image URL
                const urlResponse = await axios.get('https://exchange-btc.in:8080/image/latest', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const s3Url = urlResponse.data;

                // Extract the key from the S3 URL
                const key = s3Url.split('/').slice(3).join('/'); // Adjust this based on your URL structure

                // Fetch the image from the backend using the key
                const imageResponse = await axios.get(`https://exchange-btc.in:8080/image/${key}`, {
                    responseType: 'blob',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                const url = URL.createObjectURL(imageResponse.data);
                setImageSrc(url);
            } catch (error) {
                console.error('Error fetching the image from backend', error);
            }
        };

        fetchLatestImage();

        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, []);

    return (
        <div className="col-md-12 col-xl-7 offset-xl-1" style={{ backgroundColor: "#f8f9fa", alignItems: 'center' }}>
            <div className="rounded d-flex flex-column p-12">
                <div className="p-2 me-3">
                    <h4 className="text-center">Scan And Pay</h4>
                </div>
                <div className="p-2 d-flex text-center">
                    {imageSrc ? (
                        <div style={{ width: '300px', height: '170px', overflow: 'hidden' }}>
                            <img src={imageSrc} className="rounded mx-auto d-block" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <p>Loading image...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
