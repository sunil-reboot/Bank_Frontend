import React from 'react';
import Navbar from '../Navbar'

export default function ProfileRegistration() {
  return (
    <>
      <Navbar/>
      <section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

                  <form className="px-md-2">

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example1q" placeholder='Name' className="form-control" />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">

                        <select data-mdb-select-init>
                          <option value="1" disabled>Gender</option>
                          <option value="2">Female</option>
                          <option value="3">Male</option>
                          <option value="4">Other</option>
                        </select>

                      </div>
                    </div>

                    <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                      <div className="col-md-6">

                        <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form3Example1w" className="form-control" />
                          <label className="form-label" htmlFor="form3Example1w">Registration code</label>
                        </div>

                      </div>
                    </div>

                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg mb-1">Submit</button>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </>
  )
}
