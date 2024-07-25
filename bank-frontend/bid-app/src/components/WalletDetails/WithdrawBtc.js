import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";

export default function WithdrawBtc() {
  const [btcQty, setBtcQty] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    bankAccountId: "",
    accountHolderName: "",
    ifsc: "",
    upiId: "",
    isActive: false
  });
  const [toggleEnabled, setToggleEnabled] = useState(false);

  useEffect(() => {
    // Fetch available BTC quantity when the component mounts
    fetch('https://exchange-btc.in:8080/getAvailableBtcQty', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setBtcQty(data);
      })
      .catch(error => {
        console.error('Error fetching BTC quantity:', error);
      });

    // Fetch user bank details when the component mounts
    const phoneNumber = localStorage.getItem('authToken');
    if (phoneNumber) {
      fetch(`https://exchange-btc.in:8080/getThisUserBankDetails`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            setBankDetails({
              bankAccountId: data.bankAccountId || "",
              accountHolderName: data.accountHolderName || "",
              ifsc: data.ifsc || "",
              upiId: data.upiId || "",
              isActive: data.active || false
            });
            setToggleEnabled(data.active); // Ensure this line is correct
          }
        })
        .catch(error => {
          console.error('Error fetching user bank details:', error);
        });
    } else {
      console.error('Phone number not found in localStorage.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const valid = {
      accountHolderName: /^[a-zA-Z0-9 ]*$/,
      upiId: /^[a-zA-Z0-9.@]*$/,
      bankAccountId: /^[a-zA-Z0-9]*$/,
      ifsc: /^[a-zA-Z0-9]*$/
    };
    if (valid[name].test(value)) {
      setBankDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const isWithdrawButtonEnabled = () => {
    const { bankAccountId, accountHolderName, ifsc, upiId } = bankDetails;
    const isBankDetailsValid = bankAccountId && accountHolderName && ifsc && /^[a-zA-Z0-9]*$/.test(bankAccountId) && /^[a-zA-Z0-9 ]*$/.test(accountHolderName) && /^[a-zA-Z0-9]*$/.test(ifsc);
    const isUPIValidFormat = upiId && /^[a-zA-Z0-9.@]*$/.test(upiId);
    return toggleEnabled ? (isBankDetailsValid || isUPIValidFormat) && (bankAccountId || upiId) : true;
  };

  const handleWithdraw = () => {
    if (isWithdrawButtonEnabled()) {
      if (!toggleEnabled) {
        // Call API to deactivate bank details
        fetch('https://exchange-btc.in:8080/deactivateBankDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ isActive: false }) // Pass boolean param
        })
        .then(response => response.json())
        .then(data => {
          alert('Bank details deactivated successfully');
        })
        .catch(error => {
          console.error('Error deactivating bank details:', error);
        });
      } else {
        // Ensure isActive is true when toggle is enabled
        const updatedBankDetails = { ...bankDetails, isActive: true };

        // Proceed with normal withdrawal
        fetch('https://exchange-btc.in:8080/saveBtcWithdrawRecords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(updatedBankDetails)
        })
        .then(response => response.json())
        .then(data => {
          alert('Bank details saved successfully');
        })
        .catch(error => {
          console.error('Error saving bank details:', error);
        });
      }
    } else {
      alert('Please fill either bank account details or UPI ID with valid format');
    }
  };

  const handleToggleChange = () => {
    const newToggleState = !toggleEnabled;
    setToggleEnabled(newToggleState);

    if (!newToggleState) {
      // Call API to deactivate bank details
      fetch('https://exchange-btc.in:8080/deactivateBankDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ isActive: false }) // Pass boolean param
      })
      .then(response => response.json())
      .then(data => {
        alert('Bank details deactivated successfully');
        setBankDetails(prevState => ({
          ...prevState,
          isActive: false
        }));
      })
      .catch(error => {
        console.error('Error deactivating bank details:', error);
      });
    } else {
      // When enabling the toggle, set isActive to true
      setBankDetails(prevState => ({
        ...prevState,
        isActive: true
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <section style={{ backgroundColor: "#ffffcc" }}>
          <div className="container py-5">
            <div className="card">
              <div className="card-body">
                <div className="row d-flex justify-content-center pb-5">
                  <div className="col-md-7 col-xl-7 mb-4 mb-md-0">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h4 className="accordion-header mx-3 my-3">
                          <strong>Withdraw Account Details</strong>
                        </h4>
                        <p></p>
                        <p className="mx-3">
                          * कृपया या तो बैंक खाता विवरण करें ।
                        </p>
                        <hr />
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-left pb-2 ms-12">
                              <div className="d-flex align-items-left ms-12">
                                <div class = "ms-6">
                                  <p className="me-3 mb-0">
                                    <b>
                                      Balance{" "}
                                      <span className="text-success">
                                        <i className="bi bi-currency-rupee"></i>
                                        {btcQty !== null ? btcQty : "0"}
                                      </span>
                                    </b>
                                  </p>
                                </div>
                                <div className="form-check form-switch ms-6">
                                  <input
                                    className="form-check-input mx-1 ms-6"
                                    type="checkbox"
                                    id="toggleButton"
                                    checked={toggleEnabled}
                                    onChange={handleToggleChange}
                                  />
                                  {/* <label
                                    className="form-check-label mx-4 ms-6 mb-0"
                                    htmlFor="toggleButton"
                                  >
                                    Enable
                                  </label> */}
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex flex-wrap pb-3">
                              <div className="col-md-4 p-2">
                                Bank Account Number :
                              </div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Bank Account Number"
                                name="bankAccountId"
                                value={bankDetails.bankAccountId}
                                onChange={handleInputChange}
                                disabled={!toggleEnabled}
                              />
                            </div>
                            <div className="d-flex flex-wrap pb-3">
                              <div className="col-md-4 p-2">Bank Account Name :</div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Bank Account Name"
                                name="accountHolderName"
                                value={bankDetails.accountHolderName}
                                onChange={handleInputChange}
                                disabled={!toggleEnabled}
                              />
                            </div>
                            <div className="d-flex flex-wrap pb-3">
                              <div className="col-md-4 p-2">IFSC Code :</div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="IFSC Code"
                                name="ifsc"
                                value={bankDetails.ifsc}
                                onChange={handleInputChange}
                                disabled={!toggleEnabled}
                              />
                            </div>
                            {/* <hr />
                            <div className="d-flex flex-wrap pb-3">
                              <div className="col-md-4 p-2">UPI Details: </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Upi Id"
                                name="upiId"
                                value={bankDetails.upiId}
                                onChange={handleInputChange}
                                disabled={!toggleEnabled}
                              />
                            </div> */}
                            <hr />
                            <div className="d-flex flex-wrap pb-3">
                              <input
                                type="button"
                                value="Withdraw"
                                className="btn btn-primary btn-block btn-lg"
                                disabled={!isWithdrawButtonEnabled()}
                                onClick={handleWithdraw}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
