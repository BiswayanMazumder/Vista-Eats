import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDbvSTnxYTfPEPQ4HpHAjYQ3Gobas7MZY0',
    authDomain: 'vistaeats.firebaseapp.com',
    projectId: 'vistaeats',
    storageBucket: 'vistaeats.firebasestorage.app',
    messagingSenderId: '931029105010',
    appId: '1:931029105010:web:c1b851904598e90be045eb',
    measurementId: 'G-0C8M4W6GXJ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);

export default function Landingpage() {
    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);

    const [showLogin, setShowLogin] = useState(false);
    const [clickedLogin, setClickedLogin] = useState(false);
    const [loginDetails, setLoginDetails] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [OTP, setOTP] = useState(false);
    const [userid, setUserid] = useState('');
    const [userRegistered, setUserRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [users,setuser]=useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setuser(user);
                // console.log('User is signed in:', user);
            } else {
                setuser(null);
            }
        });
        return unsubscribe;
    }, []);
    const toggleLogin = () => {
        setShowLogin((prev) => !prev);
    };

    const checkLogin = () => {
        const mobilenumber = document.getElementsByClassName('login_input1')[0].value;
        if (mobilenumber == null) {
            setLoginDetails(false);
            setClickedLogin(true);
        } else {
            if (mobilenumber.toString().length === 10) {
                setLoginDetails(true);
                setClickedLogin(true);
                console.log('Login Successful');
            } else {
                setLoginDetails(false);
                setClickedLogin(true);
            }
        }
    };

    useEffect(() => {
        if (showLogin && !window.recaptchaVerifier) {
            const setupRecaptcha = () => {
                const recaptchaContainer = document.getElementById('recaptcha-container');
                if (!recaptchaContainer) {
                    console.error('reCAPTCHA container not found.');
                    return;
                }

                try {
                    window.recaptchaVerifier = new RecaptchaVerifier(
                        recaptchaContainer,
                        {
                            size: 'invisible',
                            callback: (response) => {
                                console.log('reCAPTCHA verified');
                            }
                        },
                        auth
                    );
                    console.log('reCAPTCHA successfully set up');
                } catch (error) {
                    console.error('Error setting up reCAPTCHA:', error);
                }
            };

            setupRecaptcha();
        }
    }, [showLogin]);

    const sendOTP = async () => {
        const formattedPhone = phone.startsWith('+91 ') ? phone : `+91${phone}`;
        try {
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmationResult(result);
            setOTP(true);
            console.log('OTP sent!');
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verifyOTP = async () => {
        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            setUserid(user.uid);
            console.log('User ID:', user.uid);
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const getUserDetails = async () => {
        await verifyOTP();
        const user = auth.currentUser;
        const uid = user.uid;
        const docRef = doc(db, 'Registered Phone Numbers', 'Phone Numbers');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('Document data:', data);
            if (data['Contact Details'].includes(phone)) {
                setUserRegistered(true);
                setShowLogin(false);
                console.log('User already registered');
            } else {
                setUserRegistered(false);
                try {
                    await setDoc(doc(db, 'Users', auth.currentUser.uid), {
                        'User ID': auth.currentUser.uid,
                        'Phone Number': phone,
                        'Name': 'Default User',
                        'Email': `${phone}@vistaeats.com`
                    });
                    setShowLogin(false);
                } catch (error) {
                    console.error('Error writing document:', error);
                }

                try {
                    await setDoc(doc(db, 'Registered Phone Numbers', 'Phone Numbers'), {
                        'Contact Details': [phone]
                    }, { merge: true });
                    setShowLogin(false);
                } catch (error) {
                    console.error('Error writing document:', error);
                }

                console.log('User not registered');
            }
        }
    };

    return (
        <div className='webbody' style={{ overflowX: 'hidden' }}>
            <div className='banner1'>
                {showLogin && <div className='blur-overlay' onClick={toggleLogin}></div>}

                {/* Sidebar login section */}
                {showLogin && (
                    <div className='loginsection'>
                        <div className='jhdcjdhc'>
                            <div className='dgvdbdc'>
                                Login
                                <div className='dfhdf'>or create an account</div>
                            </div>
                            <img
                                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'
                                alt=''
                                height={'80px'}
                                width={'80px'}
                                style={{ marginRight: '100px' }}
                            />
                        </div>
                        <div className='login_input'>
                            <input
                                type='number'
                                className='login_input1'
                                placeholder='Phone number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {OTP ? (
                                <input
                                    type='number'
                                    className='login_input1'
                                    placeholder='Enter OTP'
                                    value={otp}
                                    maxLength={6}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            ) : (
                                <></>
                            )}
                            {userid !== '' && !userRegistered && (
                                <>
                                    <input
                                        type='text'
                                        className='login_input1'
                                        placeholder='Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        type='email'
                                        className='login_input1'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </>
                            )}
                            <Link style={{ textDecoration: 'none' }}>
                                <div
                                    className='dnjcbdjvd'
                                    onClick={() => {
                                        OTP ? getUserDetails() : sendOTP();
                                    }}
                                >
                                    {OTP ? (!userRegistered ? 'Register User' : 'Verify OTP') : 'LOGIN'}
                                </div>
                            </Link>
                            <div className='djvbdbv'>
                                By clicking on Login, I accept the Terms & Conditions & Privacy Policy
                            </div>
                            {clickedLogin && !loginDetails && (
                                <div
                                    className='djvbdbv'
                                    style={{ color: 'red', fontSize: '12px' }}
                                >
                                    Please enter a valid mobile number
                                </div>
                            )}
                        </div>
                        <div id='recaptcha-container'></div>
                    </div>
                )}
                <div className='headers'>
                    <Link to='/'>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/Vista%20Eats%2FChatGPT%20Image%20May%2010%2C%202025%2C%2001_32_03%20PM.png?alt=media&token=d04e9a1b-11a7-4816-848f-f91099f3b1af'
                            alt=''
                            height={'70px'}
                            width={'90px'}
                        />
                    </Link>
                    {users == null ? (
                        <Link style={{ textDecoration: 'none' }}>
                            <div className='loginbtn' onClick={toggleLogin}>
                                Sign in
                            </div>
                        </Link>
                    ) : (
                        <div className="djbjbnv" style={{flexDirection: 'row', alignItems: 'center', gap: '10px',display: 'flex'}}>
                            <Link to={'/my-account'}>
                                <div className="djnjnjgnrjgn" style={{marginRight:"150px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7607 11.8897C17.6325 11.8897 19.1488 10.4133 19.1488 8.59205C19.1488 6.77184 17.6325 5.29541 15.7607 5.29541C13.89 5.29541 12.3726 6.77184 12.3726 8.59205C12.3726 10.4133 13.89 11.8897 15.7607 11.8897ZM8.4418 18.8226C9.55113 15.9384 12.4101 13.8843 15.7607 13.8843C19.1131 13.8843 21.9711 15.9384 23.0799 18.8226C23.4596 19.8103 23.6494 20.3041 23.2438 20.8947C22.8381 21.4853 22.1753 21.4853 20.8498 21.4853H10.6717C9.34616 21.4853 8.68342 21.4853 8.27773 20.8947C7.87205 20.304 8.06197 19.8102 8.4418 18.8226Z" fill="#43464A"></path><path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="#43464A"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20.449 17.773C23.0101 17.773 25.0849 15.7528 25.0849 13.2608C25.0849 10.7702 23.0101 8.75 20.449 8.75C17.8893 8.75 15.813 10.7702 15.813 13.2608C15.813 15.7528 17.8893 17.773 20.449 17.773ZM10.4354 27.2601C11.9533 23.3136 15.8653 20.5029 20.4498 20.5029C25.037 20.5029 28.9475 23.3136 30.4646 27.26C30.9842 28.6115 31.244 29.2872 30.6889 30.0953C30.1338 30.9034 29.2269 30.9034 27.4132 30.9034H13.4865C11.6729 30.9034 10.766 30.9034 10.2109 30.0952C9.65584 29.2869 9.9157 28.6113 10.4354 27.2601Z" fill="white"></path></svg> 
                            </div>
                            </Link>
                        
                        </div>
                    )}
                </div>
                <div className='banner1_images'>
                    <img
                        src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png'
                        alt=''
                        className='vegetable vegetable-left'
                    />

                    <div className='banner_txt'>
                        Order food & groceries. Discover <br />best restaurants. Vista it!
                        <Link to='/search' style={{ textDecoration: 'none' }}>
                            <div className='restaurants_input'>
                                <div className='dhfhdfjdfn'>Search for restaurants, dishes, cuisines</div>
                            </div>
                        </Link>
                        <div className='dhfhjdhfjefh'>
                            <Link>
                                <img
                                    src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png'
                                    alt=''
                                    height={'350px'}
                                    width={'400px'}
                                />
                            </Link>
                            <Link>
                                <img
                                    src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png'
                                    alt=''
                                    height={'350px'}
                                    width={'400px'}
                                />
                            </Link>
                            <Link>
                                <img
                                    src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png'
                                    alt=''
                                    height={'350px'}
                                    width={'400px'}
                                />
                            </Link>
                        </div>
                    </div>
                    <img
                        src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png'
                        alt=''
                        className='vegetable vegetable-right'
                    />
                </div>
            </div>
            <div className='sbdbjdv'>
                Shop groceries on Instamart
                <div className='dhcdhvc'>
                    <Link style={{ textDecoration: 'none' }}>
                        <div className='dhvhdbvdhv'>
                            <img
                                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/4/22/0a688af1-1bb4-4a55-8128-31fc79cc9ad0_6d0abb9a-daff-4fbe-a1c9-2dddb6ae6717'
                                alt=''
                                height={'200px'}
                                width={'200px'}
                            />
                            <br />
                            Fresh Vegetables
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                        <div className='dhvhdbvdhv'>
                            <img
                                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/4/22/85df9d8f-175f-4e3a-8945-468bf6317eee_eb9bf247-f2d1-413d-9cf5-48bc870b222f'
                                alt=''
                                height={'200px'}
                                width={'200px'}
                            />
                            <br />
                            Fresh Fruits
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                        <div className='dhvhdbvdhv'>
                            <img
                                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/4/22/639b3476-3476-4191-b804-63f03372187e_bc1e0aa4-8baa-4875-9095-3074791b7462'
                                alt=''
                                height={'200px'}
                                width={'200px'}
                            />
                            <br />
                            Dairy, Breads & Eggs
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                        <div className='dhvhdbvdhv'>
                            <img
                                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/4/22/361c53ad-61d8-4ea7-a73d-e12c265d2d48_f174f2ff-021f-4035-b359-be281cba8d46'
                                alt=''
                                height={'200px'}
                                width={'200px'}
                            />
                            <br />
                            Rice, Atta and Dals
                        </div>
                    </Link>
                </div>
                <div className='hdfhdf'>
                    Discover best restaurants on Dineout
                </div>
            </div>
        </div>
    );
}
