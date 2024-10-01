import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material'; // Import MUI components
import './Form.css'; 
import { useNavigate } from 'react-router-dom';
import cloud from '../../assets/Clouds.svg';
import trees from '../../assets/Trees.svg';
import { useDispatch } from "react-redux";
import { goToNextStep } from "../../slice/UserSlice";


const Form = () => {
    const [showMessage, setShowMessage] = useState(true); 
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        dispatch(goToNextStep());
        navigate('/complete');
    };

    return (
        <div className="form-container">
                <img src={cloud} alt="Cloud" className="cloud-image" />
                <img src={trees} alt="Trees" className="tree-image" />

            <div className="form-top">
            {/* Message shown for 2 seconds */}
            <div className={`msg ${showMessage ? 'msg-enter' : 'msg-leave'}`}>
                Great job! You're making a positive contribution to preserving our green environment.
            </div>
        
            {showForm && (
                <form onSubmit={(e) => e.preventDefault()} className="tree-form">
                    <h2>Fill out this form</h2>
                    <p>Our team will reach out to you to help with your tree plantation</p>

                    <TextField 
                        label="Your Name" 
                        name="name" 
                        fullWidth 
                        required 
                        sx={{ 
                            marginBottom: '10px', 
                            width: '100%', 
                            // height: '5%',
                            '& .MuiOutlinedInput-root': {
                                height: '45px', 
                                borderRadius: '8px', 
                            },
                            '& .MuiInputLabel-root': {

                                font: "normal normal 500 14px/16px Sarabun", 
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                classes: { asterisk: 'asterisk' },
                                style: { color: '#60666F' }  
                            }
                        }}
                    />
                    <TextField 
                        label="Phone number" 
                        name="phone" 
                        type="tel" 
                        fullWidth 
                        required 
                        sx={{ 
                            marginBottom: '10px', 
                            width: '100%', 
                            border: '1px #DFDFDF',
                            '& .MuiOutlinedInput-root': {
                                height: '48px',
                                borderRadius: '8px', 
                                
                            },
                            '& .MuiInputLabel-root': {
                                font: "normal normal 500 14px/16px Sarabun",
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                classes: { asterisk: 'asterisk' },
                                style: { color: '#60666F' },
                            }
                        }}
                    />
                    <TextField 
                        label="Email" 
                        name="email" 
                        type="email" 
                        fullWidth 
                        required 
                        sx={{ 
                            marginBottom: '10px', 
                            width: '100%', 
                            '& .MuiOutlinedInput-root': {
                                height: '45px',
                                borderRadius: '8px'
                            },
                            '& .MuiInputLabel-root': {
                                font: "normal normal 500 14px/16px Sarabun", 
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                classes: { asterisk: 'asterisk' },
                                style: { color: '#60666F' }
                            }
                        }}
                    />
                    <TextField 
                        label="Location" 
                        name="location" 
                        fullWidth 
                        required 
                        sx={{ 
                            marginBottom: '10px', 
                            width: '100%', 
                            '& .MuiOutlinedInput-root': {
                                height: '45px',
                                borderRadius: '8px', 
                            },
                            '& .MuiInputLabel-root': {
                                font: "normal normal 500 14px/16px Sarabun",
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                classes: { asterisk: 'asterisk' },
                                style: { color: '#60666F' }
                            }
                        }}
                    />
                    <TextField 
                        label="How many trees you want to plant?" 
                        name="trees" 
                        type="number" 
                        fullWidth 
                        required 
                        sx={{ 
                            marginBottom: '10px', 
                            width: '100%', 
                            '& .MuiOutlinedInput-root': {
                                height: '45px',
                                borderRadius: '8px', 
                            },
                            '& .MuiInputLabel-root': {
                                font: "normal normal 500 14px/16px Sarabun",
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                classes: { asterisk: 'asterisk' },
                                style: { color: '#60666F' }
                            }
                        }}
                    />
                    <TextField 
                        label="Name to be planted on behalf?" 
                        name="behalfName" 
                        fullWidth 
                        required 
                        sx={{ 
                            marginBottom: '10px', 
                            width: '100%', 
                            '& .MuiOutlinedInput-root': {
                                height: '45px',
                                borderRadius: '8px', 
                            },
                            '& .MuiInputLabel-root': {
                                font: "normal normal 500 14px/16px Sarabun",
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                classes: { asterisk: 'asterisk' },
                                style: { color: '#60666F' }
                            }
                        }}
                    />

                    {/* MUI Button */}
                    <Button 
                        onClick={handleSuccess} 
                        color="primary" 
                        variant='outlined'
                        sx={{ 
                            textTransform: 'none',
                            backgroundColor:"#1D78EC",
                            width: "304px",
                            height: "48px",
                            borderRadius:"8px",
                            font: "normal normal 500 14px/16px Sarabun"
                        }}
                    >
                        Submit
                    </Button>
                </form>
            )}
            </div>
        </div>
    );
};

export default Form;
