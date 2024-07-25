import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Scanner from './Scanner';

export default function BuyBtcCustomer() {
  const [quantity, setQuantity] = useState(0);
  const [utrNumber, setUtrNumber] = useState('');
  const [btcQty, setBtcQty] = useState(null);
  const [btcRate, setBtcRate] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [registrationId] = useState('THateTFAxvudDtjvDEpJ3WZjSiXG3u3Ph7'); // Updated Recharge Address
  const [maxTransactionsReached, setMaxTransactionsReached] = useState(false);

  const fetchLatestBtcRate = () => {
    fetch('https://exchange-btc.in:8080/getCurrentBtcRate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBtcRate(data.btcRate);
        console.log("BTC rate fetched: " + data.btcRate);
      })
      .catch((error) => {
        console.error('Error fetching BTC rate:', error);
      });
  };

  useEffect(() => {
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

    fetchLatestBtcRate();
  }, []);

  useEffect(() => {
    if (quantity > 0 && btcRate) {
      setTotalValue(quantity * btcRate);
    } else {
      setTotalValue(null);
    }
  }, [quantity, btcRate]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleUtrNumberChange = (event) => {
    setUtrNumber(event.target.value);
  };

  const isFormValid = () => {
    return quantity >= 100 && utrNumber.trim() !== '';
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const formData = new FormData();
      formData.append('quantity', quantity);
      formData.append('utrNumber', utrNumber);

      fetch('https://exchange-btc.in:8080/saveBtcRecords', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData,
      }).then(response => response.text())
        .then(data => {
          if (data === "Maximum 2 transactions allowed per month") {
            setMaxTransactionsReached(true);
            alert("Only 2 transactions allowed per day. Please try tomorrow.");
          } else {
            alert('Payment details submitted successfully.');
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the payment details.');
        });
    }
  };

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = registrationId;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Recharge address copied');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy Recharge Address');
    }
    document.body.removeChild(textArea);
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
                        <h3 className="accordion-header">
                          <strong>Deposit</strong>
                        </h3>
                        <hr />
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          <Scanner />
                          <div className="accordion-body">
                            <div className="rounded d-flex align-items-left flex-column" style={{ backgroundColor: "#f8f9fa" }}>
                              <div>
                                <p style={{color: 'red'}}>* Only supports TRX network.</p>
                              </div>
                              <div>
                                <p style={{ alignContent: "left" }}>Recharge Address:</p>
                              </div>
                              {/* <div className="ms-9" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                                <strong style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                                  {registrationId}
                                  <span onClick={copyToClipboard} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                    <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                    </svg>
                                  </span>
                                </strong>
                              </div> */}
                            </div>
                            <div className="rounded d-flex" style={{ backgroundColor: "#f8f9fa" }}>
                              <div className="col-md-4 p-2">Minimum Quantity</div>
                              <div className="col-md-8 p-2">: 100</div>
                            </div>
                            <div className="rounded d-flex" style={{ backgroundColor: "#f8f9fa" }}>
                              <div className="col-md-2 p-2">USDT Rate :</div>
                              <div className="col-md-2 p-2">{btcRate}</div>
                              <div className="col-md-3 p-2">You will receive :</div>
                              <div className="col-md-4 p-2">{totalValue}</div>
                            </div>
                            <hr />
                            <div className="d-flex pb-2">
                              <div>
                                <p>
                                  <b>
                                    Total Available balance{" "}
                                    <i className="bi bi-currency-rupee"></i>
                                    <span className="text-success">{btcQty !== null ? btcQty : "0"}</span>
                                  </b>
                                </p>
                              </div>
                              <div className="ms-auto"></div>
                            </div>
                            <div className="d-flex flex-wrap pb-3">
                              <div className="col-md-4 p-2">Quantity <span style={{ color: "red" }}>*</span> :</div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                              ></input>
                            </div>
                            <div className="d-flex flex-wrap pb-3">
                              <div className="col-md-4 p-2">UTR Number <span style={{ color: "red" }}>*</span> :</div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="UTR Number"
                                value={utrNumber}
                                onChange={handleUtrNumberChange}
                              ></input>
                            </div>
                            {quantity < 100 && (
                              <div className="d-flex flex-wrap pb-3">
                                <span style={{ color: "red" }}>* Note: Quantity must be 100 or more.</span>
                              </div>
                            )}
                            {maxTransactionsReached && (
                              <div className="d-flex flex-wrap pb-3">
                                <span style={{ color: "red" }}>Only 2 transactions allowed per day. Please try tomorrow.</span>
                              </div>
                            )}
                            <div className="d-flex flex-wrap pb-3">
                              <input
                                type="button"
                                value="Make Payment"
                                className="btn btn-primary btn-block btn-lg"
                                disabled={!isFormValid() || maxTransactionsReached}
                                onClick={handleSubmit}
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
