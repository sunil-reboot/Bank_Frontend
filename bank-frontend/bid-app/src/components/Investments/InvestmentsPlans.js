import React, { useEffect, useState } from 'react';

export default function InvestmentsPlans() {
    const [generalSuggestions, setGeneralSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFund, setSelectedFund] = useState(null);

    const fetchGeneralSuggestions = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/client/auth/generalSuggestions`);
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

  return (
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
  )
}
