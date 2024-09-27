import React, { useState, useEffect } from 'react';
import './Form.css'; 
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [showMessage, setShowMessage] = useState(true); 
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
 

    useEffect(() => {
        const hideMessageTimeout = setTimeout(() => {
            setShowMessage(false);
        }, 2000);

        const showFormTimeout = setTimeout(() => {
            setShowForm(true); 
        }, 3000);

        return () => {
            clearTimeout(hideMessageTimeout);
            clearTimeout(showFormTimeout);
        };
    }, []);

    const handleSuccess = () => {
        navigate('/complete');
    }

    return (
        <div className="form-container">
            {showMessage && (
                <div className={`msg ${showMessage ? 'msg-enter' : 'msg-leave'}`}>
                    Great job! You're making a positive contribution to preserving our green environment.
                </div>
            )}
            {showForm && (
                <form onSubmit={(e) => e.preventDefault()} className="tree-form">
                    <h2>Fill out this form</h2>
                    <p>Our team will reach out to you to help with your tree plantation</p>

                    <input type="text" name="name" placeholder="Your Name *"/>
                    <input type="tel" name="phone" placeholder="Phone number *"  />
                    <input type="email" name="email" placeholder="Email *"  />
                    <input type="text" name="location" placeholder="Location *"  />
                    <input type="number" name="trees" placeholder="How many trees you want to plant? *"  />
                    <input type="text" name="behalfName" placeholder="Name to be planted on behalf on? *"  />
                    <button onClick={handleSuccess} type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Form;
