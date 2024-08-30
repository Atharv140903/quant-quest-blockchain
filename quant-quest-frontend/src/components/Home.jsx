import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { setWalletAddress } from '../slices/walletSlice';

const Home = () => {
  const [warningMessage, setWarningMessage] = useState(''); // State for warning message
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.address);
  const navigate = useNavigate();
  console.log(walletAddress);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log(accounts[0]);
        dispatch(setWalletAddress(accounts[0]));
      } catch (error) {
        console.error('User rejected connection:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const handleGetStarted = () => {
    if (walletAddress) {
      navigate('/learn'); // Navigate to /learn if walletAddress is not null
    } else {
      setWarningMessage('Please connect your wallet to get started.'); // Set warning message
      setTimeout(() => setWarningMessage(''), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div className="home-container">
      <div className="top-nav">
        <img src="/smallLogo.svg" alt="QuantFi" className="small-logo" />
        <div className="nav-buttons">
          <button className="nav-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </div>

      <div className="main-content">
        <img src="/logo.svg" alt="Logo" className="main-logo" />
        <h1>Learn Quantitative Finance With Experts</h1>

        <div>
          <button className="get-started-button" onClick={handleGetStarted}>
            Get started &gt;&gt;
          </button>
        </div>

        {walletAddress && (
          <div style={styles.successMessage}>
            Wallet connected successfully!
          </div>
        )}

        {warningMessage && (
          <div style={styles.warningMessage}>
            {warningMessage}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  successMessage: {
    color: '#00FFA3',
    fontSize: '16px',
    marginTop: '10px',
  },
  warningMessage: {
    color: 'red',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default Home;
