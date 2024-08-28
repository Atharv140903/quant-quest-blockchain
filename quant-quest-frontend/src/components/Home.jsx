import React, { useState } from "react";
import Register from "./Register";

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
    <div style={styles.container}>
      <h2>Welcome to My Quiz App</h2>
      {walletAddress ? (
        <>
          <p>Connected Account: {walletAddress}</p>
        </>
      ) : (
        <>
          <p>Connect your MetaMask wallet to start using the app.</p>
          <button onClick={connectWallet} style={styles.button}>
            Connect Wallet
          </button>
          <button
            onClick={() => setShowRegister(true)}
            style={{ ...styles.button, marginTop: "10px" }}
          >
            Get Started
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
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
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
