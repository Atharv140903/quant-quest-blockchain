const userRepository = require("../repositories/userRepository");
const nonceRepository = require("../repositories/nonceRepository");
const { v4: uuidv4 } = require("uuid");
const Web3 = require("web3");
const web3 = new Web3();
const { createJwtToken } = require("../utils/token.util");

module.exports = {
    async requestNonce(walletAddress) {
        const nonce = uuidv4(); // Generate a unique nonce
        await nonceRepository.create(nonce, walletAddress);
        return nonce;
    },

    async verifySignature(walletAddress, signature) {
        const nonce = await nonceRepository.getNonce(walletAddress);
        if (!nonce) {
            throw new Error("Nonce not found");
        }

        const message = `Nonce: ${nonceEntry.nonce}`;
        const recoveredAddress = web3.eth.accounts.recover(message, signature);

        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            throw new Error("Signature verification failed");
        }

        // Check if the user already exists
        let user = await User.findOne({ walletAddress });

        if (!user) {
            return {
                message: "User not found, Please register",
            }
        }

        // Generate JWT token
        const token = createJwtToken(walletAddress);

        // Delete the nonce after verification
        await nonceRepository.deleteNonce(walletAddress);

        return token;
    },


    async registerUser(walletAddress, username, email) {
        // Check if user already exists
        let user = await userRepository.getUserByAddress(walletAddress);

        if(user) {
            throw new Error("User already exists");
        }

        // Create a new user
        user = await userRepository.create({ walletAddress, username, email });

        // Generate JWT token
        const token = createJwtToken(walletAddress);

        return token;
    },


};
