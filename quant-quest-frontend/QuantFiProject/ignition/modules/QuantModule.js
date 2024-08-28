const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("QuantModule", (m) => {
  // No parameters needed for the constructor
  const quant = m.contract("quant", []);

  return { quant };
});
