import React,{useState, useEffect} from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './App.css';


const Profile = () => {
    const [selectedBatch, setSelectedBatch] = useState('');
    const [decodedToken, setDecodedToken] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
    }, []);

    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
    }
    const handleBatch = async()=>{
        try{    
            if (!selectedBatch) {
                alert('Please select a batch before submitting.');
                return;
            }

            const batchResponse = await axios.patch(`https://flexmoney-backend-a8yv.onrender.com/api/v1/batchChange/${decodedToken._id}`);
            console.log(batchResponse.success);

            if (batchResponse.status === 200) {
                await axios.patch(`https://flexmoney-backend-a8yv.onrender.com/api/v1/batchChange/${decodedToken._id}`, { batch: selectedBatch });
                alert('Batch has been updated.');
            } 

        }catch (error){
            alert("You can't change batch in the same month.");
            console.error('Error changing batch:', error.message)
        }
    }
    const handlePayment = async () => {
        try {
            if (!decodedToken || !decodedToken._id) {
                console.error('Invalid or missing token.');
                return;
            }

            // Check the value of paymentPrice
            if (decodedToken.paymentPrice === 0) {
                console.log(decodedToken.paymentPrice);
                 await axios.patch(`https://flexmoney-backend-a8yv.onrender.com/api/v1/paymentCompleted/${decodedToken._id}`);
                decodedToken.paymentPrice = 500;
                alert('Payment made for this month. Thank you!');
            }else if (decodedToken.paymentPrice === 500) {
                console.log(decodedToken.paymentPrice);
                alert('Payment has already been made for this month.');
            }
        } catch (error) {
            console.error('Error processing payment:', error.message);
        }
    }

    return (
        <div>
            <h2>Welcome!</h2>
            <p>Select and change your batch</p>
            <p>Proceed with payment</p>

            <label htmlFor="batch">Select Batch:</label>
            <select className="batch" id="batch" name="batch" value={selectedBatch} onChange={handleBatchChange} required>
                <option value="">Select Batch</option>
                <option value="6-7AM">6-7AM</option>
                <option value="7-8AM">7-8AM</option>
                <option value="8-9AM">8-9AM</option>
                <option value="5-6PM">5-6PM</option>
            </select>
            <button onClick={handleBatch}>Change Batch</button>

            <button className="paybutton" onClick={handlePayment}>Do Payment</button>
        </div>
    );
}

export default Profile;