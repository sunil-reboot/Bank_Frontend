import React from 'react'
import Navbar from '../Navbar'

export default function NominateUser() {
  return (
    <>
            <Navbar />
            <div className='container rules-container'>

                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Transaction Number</th>
                            <th>Date</th>
                            <th>Narration</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    
                                    <td>4</td>
                                    <td>5</td>
                                </tr>

                            
                    </tbody>
                </table>
            </div>
        </>
  )
}
