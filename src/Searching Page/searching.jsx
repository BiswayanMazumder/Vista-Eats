import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Searching() {
    const [currentArea, setCurrentArea] = useState('');
    const [lat, setlat] = useState(0);
    const [long, setlong] = useState(0);
    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);
    const [Data, setData] = useState([]);
    const fetchData = async () => {
        // await fetchlocation();
        const result = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.3250645&lng=85.8170355&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const results = await result.json();
        // console.log(data?.data.cards[0].card?.card?.imageGridCards?.info);
        const imageUrl = results?.data.cards[0].card?.card?.imageGridCards?.info[0]?.imageUrl;
        setData(results?.data.cards[0]?.card?.card?.imageGridCards?.info);

    }
    useEffect(() => {
        fetchData();
    }, []);
    const fetchlocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setlat(latitude);
                setlong(longitude);
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    const area = data?.address?.suburb || data?.address?.city || data?.address?.town || data?.display_name;
                    setCurrentArea(area);
                } catch (error) {
                    console.error("Failed to fetch location:", error);
                }
            }, (error) => {
                console.error("Geolocation error:", error);
            });
        } else {
            console.warn("Geolocation not supported by this browser.");
        }
    }
    useEffect(() => {
        fetchlocation();
    }, []);

    return (
        <div className='webbody' style={{ overflow: "hidden" }}>
            <div className="dchcdbkvnvj">
                <div className="djdhfdjf">
                    <Link to={"/"}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/Vista%20Eats%2FChatGPT_Image_May_10__2025__01_32_03_PM-removebg-preview.png?alt=media&token=a6787180-c4d8-4212-8c6c-8cf02bf81a05"
                            alt=""
                            height={"70px"}
                            width={"90px"}
                        />
                    </Link>
                    <div className="location" style={{ display: "flex", flexDirection: "row" }}>
                        Other
                        <div className="dhbdbv" style={{ fontWeight: "500", marginLeft: "15px" }}>
                            {currentArea}
                        </div>
                    </div>
                </div>
            </div>

            <div className="djfjdkfkf">
                <div className="dfndfkemf">
                    <input
                        type="text"
                        className="search_input"
                        placeholder='Search for restaurants and foods'
                    />
                    <div className="sjskdfklf">
                        Popular Cuisines
                    </div>
                    <div className="shgdhdfjdbf">
                        <div className="shfhf">
                            {
                                Data.map((item, index) => {
                                    if (index >= 13) return null;
                                    return (
                                        <Link to={`/item${index + 1}`} key={index}>
                                            <img
                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                                                alt=""
                                                height="120px"
                                                width="80px"
                                            />
                                        </Link>
                                    );
                                })
                            }
                            {/* <Link to="/item1">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/b4ff78ecc5b8b66f732dd06228916d65" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item2">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/5dd234f7decdac4b4f71a2ff1408e10f" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item3">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/3df4fca020027e89b89c733cdffc4966" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item4">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/87664acb0f9dd95d10a549bb8190ab27" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item5">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/e76b511935016406e6ebc11dd7593387" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item6">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/89f3fec702aef5acbb51a6cbc284b3f7" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item7">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/8322f6d6df488dc1f5a6674cfe863f0f" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item8">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/31f03222ea978aef3b10d386729eb076" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item9">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/c170aa4262ec0d191642f42a3a03b4ce" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item10">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/0b5ffa32a04d99c1f212d2aacefd5f6f" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item11">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/36184033ebef97d27a85fa3af5c1d403" alt="" height="120px" width="80px" />
                            </Link>
                            <Link to="/item12">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/d0884e09ef431ee610e54a0bb2dfecd5" alt="" height="120px" width="80px" />
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
