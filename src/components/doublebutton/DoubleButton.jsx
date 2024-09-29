import React from 'react';
import './DoubleButton.css';

const DoubleButton = ({ handleBack, handleNext }) => {
    return (
        <div className="buttondouble">
            <div className='btns'>
                <button className='back' onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default DoubleButton;
