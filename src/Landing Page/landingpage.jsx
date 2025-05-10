import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Landingpage() {
    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);
    return (
        <div className='webbody'>
            <div className="banner1">
                <div className="banner1_images">
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
                        alt=""
                        className="vegetable vegetable-left"
                    />

                    <div className="banner_txt">

                        Order food & groceries. Discover <br/>best restaurants. Vista it!
                        <div className="restaurants_input">
                            <div className='dhfhdfjdfn'>
                                Search for restaurants, dishes, cuisines
                            </div>
                        </div>
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
