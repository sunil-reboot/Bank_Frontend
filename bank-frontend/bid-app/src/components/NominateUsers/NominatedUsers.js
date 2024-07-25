import React from 'react'
import Navbar from '../Navbar'

export default function NominatedUsers() {
  return (
    <>
    <Navbar/>
     <div className='container rules-container'>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={{ backgroundColor: '#babeb9', color: 'black' }}>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>1. Nominated User 1</strong><br /><br />
                <strong>2. Nominated User 2</strong><br /><br />
                <strong>3. Nominated User 3.</strong><br /><br />
                <strong>4. Nominated User 4.</strong><br /><br />
                <strong>5. Nominated User 5.</strong><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}
