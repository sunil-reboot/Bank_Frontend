import React, { useState } from 'react';
import Navbar from '../Navbar';
import '../Navbar.css'; // Ensure you import the CSS file

export default function NominateUser() {
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('');
  const [isSelected, setIsSelected] = useState('no');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRelationChange = (event) => {
    setNomineeRelation(event.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isFormValid = () => {
    return (
      nomineeName &&
      validateEmail(nomineeEmail) &&
      nomineeRelation &&
      isSelected === 'no'
    );
  };

  const handleSubmit = async () => {
    if (!validateEmail(nomineeEmail)) {
      setErrorMessage('Invalid email format');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const nomineeDetails = {
      nomineeName,
      email: nomineeEmail,
      relation: nomineeRelation,
    };

    try {
      const response = await fetch('http://localhost:8080/inviteNominee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(nomineeDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Nominee invited successfully:', data);
      setSuccessMessage('Request sent to nominee successfully!');
      // Clear form fields
      setNomineeName('');
      setNomineeEmail('');
      setNomineeRelation('');
      setIsSelected('no');
    } catch (error) {
      console.error('Error inviting nominee:', error);
      setErrorMessage('Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container rules-container">
        <form>
          <div className="row">
            <div className="col">
              <input type="text" readOnly className="form-control-plaintext" id="nName" value="Nominee Name" />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nominee Name"
                value={nomineeName}
                onChange={(e) => setNomineeName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text" readOnly className="form-control-plaintext" id="nEmail" value="Nominee email" />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nominee Email"
                value={nomineeEmail}
                onChange={(e) => setNomineeEmail(e.target.value)}
              />
              {errorMessage && <small className="text-danger">{errorMessage}</small>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text" readOnly className="form-control-plaintext" id="nRelation" value="Nominee Relation" />
            </div>
            <div className="col">
              <select className="form-control" value={nomineeRelation} onChange={handleRelationChange}>
                <option value="">Select Relation</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Financial Advisor">Financial Advisor</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationRadioButton"
                  id="yesRadioButton"
                  value="yes"
                  checked={isSelected === 'yes'}
                  onChange={(e) => setIsSelected(e.target.value)}
                />
                <label className="form-check-label" htmlFor="yesRadioButton">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationRadioButton"
                  id="noradioButton"
                  value="no"
                  checked={isSelected === 'no'}
                  onChange={(e) => setIsSelected(e.target.value)}
                />
                <label className="form-check-label" htmlFor="noradioButton">
                  No
                </label>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSelected === 'yes' || !isFormValid() || loading}
            onClick={handleSubmit}
          >
            Send Request
          </button>
          {loading && <div>Loading...</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </form>
      </div>
    </>
  );
}
