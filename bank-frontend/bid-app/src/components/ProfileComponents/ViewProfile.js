import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom';
import ConsumerService from '../services/ConsumerService';

export default function ViewProfile() {
    const { id } = useParams();
    const [consumer, setConsumer] = useState({});

    useEffect(() => {
        fetchConsumer();
    }, []);

    const fetchConsumer = () => {
        ConsumerService.getConsumerById(id)
            .then(res => setConsumer(res.data))
            .catch(error => console.error('Error fetching consumer:', error));
    };
    
  return (
    <>
        <Navbar/>
        <div className="form-row">
            <div className="col-md-6">
                <div className="form_container">
                <form action="">
                <div>
                    <h5>Name : {consumer.firstName}</h5>
                    <input type="text" className="form-control" placeholder="Your Name" value= {consumer.firstName}/>
                </div>
                <div>
                    <h5>Phone Number : </h5>
                    <input type="text" className="form-control" placeholder="Phone Number" value={consumer.mobile} />
                </div>
                <div>
                    <h5>Email : </h5>
                    <input type="email" className="form-control" placeholder="Your Email" value= {consumer.email}/>
                </div>
                <div>
                    <h5>Date of Birth : </h5>
                    <input type="date" className="form-control"/>
                </div>
                </form>
            </div>
            </div>
        </div>
    </>
  )
}
