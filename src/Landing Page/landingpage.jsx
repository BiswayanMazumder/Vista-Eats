import React, { useEffect } from 'react'

export default function Landingpage() {
    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);
    return (
        <div className='webbody'>
            <div className="banner1">
                <div className="banner1_images">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="" className='vegetable1' />
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" alt="" className='vegetable1' />
                </div>

            </div>

        </div>
    )
}
