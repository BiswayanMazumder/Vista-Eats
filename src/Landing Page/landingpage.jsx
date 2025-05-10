import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Landingpage() {
    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);
    const [showLogin, setShowLogin] = useState(false);
    const [clickedlogin,setclickedlogin] = useState(false);
    const [logindetails, setLoginDetails] = useState(false);
    const toggleLogin = () => {
        setShowLogin(prev => !prev);
    };
    const checkLogin = () => {
        const mobilenumber = document.getElementsByClassName("login_input1")[0].value;
        if (mobilenumber == null) {
            // alert("Please enter a  mobile number");
            setLoginDetails(false);
            setclickedlogin(true);
        }
        else {
            if (mobilenumber.toString().length == 10) {
                // alert("Login Successful");
                setLoginDetails(true);
                setclickedlogin(true);
                console.log("Login Successful");
            }
            else {
                // alert("Please enter a valid mobile number");
                setLoginDetails(false);
                setclickedlogin(true);
            }
        }
    }
    return (
        <div className='webbody'>
            <div className="banner1">
                {showLogin && <div className="blur-overlay" onClick={toggleLogin}></div>}

                {/* Sidebar login section */}
                {showLogin && (
                    <div className="loginsection">
                        <div className="jhdcjdhc">
                            <div className="dgvdbdc">
                                Login
                                <div className="dfhdf">
                                    or create an account
                                </div>
                            </div>
                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" height={"80px"} width={"80px"} style={{ marginRight: "100px" }} />
                        </div>
                        <div className="login_input">
                            <input type="number" className="login_input1" placeholder='Phone number' />
                            <Link style={{ textDecoration: "none" }}>
                                <div className="dnjcbdjvd" onClick={checkLogin}>
                                    LOGIN
                                </div>
                            </Link>
                            <div className="djvbdbv">
                                By clicking on Login, I accept the Terms & Conditions & Privacy Policy
                            </div>
                            {
                                clickedlogin && !logindetails && (
                                    <div className="djvbdbv" style={{ color: "red", fontSize: "12px" }}>
                                        Please enter a valid mobile number
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                <div className="headers">
                    <Link to="/">
                        <img src="https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/Vista%20Eats%2FChatGPT%20Image%20May%2010%2C%202025%2C%2001_32_03%20PM.png?alt=media&token=d04e9a1b-11a7-4816-848f-f91099f3b1af" alt="" height={"70px"} width={"90px"} />
                    </Link>
                    <Link style={{ textDecoration: "none" }}>
                        <div className="loginbtn" onClick={toggleLogin}>
                            Sign in
                        </div>
                    </Link>
                </div>
                <div className="banner1_images">
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
                        alt=""
                        className="vegetable vegetable-left"
                    />

                    <div className="banner_txt">

                        Order food & groceries. Discover <br />best restaurants. Vista it!
                        <Link to="/search" style={{ textDecoration: "none" }}>
                            <div className="restaurants_input">
                                <div className='dhfhdfjdfn'>
                                    Search for restaurants, dishes, cuisines
                                </div>
                            </div>
                        </Link>
                        <div className="dhfhjdhfjefh">
                            <Link>
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png" alt="" height={"350px"} width={"400px"} />
                            </Link>
                            <Link>
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png" alt="" height={"350px"} width={"400px"} />
                            </Link>
                            <Link>
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png" alt="" height={"350px"} width={"400px"} />
                            </Link>
                        </div>
                    </div>
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
                        alt=""
                        className="vegetable vegetable-right"
                    />
                </div>
            </div>


        </div>
    )
}
