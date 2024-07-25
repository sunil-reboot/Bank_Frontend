import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

export default function ConfigureBtcRate() {
  const [btcRate, setBtcRate] = useState('');
  const [latestBtcRate, setLatestBtcRate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLatestBtcRate();
  }, []);

  const fetchLatestBtcRate = () => {
    fetch('https://exchange-btc.in:8080/getCurrentBtcRate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json', // Include any other headers you might need
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLatestBtcRate(data.btcRate);
        console.log("Testing the btc rate " + data.btcRate);
      })
      .catch((error) => {
        console.error('Error fetching BTC rate:', error);
      });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const regex = /^\d*\.?\d*$/; // Allow only decimal values or integers
    if (regex.test(value)) {
      setBtcRate(value);
      setError('');
    } else {
      setError('Please enter a valid decimal or integer value.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (btcRate === '') {
      setError('BTC rate cannot be empty.');
      return;
    }

    try {
      const response = await fetch('https://exchange-btc.in:8080/configureBtcRate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ btcRate: parseFloat(btcRate) }),
      });

      if (response.ok) {
        alert('BTC rate configured successfully.');
        setBtcRate('');
        fetchLatestBtcRate(); // Fetch the latest BTC rate after configuring
      } else {
        setError('Error configuring BTC rate.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error configuring BTC rate.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#ffffcc' }}>
        <div className="card" style={{ width: '400px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Configure USDT Rate</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="btcRate" className="col-form-label">USDT Rate</label>
                <input
                  type="text"
                  className="form-control"
                  id="btcRate"
                  placeholder="Enter USDT rate"
                  value={btcRate}
                  onChange={handleInputChange}
                />
                {error && <small className="text-danger">{error}</small>}
              </div>
              <div className="d-flex justify-content-center align-items-center pt-3">
                <button type="submit" className="btn btn-primary btn-lg">
                  Configure
                </button>
              </div>
            </form>
            {latestBtcRate !== null && (
              <div className="mt-4 text-center">
                <h2>Latest USDT Rate: {latestBtcRate}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
