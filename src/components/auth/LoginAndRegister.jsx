import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leftimage from "../../assets/sl4.webp";
import axios from 'axios';

const LoginAndRegister = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:1199/api/login', { email: formData.email, password: formData.password });
      console.log("success"+response.data.status)
      console.log(response.data);
      if (response.data.status) {
          localStorage.setItem('token', response.data.data.token);
          navigate('/dashboard');
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:1199/api/register', formData);
      if (response.data.status) {
          navigate('/login'); // Update the path accordingly
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <section className="grid grid-cols-12">
        <div id="left" className="col-start-1 col-end-7 w-full bg-gray-300">
          <div className="grid place-items-center h-screen">
            <img src={leftimage} alt="" />
          </div>
        </div>
        <div id="right" className="flex items-center justify-center col-start-7 col-end-13 bg-white">
          <div className="flex justify-center items-center px-20 min-h-screen min-w-full text-xl">
            <div className="flex flex-col min-w-full">
              <form className="mx-auto w-2/3" onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
                <div className="text-3xl flex justify-center">{isRegistering ? 'Register' : 'Login Here'}</div>
                <div className="flex flex-col space-y-10 mt-10 justify-center items-center">
                  {isRegistering && (
                    <>
                      <input className="w-full p-3 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-400 placeholder-gray-600 text-lg font-normal rounded-t-lg" type="text" name="username" placeholder="User Name" value={formData.username} onChange={handleInputChange} required />
                      <input className="w-full p-3 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-400 placeholder-gray-600 text-lg font-normal rounded-t-lg" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                      <input className="w-full p-3 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-400 placeholder-gray-600 text-lg font-normal rounded-t-lg" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                    </>
                  )}

                  {!isRegistering && (
                    <>
                      <input className="w-full p-3 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-400 placeholder-gray-600 text-lg font-normal rounded-t-lg" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                      <input className="w-full p-3 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-400 placeholder-gray-600 text-lg font-normal rounded-t-lg" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                    </>
                  )}
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="w-full flex justify-center items-center rounded-lg bg-purple-600 hover:bg-green-700 mt-12 py-2 font-bold text-white">
                    {isRegistering ? 'Register' : 'Login'}
                  </button>
                </div>

                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              </form>

              <div className="text-xl mt-6 flex flex-col justify-center items-center space-y-3">
                <p className="text-lg cursor-pointer" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? 'Back to Login' : 'Register User'}
                </p>
                <p className="text-lg cursor-pointer">Forget your Password?</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginAndRegister;
