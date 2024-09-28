import React from 'react';
import "../../styles/Button.css";

export default function Button({ onBack, onNext, isDisabled }) {
  return (
    <div className='button-main'>
      <button className='back-button' onClick={onBack} >Back</button>
      <button 
        className='next-button' 
        onClick={isDisabled ? () => alert('Please select an item before proceeding.') : onNext} 
        disabled={isDisabled}
      >
        Next
      </button>
    </div>
  );
}
