import React from 'react'
import './front.css'
import { Button, Typography } from '@mui/material'
import pg1 from "../../assets/brain.png"
import pg2 from "../../assets/footprint.png"
import pg3 from "../../assets/tree.png"
import {  useNavigate } from 'react-router-dom'

const FrontPage = () => {
    const navigate = useNavigate()
    return (
        <div className='frontPageMain'>
            <div className='topImg'>
                <div className='FrontTitle'><Typography align='center' sx={{ color: "#0E70EB", fontFamily: "sans-serif", fontWeight: "bold" }} variant='h6'>Know and offset your carbon <span>Footprints!</span></Typography></div>
            </div>
            <div className='optionsDiv'>
                <div className='options'>
                    <div className='optionPart'>
                        <div><img src={pg1} alt="" width={50} /></div>
                        <div><p className='optionTitle'>Answer Our Questions</p><p style={{ fontSize: "12px", fontFamily: "sans-serif", color: "#60666F" }} className='p2'>Lorem Ipsum has been the industry's standard the industry's </p></div>
                    </div>
                    <div className='optionPart'>
                        <div><img src={pg2} alt="" width={50} /></div>
                        <div><p className='optionTitle'>Know your carbon footprint</p><p style={{ fontSize: "12px", fontFamily: "sans-serif", color: "#60666F" }} className='p2'>Lorem Ipsum has been the industry's standard the industry's </p></div>
                    </div>
                    <div className='optionPart'>
                        <div><img src={pg3} alt="" width={50} /></div>
                        <div><p className='optionTitle'>Offset it by following instructions</p><p style={{ fontSize: "12px", fontFamily: "sans-serif", color: "#60666F" }} className='p2'>Lorem Ipsum has been the industry's standard the industry's </p></div>
                    </div>
                </div>
                <div className='buttonsDiv'>
                    <Button variant='outlined' sx={{ textTransform: 'none',width:'143px' }}>later</Button>
                    <Button variant='contained' sx={{ textTransform: 'none' }} onClick={() => navigate('/vehicle')}>Calculate offset</Button>
                </div>
            </div>
        </div>
    )
}

export default FrontPage
