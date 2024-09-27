import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageOne from './PageOne';
import CustomProgressBar from './progress/Progress';
import ButtonSingle from './singlebutton/ButtonSingle';
import './Vehicle.css';
import DoubleButton from './doublebutton/DoubleButton';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';

const Vehicle = ({ pagecond }) => {
    const [activepage, setActivePage] = useState("pageone"); // Start with page one
    const [carbonvalue, setCarbonValue] = useState(2);
    const navigate = useNavigate();

    const handleNext = () => {
        switch (activepage) {
            case "pageone":
                setActivePage("pagetwo");
                break;
            case "pagetwo":
                setActivePage("pagethree");
                break;
            case "pagethree":
                setActivePage("pagefour");
                break;
            case "pagefour":
                navigate('/food');
                break;
            default:
                break;
        }
    };

    const handleBack = () => {
        switch (activepage) {
            case "pagetwo":
                setActivePage("pageone");
                break;
            case "pagethree":
                setActivePage("pagetwo");
                break;
            case "pagefour":
                setActivePage("pagethree");
                break;
            default:
                break;
        }
    };

    const updateCarbonValue = (value) => {
        setCarbonValue((prev) => prev + value); // Accumulate carbon value
    };

    return (
        <div className="vehiclemaincontainer">
            <div className="topbar">
                <div className='topbarcontent'>
                    <li>
                        <svg version="1.1" id="triangle-11" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 11 11">
                            <path id="rect3338" d="M5.5174,1.2315
                                C5.3163,1.2253,5.1276,1.328,5.024,1.5l-4,6.6598C0.8013,8.5293,1.0679,8.9999,1.5,9h8c0.4321-0.0001,0.6987-0.4707,0.476-0.8402
                                    l-4-6.6598C5.8787,1.3386,5.706,1.2375,5.5174,1.2315z"></path>
                        </svg>
                    </li>
                    <li><h1>{carbonvalue} ton CO2</h1></li>
                </div>
            </div>
            <div className="bottombar">
                <div className="numberrolling">
                    <CustomProgressBar />
                </div>
                <div>
                    {activepage === 'pageone' && <PageOne updateCarbonValue={updateCarbonValue} />}
                    {activepage === 'pagetwo' && <PageTwo updateCarbonValue={updateCarbonValue} />}
                    {activepage === 'pagethree' && <PageThree updateCarbonValue={updateCarbonValue} />}
                    {activepage === 'pagefour' && <PageFour updateCarbonValue={updateCarbonValue} />}
                </div>
                <div>
                    {activepage === "pageone" 
                        ? <ButtonSingle handleNext={handleNext} /> 
                        : <DoubleButton handleBack={handleBack} handleNext={handleNext} />}
                </div>
            </div>
        </div>
    );
}

export default Vehicle;
