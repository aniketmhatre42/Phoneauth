import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use this if you're using react-router for navigation

const PatientReg = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // For navigation to chatbot page

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const aadhaarPattern = /^\d{12}$/;
    const phonePattern = /^\d{10}$/;

    if (!aadhaarPattern.test(aadhaar)) {
      setError('Invalid Aadhaar number. It must be 12 digits.');
      return;
    }

    if (!phonePattern.test(phone)) {
      setError('Invalid phone number. It must be 10 digits.');
      return;
    }

    // Mock authentication logic
    if (aadhaar === '123456789012' && phone === '9876543210') {
      setIsAuthenticated(true);
      setError('');

      // Navigate to the chatbot page after successful authentication
      setTimeout(() => {
        navigate('/chatbot'); // Adjust the route as needed
      }, 1500); // Delay to show the success message briefly
    } else {
      setError('Authentication failed. Please check your Aadhaar and phone number.');
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">M E D I C O N N E C T</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Aadhaar Number</label>
            <input
              type="text"
              maxLength="12"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your Aadhaar number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input
              type="text"
              maxLength="10"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Authenticate
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {isAuthenticated && (
          <div className="mt-4 text-green-500 text-center">
            Authentication Successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReg;
