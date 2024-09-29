// Vehicle.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageOne from './PageOne';
import CustomProgressBar from '../../components/progress/Progress';
import ButtonSingle from '../../components/singlebutton/ButtonSingle';
import '../../styles/Vehicle.css';
import DoubleButton from '../../components/doublebutton/DoubleButton';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';
import background1 from '../../assets/background1.png'
import background2 from '../../assets/background2.png'
import background3 from '../../assets/background3.png'

const Vehicle = ({ pagecond }) => {

    const [activepage, setActivePage] = useState("pageone"); // Start with page one
    const [carbonvalue, setCarbonValue] = useState(0);
    const navigate = useNavigate();
    const [nextpage , setnextpage] = useState(false)
    const location = useLocation()
    let setnextcondition = (value) =>{
        setnextpage(value)
    }
    // console.log(nextpage)


    const handleNext = () => {
        if (nextpage){
            switch (activepage) {
                case "pageone":
                    setActivePage("pagetwo");
                    break;
                case "pagetwo":
                    setActivePage("pagethree");
                    setnextpage(false)
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
        }
        else{
            alert("Select atleast one !")
        }
    };

    const handleBack = () => {
        switch (activepage) {
            case "pagetwo":
                setActivePage("pageone");
                setnextpage(false)
                break;
            case "pagethree":
                setActivePage("pagetwo");
                setnextpage(true)
                break;
            case "pagefour":
                setActivePage("pagethree");
                setnextpage(false)
                break;
            default:
                break;
        }
    };

    const updateCarbonValue = (value) => {
        setCarbonValue((prev) => prev + value); // Accumulate carbon value
    };

    useEffect(() => {
        if (location.state && location.state.activepage) { // Ensure consistent key name
          setActivePage(location.state.activepage);
          setnextpage(true)
        //   console.log("activePage set to:", location.state.activepage);
        }
      }, [location.state]);
    
    // useEffect(() => {
    //     console.log("Current activePage:", activepage);
    //     // You can perform additional actions based on activePage here
    // }, [activepage]);

    return (
        <div className="vehiclemaincontainer">
            <div className="topbar" style={{backgroundImage:`url(${activepage === 'pageone'? background1 : activepage === "pagetwo"? background1: activepage === "pagethree" ? background2 : activepage === "pagefour" ? background3 : background1 })`,backgroundSize:'cover', backgroundRepeat:'no-repeat',backgroundPosition:'center'}}>
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
                    {activepage === 'pageone' && <PageOne updateCarbonValue={updateCarbonValue} condition ={setnextcondition}/>}
                    {activepage === 'pagetwo' && <PageTwo updateCarbonValue={updateCarbonValue} />}
                    {activepage === 'pagethree' && <PageThree updateCarbonValue={updateCarbonValue} condition = {setnextcondition}/>}
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
