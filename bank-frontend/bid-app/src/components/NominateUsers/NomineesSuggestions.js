import React from 'react'
import Navbar from '../Navbar'

export default function NomineesSuggestions() {
  return (
    <>
     <Navbar />
      <div className='container rules-container'>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={{ backgroundColor: '#babeb9', color: 'black' }}>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>1. User 1</strong><br /><br />
                <strong>2. User 2</strong><br /><br />
                <strong>3. User 3.</strong><br /><br />
                <strong>4. User 4.</strong><br /><br />
                <strong>5. User 5.</strong><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}
