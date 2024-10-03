import React from 'react'
import { useSelector } from 'react-redux'
import background1 from '../assets/background1.png'
import background2 from '../assets/background2.png'
import background3 from '../assets/background3.png'
import background4 from '../assets/background4.png'
import background5 from '../assets/background5.png'
import background6 from '../assets/background6.png'

const BackGround = () => {
  const globalCarbonValue = useSelector((s)=>s.carbonValue.total_emission.total_emission)
  if(globalCarbonValue<=6.00){
    return background1
  }
  else if((globalCarbonValue >6.00) && (globalCarbonValue <= 8.00)){
    return background2
  }
  else if((globalCarbonValue >8.00) && (globalCarbonValue <= 14.00)){
    return background3
  }
  else if((globalCarbonValue >14.00) && (globalCarbonValue <= 18.00)){
    return background4
  }
  else if((globalCarbonValue >18.00) && (globalCarbonValue <= 22.00)){
    return background5
  }
  else{
    return background6
  }
}

export default BackGround
