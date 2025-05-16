import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Headers from '../Components/headers';

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

export default function Accounts_homepage() {
    const [user, setuser] = useState('');
    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setuser(user.uid);
                // console.log('User is signed in:', user.uid);
            } else {
                window.location.href = '/';
                // setuser(null);
            }
        });
        return unsubscribe;
    }, []);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {

                const docRef = doc(db, 'Users', user);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log('Document data:', docSnap.data());
                    const data = docSnap.data();
                    setusername(data['Name']);
                    setemail(data['Email']);
                    setphone(data['Phone Number']);
                    // console.log(data['Name']);
                    // console.log(data['Email']);
                } else {
                    console.log('No such document!');
                }
            }
        };
        fetchUserData();
    }, [user]);
    const [orders, setorders] = useState([]);
    const [orderdetails, setorderdetails] = useState(false);
    const [activeTab, setActiveTab] = useState('Orders');
    const [showLogin, setShowLogin] = useState(false);
    const [clickedLogin, setClickedLogin] = useState(false);
    const toggleLogin = () => {
        setShowLogin((prev) => !prev);
    };
    useState(() => {
        const fetchorders = async () => {
            const user = auth.currentUser;
            const uid = user.uid;
            const docRef = doc(db, 'User Orders', user);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setorderdetails(true);
                const data = docSnap.data();
            }
        }
        fetchorders();
    }, [user]);
    const [name, setName] = useState('');
    const [emailid, setemailid] = useState('');
    const updatedetails = async () => {
        console.log(name);
        console.log(emailid);
        const user = auth.currentUser;
        const uid = user.uid;
        console.log(uid);
        const docRef = doc(db, 'Users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            const updatedData = {
                'Name': name,
                'Email': emailid,
            };
            await updateDoc(docRef, updatedData);
            alert('User details updated successfully');
            setusername(name);
            setemail(emailid);
            setName('');
            setemailid('');
            window.location.reload();
        }
    }
    return (
        <div className="webbody" style={{ overflowX: 'scroll' }}>
            {showLogin && <div className='blur-overlay' onClick={toggleLogin}></div>}

            {/* Sidebar login section */}
            {showLogin && (
                <div className='loginsection'>

                </div>
            )}
            <Headers label="MY ACCOUNT" />
            <div className="jfnbjngb">

                <div className="ndbhvbhfv">
                    {username}
                    <div className="jdhvjv">
                        {phone}    •    {email}
                    </div>
                </div>
                <div className="dbnfjvnf">
                    <div className="ffbvfv">
                        <div className="bdvhdbvjdv">
                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'Orders' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('Orders')}
                            >
                                <Link className="djcdjh" style={{ textDecoration: 'none', color: 'black' }}>
                                    Orders
                                </Link>
                            </div>

                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'EditProfile' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('EditProfile')}
                            >
                                <Link className="jdfb" style={{ textDecoration: 'none', color: 'black' }}>
                                    Edit Profile
                                </Link>
                            </div>

                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'Addresses' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('Addresses')}
                            >
                                <Link className="bdvbdv" style={{ textDecoration: 'none', color: 'black' }}>
                                    Addresses
                                </Link>
                            </div>

                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'Payment' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('Payment')}
                            >
                                <Link className="ndbcdb" style={{ textDecoration: 'none', color: 'black' }}>
                                    Payment
                                </Link>
                            </div>
                        </div>
                        <div className="ghdbvdnv" style={{ justifyContent: activeTab === 'EditProfile' ? 'start' : 'center', marginTop: activeTab === 'EditProfile' ? '50px' : '0px' }}>
                            {setorderdetails && activeTab === 'Orders' && (
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw" alt="" height="200px" />
                            )}
                            {
                                activeTab === 'EditProfile' && (
                                    <div className='login_input' style={{ width: '100%' }}>
                                        <input
                                            type='text'
                                            className='login_input1'
                                            placeholder={username}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input
                                            type='email'
                                            className='login_input1'
                                            placeholder={email}
                                            value={emailid}
                                            onChange={(e) => setemailid(e.target.value)}
                                        />
                                        <div
                                            className='dnjcbdjvd' onClick={updatedetails}
                                        >Update User Details</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
