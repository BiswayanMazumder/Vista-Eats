import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Headers from '../Components/headers';

// Firebase config
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
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [orders, setorders] = useState([]);
    const [orderdetails, setorderdetails] = useState(false);
    const [activeTab, setActiveTab] = useState('Orders');
    const [showLogin, setShowLogin] = useState(false);
    const [clickedLogin, setClickedLogin] = useState(false);
    const [name, setName] = useState('');
    const [emailid, setemailid] = useState('');

    useEffect(() => {
        document.title = "Order Food & Groceries. Discover the best restaurants.";
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setuser(user.uid);
            } else {
                window.location.href = '/';
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const docRef = doc(db, 'Users', user);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setusername(data['Name']);
                    setemail(data['Email']);
                    setphone(data['Phone Number']);
                } else {
                    console.log('No such document!');
                }
            }
        };
        fetchUserData();
    }, [user]);

    useEffect(() => {
        const fetchorders = async () => {
            const user = auth.currentUser;
            if (!user) return;
            const uid = user.uid;
            const docRef = doc(db, 'User Orders', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setorderdetails(true);
                const data = docSnap.data();
                setorders(data);
            }
        };
        fetchorders();
    }, [user]);

    const toggleLogin = () => {
        setShowLogin((prev) => !prev);
    };

    const updatedetails = async () => {
        const trimmedName = name.trim();
        const trimmedEmail = emailid.trim();

        if (!trimmedName && !trimmedEmail) {
            alert('Please fill at least one field to update');
            return;
        }

        const user = auth.currentUser;
        if (!user) return;

        const uid = user.uid;
        const docRef = doc(db, 'Users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const currentData = docSnap.data();
            const updatedData = {};

            if (trimmedName && trimmedName !== currentData.Name) {
                updatedData.Name = trimmedName;
            }

            if (trimmedEmail && trimmedEmail !== currentData.Email) {
                updatedData.Email = trimmedEmail;
            }

            if (Object.keys(updatedData).length === 0) {
                alert('No changes detected to update.');
                return;
            }

            await updateDoc(docRef, updatedData);
            alert('User details updated successfully');

            if (updatedData.Name) setusername(updatedData.Name);
            if (updatedData.Email) setemail(updatedData.Email);

            setName('');
            setemailid('');
            // window.location.reload();
        } else {
            alert('User data not found.');
        }
    };

    return (
        <div className="webbody" style={{ overflowX: 'scroll' }}>
            {showLogin && <div className='blur-overlay' onClick={toggleLogin}></div>}

            {showLogin && (
                <div className='loginsection'>
                    {/* Add your login section content here */}
                </div>
            )}

            <Headers label="MY ACCOUNT" />

            <div className="jfnbjngb">
                <div className="ndbhvbhfv">
                    {username}
                    <div className="jdhvjv">
                        {phone} • {email}
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

                        <div
                            className="ghdbvdnv"
                            style={{
                                justifyContent: activeTab === 'Orders' ? 'center' : 'start',
                                marginTop: activeTab === 'EditProfile' || activeTab === 'Addresses' || activeTab === 'Payment' ? '50px' : '0px'
                            }}
                        >
                            {activeTab === 'Orders' && (
                                <img
                                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw"
                                    alt="No orders"
                                    height="200px"
                                />
                            )}

                            {activeTab === 'EditProfile' && (
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
                                        className='dnjcbdjvd'
                                        onClick={() => {
                                            updatedetails();
                                        }}
                                    >
                                        Update User Details
                                    </div>
                                </div>
                            )}
                            {activeTab === 'Addresses' && (
                                <div className='login_input' style={{ width: '100%',marginTop:'20px',marginLeft:'50px',fontWeight:'bold',fontSize:'20px' }}>
                                    Manage Addresses
                                </div>
                            )}
                            {activeTab === 'Payment' && (
                                <div className='login_input' style={{ width: '100%',marginTop:'20px',marginLeft:'50px',fontWeight:'bold',fontSize:'20px' }}>
                                    Payments
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
