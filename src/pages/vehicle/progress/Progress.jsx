import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CustomProgressBar = () => {
    let value = 1
    let maxValue = 4
  const percentage = (value / maxValue) * 100;

  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={percentage}
        text={`${value}/${maxValue}`}
        styles={buildStyles({
          textSize: '30px',
          pathColor: '#F39C12',
          textColor: '#F39C12',
          trailColor: '#FDEBD0',
          backgroundColor: '#F39C12',
        })}
        className='progress'
      />
    </div>
  );
};

export default CustomProgressBar;
