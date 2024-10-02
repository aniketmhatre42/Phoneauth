import { BsFillShieldLockFill, BsFillTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import './index.css';
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize RecaptchaVerifier
    const initRecaptcha = () => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            // Recaptcha verified
          },
          'expired-callback': () => {
            console.log('Recaptcha expired');
          }
        });
      }
    };

    initRecaptcha();
  }, []);

  const handleSendCode = () => {
    if (!window.recaptchaVerifier) {
      console.error('RecaptchaVerifier not initialized');
      return;
    }

    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sent successfully!');
      })
      .catch((error) => {
        console.error('Error during signInWithPhoneNumber:', error);
        setLoading(false);
        toast.error('Failed to send OTP: ' + error.message);
      });
  };

  const handleVerifyOTP = () => {
    if (!window.confirmationResult) {
      console.error('ConfirmationResult not found');
      return;
    }

    window.confirmationResult.confirm(otp)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('OTP verified successfully!');
      })
      .catch((error) => {
        console.error('Error during OTP verification:', error);
        toast.error('Failed to verify OTP: ' + error.message);
      });
  };

  return (
    <div className="bg-emerald-500 flex items-center justify-center h-screen">
      <div className="w-96 flex flex-col gap-6 rounded-lg p-6">
        <h1 className="text-center leading-normal text-white font-medium text-4xl mb-8">
          Welcome to MEDICONNECT
        </h1>

        <ToastContainer />

        <div id="recaptcha-container"></div>

        {user && (
          <h2 className="text-center text-white font-medium text-2xl mb-4">
            Login Success 👍
          </h2>
        )}

        <div className="bg-white text-emerald-500 w-fit mx-auto p-5 rounded-full">
          <BsFillShieldLockFill size={40} />
        </div>

        {!showOTP && (
          <>
            <label htmlFor="mobile" className="font-bold text-3xl text-white mt-6">
              Enter Your Mobile Number
            </label>
            <div className="flex items-center bg-white rounded-lg px-4 py-3">
              <BsFillTelephoneFill className="text-emerald-500 mr-3" size={30} />
              <input
                type="tel"
                id="mobile"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="flex-1 bg-transparent text-emerald-900 text-xl outline-none"
                placeholder="Enter Mobile Number"
              />
            </div>

            <button
              onClick={handleSendCode}
              className="bg-emerald-600 w-full flex items-center justify-center py-2.5 text-white text-xl rounded mt-4"
            >
              Send Code via SMS
            </button>
          </>
        )}

        {showOTP && (
          <>
            <label htmlFor="otp" className="font-bold text-3xl text-white mt-6">
              Enter Your OTP
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="otp-container text-xl"
            />

            <button
              onClick={handleVerifyOTP}
              className="bg-emerald-600 w-full flex gap-2 items-center justify-center py-3.5 text-white text-xl rounded mt-6"
            >
              {loading && <CgSpinner size={24} className="animate-spin" />}
              <span>Verify OTP</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
