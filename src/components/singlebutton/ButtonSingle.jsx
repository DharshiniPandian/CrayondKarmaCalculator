import React from 'react';
import './ButtonSingle.css';



const ButtonSingle = ({ handleNext }) => {

    return (
        <div className="buttonsingle">
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default ButtonSingle;
