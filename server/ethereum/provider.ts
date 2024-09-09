import { ethers } from "ethers";

export const PROVIDER = new ethers.JsonRpcProvider(process.env.INFURA_MAIN_NET);

export const depositABI = [
  "event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)",
];
