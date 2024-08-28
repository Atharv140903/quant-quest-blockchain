import React, { useState } from "react";
import Register from "./Register";
import './Home.css'; // Assuming your styles are in Home.css

const Home = ({ walletAddress, setWalletAddress }) => {
  const [showRegister, setShowRegister] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]); // Set the wallet address in App.jsx state
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("User rejected connection:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const handleRegisterSubmit = (email, username) => {
    console.log(
      "User registered with email:",
      email,
      "and username:",
      username
    );
    setShowRegister(false);
    connectWallet(); // Trigger MetaMask popup after registration
  };

  return (
    <div className="home-container">
      {/* Top navigation with logo and buttons */}
      <div className="top-nav">
        <img src="/smallLogo.svg" alt="QuantFi" className="small-logo" />
        <div className="nav-buttons">
          <button className="nav-button" onClick={connectWallet}>
            Connect Wallet
          </button>
          <button className="nav-button" onClick={() => setShowRegister(true)}>
            Register
          </button>
        </div>
      </div>

      {/* Main content with logo and text */}
      <div className="main-content">
        <img src="/logo.svg" alt="Logo" className="main-logo" />
        <h1>Learn Quantitative Finance With Experts</h1>

        {walletAddress ? (
          <p>Connected Account: {walletAddress}</p>
        ) : (
          <>
            {/* Only keep the Get Started button centered */}
            <button className="get-started-button" onClick={() => setShowRegister(true)}>
              Get started &gt;&gt;
            </button>
          </>
        )}

        {showRegister && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <Register onSubmit={handleRegisterSubmit} />
              <button
                onClick={() => setShowRegister(false)}
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default Home;
