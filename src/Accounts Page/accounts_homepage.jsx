import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
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
    return (
        <div className="webbody" style={{ overflowX: 'scroll' }}>
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
                                <Link  className="djcdjh" style={{ textDecoration: 'none', color: 'black' }}>
                                    Orders
                                </Link>
                            </div>

                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'Favourites' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('Favourites')}
                            >
                                <Link  className="jdfb" style={{ textDecoration: 'none', color: 'black' }}>
                                    Favourites
                                </Link>
                            </div>

                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'Addresses' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('Addresses')}
                            >
                                <Link  className="bdvbdv" style={{ textDecoration: 'none', color: 'black' }}>
                                    Addresses
                                </Link>
                            </div>

                            <div
                                className="ndjvhjdvhdj"
                                style={{ backgroundColor: activeTab === 'Payment' ? 'white' : 'transparent' }}
                                onClick={() => setActiveTab('Payment')}
                            >
                                <Link  className="ndbcdb" style={{ textDecoration: 'none', color: 'black' }}>
                                    Payment
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
