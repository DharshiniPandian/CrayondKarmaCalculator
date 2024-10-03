import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import cloud from '../../assets/Clouds.svg';
import trees from '../../assets/Trees.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { goToNextStep } from "../../slice/UserSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toast.css'
import { FaStarOfLife } from "react-icons/fa";


const Form = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State for form fields
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [location, setLocation] = useState(null);
    const [numberOfTrees, setNumberOfTrees] = useState(null);
    const [nameToBePlanted, setNameToBePlanted] = useState(null);

    // Redux selectors for other data
    const totalVehicleEmission = useSelector((state) => state.carbonValue.vehicle.total_vehicle_emission);
    const saplings = (totalVehicleEmission / 200).toFixed();

    const vehicleId = useSelector((state) => state.carbonValue.vehicle.vehicle_id);
    const vehicleCount = useSelector((state) => state.carbonValue.vehicle.vehicle_count);
    const fuelId = useSelector((state) => state.carbonValue.vehicle.fuel_id);
    const travelDistance = useSelector((state) => state.carbonValue.vehicle.travel_distance);
    const foodId = useSelector((state) => state.carbonValue.food.food_id);
    const totalEmission = useSelector((state) => state.carbonValue.total_emission.total_emission);
    const totalElectricityEmission = useSelector((state) => state.carbonValue.electricity.total_electricity_emission);
    const appliances = useSelector((state) => state.carbonValue.appliances.appliance_id);

    const handleSubmit = async () => {
        if (!name || !phone || !email || !location || !numberOfTrees || !nameToBePlanted) {
            // Display a toast notification if no vehicle is selected
            toast.warn("Please fill out all the fields", {
                className: "custom-toast", // Custom class for warning toast
                bodyClassName: "custom-toast-body", // Custom class for the body
                progressClassName: "custom-toast-progress", // Custom class for the progress bar
            });
            return;
        }
        const postData = {
            vehicle: {
                vehicle_id: vehicleId,
                vehicle_count: vehicleCount,
                fuel_type: fuelId,
                travel_distance: travelDistance,
            },
            food: {
                food_type: foodId
            },
            appliance: {
                electricity_consumption: totalElectricityEmission,
                appliances: appliances
            },
            total_emission: {
                total_emission: totalEmission
            },
            plant_trees: {
                plant_trees: 1
            },
            form: {
                name,
                number_of_trees: parseInt(numberOfTrees),
                name_to_be_planted: nameToBePlanted,
                phone,
                email,
                location
            }

        };

        try {
            console.log(postData)
            const response = await axios.post('http://localhost:8081/transaction/data', postData);
            console.log(response.data);
            // alert('Data stored successfully');
            navigate('/complete');
            // navigate('/complete');

        } catch (error) {
            console.error('Error storing data:', error);
            alert('Failed to store data');
        }
    };

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
                <div className={`msg ${showMessage ? 'msg-enter' : 'msg-leave'}`}>
                    Great job! You're making a positive contribution to preserving our green environment.
                </div>

                {showForm && (
                    <form onSubmit={(e) => e.preventDefault()} className="tree-form">
                        <h2>Fill out this form</h2>
                        <p>Our team will reach out to you to help with your tree plantation</p>
                        
                        <TextField
                            label={
                                <div>Your Name <FaStarOfLife color='#F44F5A' size='7px' style={{ verticalAlign: 'top' }} /></div>
                            }
                            name="name"
                            required
                            fullWidth
                            value={name} // Bind state to input
                            onChange={(e) => setName(e.target.value)} // Update state on change
                            sx={{
                                marginBottom: '12px',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '48px',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: '1px solid #DFDFDF',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color:'#60666F',
                                    font: 'normal normal  14px/16px Sarabun',
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        display:'none'
                                    },
                                },
                            }}
                        />
                        <TextField
                            label={
                                <div>Phone number <FaStarOfLife color='#F44F5A' size='7px' style={{ verticalAlign: 'top' }} /></div>
                            }
                            name="phone"
                            fullWidth
                            required
                            value={phone} // Bind state
                            onChange={(e) => setPhone(e.target.value)} // Update state
                            sx={{
                                marginBottom: '12px',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '48px',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: '1px solid #DFDFDF',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color:'#60666F',
                                    font: 'normal normal  14px/16px Sarabun',
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        display:'none'
                                    },
                                },
                            }}
                        />
                        <TextField
                            label={
                                <div>Email <FaStarOfLife color='#F44F5A' size='7px' style={{ verticalAlign: 'top' }} /></div>
                            }
                            name="email"
                            type="email"
                            fullWidth
                            required
                            value={email} // Bind state
                            onChange={(e) => setEmail(e.target.value)} // Update state
                            sx={{
                                marginBottom: '12px',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '48px',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: '1px solid #DFDFDF',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color:'#60666F',
                                    font: 'normal normal  14px/16px Sarabun',
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        display:'none'
                                    },
                                },
                            }}
                        />
                        <TextField
                            label={
                                <div>Location <FaStarOfLife color='#F44F5A' size='7px' style={{ verticalAlign: 'top' }} /></div>
                            }
                            name="location"
                            fullWidth
                            required
                            value={location} // Bind state
                            onChange={(e) => setLocation(e.target.value)} // Update state
                            sx={{
                                marginBottom: '12px',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '48px',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: '1px solid #DFDFDF',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color:'#60666F',
                                    font: 'normal normal  14px/16px Sarabun',
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        display:'none'
                                    },
                                },
                            }}
                        />
                        <TextField
                            label={
                                <div>How many trees you want to plant? <FaStarOfLife color='#F44F5A' size='7px' style={{ verticalAlign: 'top' }} /></div>
                            }
                            name="number_of_trees"
                            type="number"
                            fullWidth
                            required
                            value={numberOfTrees} // Bind state
                            inputProps={{ min: 1 }}    //to restrict the number to not be less than 1
                            onChange={(e) => setNumberOfTrees(e.target.value)} // Update state
                            sx={{
                                marginBottom: '12px',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '48px',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: '1px solid #DFDFDF',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color:'#60666F',
                                    font: 'normal normal  14px/16px Sarabun',
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        display:'none'
                                    },
                                },
                            }}
                        />
                        <TextField
                            label={
                                <div>Name to be planted on behalf? <FaStarOfLife color='#F44F5A' size='7px' style={{ verticalAlign: 'top' }} /></div>
                            }
                            name="behalfName"
                            fullWidth
                            required
                            value={nameToBePlanted} // Bind state
                            onChange={(e) => setNameToBePlanted(e.target.value)} // Update state
                            sx={{
                                marginBottom: '12px',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '48px',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: '1px solid #DFDFDF',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color:'#60666F',
                                    font: 'normal normal  14px/16px Sarabun',
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        display:'none'
                                    },
                                },
                            }}
                        />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ textTransform: 'none' }}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </div>
            {/* Toast Container for displaying notifications */}
            <ToastContainer
                position="top-center"
                autoClose={3000} // Set auto-close time
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Form;