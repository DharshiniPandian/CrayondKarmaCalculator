import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CustomProgressBar = () => {
    let value = 1
    let maxValue = 4
  const percentage = (value / maxValue) * 100;

  return (
    <div style={{ width: 54, height: 54 }}>
      <CircularProgressbar
        value={percentage}
        text={`${value}/${maxValue}`}
        styles={buildStyles({
          textSize: '30px',
          pathColor: '#FEA062',
          textColor: '#FEA062',
          trailColor: '#FFF4E4',
          backgroundColor: '#F39C12',
        })}
        className='progress'
        strokeWidth={12}
      />
    </div>
  );
};

export default CustomProgressBar;
