import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NomineeSuggestions.css'; // Import the CSS file for styling

export default function NomineeSuggestions() {
  const { id } = useParams();  // Capture the dynamic part of the URL
  const [suggestions, setSuggestions] = useState(null);
  const [generalSuggestions, setGeneralSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFund, setSelectedFund] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/client/auth/nomineeSuggestions/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSuggestions(data.recommendation);
      } catch (error) {
        setError('Failed to load suggestions');
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [id]);

  const fetchGeneralSuggestions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/client/auth/generalSuggestions/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGeneralSuggestions(data);
    } catch (error) {
      setError('Failed to load general suggestions');
      console.error('Error fetching general suggestions:', error);
    }
  };

  const handleRadioChange = (fund) => {
    setSelectedFund(fund);
  };

  const handleNominate = async () => {
    if (!selectedFund) {
      alert('Please select a fund to nominate.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/client/auth/suggestedFund/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedFund),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Nomination successful:', result);
    } catch (error) {
      console.error('Error submitting nomination:', error);
    }
  };

  return (
    <div className="container">
      <div className="user-details">
        <h3>User Details</h3>
        <p><strong>Name:</strong> XYZ</p>
        <p><strong>Balance:</strong> 2000.00</p>
        <p><strong>Avg Monthly Spendings:</strong> 8000.00</p>
        <p><strong>Avg Monthly Savings:</strong> 2000.00</p>
      </div>
      <h2>Bank Suggestions</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {suggestions ? (
        <>
          <h3>Plans</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Type</th>
                <th>ROI (%)</th>
                <th>Risk Level</th>
                <th>Frequent Withdrawal</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.plans.map((plan, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="radio"
                      name="fund"
                      onChange={() => handleRadioChange(plan)}
                    />
                  </td>
                  <td>{plan.name}</td>
                  <td>{plan.type}</td>
                  <td>{plan.roi}</td>
                  <td>{plan.risk_level}</td>
                  <td>{plan.frequent_withdrawal ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Mutual Funds</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Type</th>
                <th>ROI (%)</th>
                <th>Risk Level</th>
                <th>Frequent Withdrawal</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.mutual_funds.map((fund, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="radio"
                      name="fund"
                      onChange={() => handleRadioChange(fund)}
                    />
                  </td>
                  <td>{fund.name}</td>
                  <td>Mutual Fund</td>
                  <td>{fund.average_roe}</td>
                  <td>{fund.risk_level}</td>
                  <td>{fund.frequent_withdrawal ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Stocks</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Type</th>
                <th>ROI (%)</th>
                <th>Risk Level</th>
                <th>Frequent Withdrawal</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.stocks.map((stock, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="radio"
                      name="fund"
                      onChange={() => handleRadioChange(stock)}
                    />
                  </td>
                  <td>{stock.name}</td>
                  <td>Stock</td>
                  <td>{stock.average_roe}</td>
                  <td>{stock.risk_level}</td>
                  <td>{stock.frequent_withdrawal ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p><a href="#" onClick={(e) => {e.preventDefault(); fetchGeneralSuggestions();}}>View All Funds</a></p>

          {generalSuggestions.length > 0 && (
            <>
              <h3>All Funds</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Risk Level</th>
                    <th>ROI</th>
                    <th>Investment Period</th>
                    <th>Frequent Withdrawal</th>
                  </tr>
                </thead>
                <tbody>
                  {generalSuggestions.map((fund, index) => (
                    <tr key={fund.id}>
                      <td>
                        <input
                          type="radio"
                          name="fund"
                          onChange={() => handleRadioChange(fund)}
                        />
                      </td>
                      <td>{fund.name}</td>
                      <td>{fund.category}</td>
                      <td>{fund.type}</td>
                      <td>{fund.riskLevel}</td>
                      <td>{fund.returnOnInvestment}</td>
                      <td>{fund.investmentPeriod}</td>
                      <td>{fund.frequentWithdrawal ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <button className="btn btn-primary mt-3" onClick={handleNominate}>Nominate</button>
        </>
      ) : (
        <div>Loading suggestions...</div>
      )}
    </div>
  );
}
