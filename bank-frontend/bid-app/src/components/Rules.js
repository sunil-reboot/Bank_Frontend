import React from 'react';
import Navbar from './Navbar';

export default function Rules() {
  return (
    <>
      <Navbar />
      <div className='container rules-container'>
        <h1 className='my-2'>Welcome User</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={{ backgroundColor: '#babeb9', color: 'black' }}>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>1. We provide different investment options.</strong><br /><br />
                <strong>2. We provide recommendations that are most suitable to you.</strong><br /><br />
                <strong>3. You can also nominate a person whom you trust to reach your financial goals.</strong><br /><br />
                <strong>4. To nominate a person for your financial goals please use our nominate user page.</strong><br /><br />
                <strong>5. Final decision has to be taken by you to invest.</strong><br /><br />
                <strong>Thank you!</strong><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
