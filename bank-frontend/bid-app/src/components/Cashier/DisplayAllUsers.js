import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function DisplayAllUsers() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [personNames, setPersonNames] = useState({});

  useEffect(() => {
    fetch('https://exchange-btc.in:8080/unApprovedUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
        fetchPersonNames(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchPersonNames = (data) => {
    const names = {};
    data.forEach(item => {
      const phoneNumber = item.phoneNumber;
      fetch(`https://exchange-btc.in:8080/getPersonName?phoneNumber=${encodeURIComponent(phoneNumber)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
        .then(response => response.text())
        .then(name => {
          names[phoneNumber] = name;
          setPersonNames({ ...names });
        })
        .catch(error => {
          console.error('Error fetching person name:', error);
        });
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter(item => {
      const phoneNumber = item.phoneNumber ? String(item.phoneNumber).toLowerCase() : '';
      const buyAmount = item.buyAmount ? String(item.buyAmount).toLowerCase() : '';
      return phoneNumber.includes(query) || buyAmount.includes(query);
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <Navbar />
      <div className='container' style={{ backgroundColor: '#ffffcc', color: 'black', maxWidth: '1900px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
        />
        <table className='table table-bordered table-hover' style={{ backgroundColor: '#ffffcc', color: 'black', maxWidth: '1900px' }}>
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Available balance</th>
              <th>Make Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.phoneNumber}>
                <td>{item.phoneNumber} <br />
                  {personNames[item.phoneNumber] || 'Loading...'}
                </td>
                <td>{item.availableBalance}</td>
                <td>
                  <Link to={`/cashier-payment?phoneNumber=${item.phoneNumber}`}>
                    <button type="button" className="btn btn-success">Pay</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
