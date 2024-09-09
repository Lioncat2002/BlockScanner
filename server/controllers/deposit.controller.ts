"use server";

import { ethers } from "ethers";
import { depositABI, PROVIDER } from "../ethereum/provider";
import {
  BaseDeposit,
  DepositControllerDto,
  DepositServiceDto,
} from "../domain/deposit.domain";
import {
  CreateDepositsService,
  getAllDepositsService,
} from "../services/deposit/deposit.service";
import { Response } from "../utils/IResponse";
import { sendNotification } from "../utils/telegram_bot";
export async function putDeposit() {
  const depositContract = new ethers.Contract(
    process.env.BEACON_DEPOSIT_CONTRACT_ADDR!,
    depositABI,
    PROVIDER
  );

  depositContract.on("DepositEvent", async (event) => {
    try {
      const { pubkey, withdrawal_credentials, amount, signature, index } =
        event.args;
      console.log(
        `New deposit - PubKey: ${pubkey}, Amount: ${ethers.formatEther(
          amount
        )}, Index: ${index}`
      );
      const block = await PROVIDER.getBlock(event.blockNumber);
      const deposit: DepositServiceDto = {
        blockNumber: event.blockNumber,
        createdAt: Date.now() as unknown as bigint,
        updatedAt: Date.now() as unknown as bigint,
        blockTimestamp: block?.timestamp || 0,
        fee: block?.baseFeePerGas || (0 as unknown as bigint),
        hash: event.transactionHash,
        pubkey: pubkey,
      };
      //store in db
      const response = await CreateDepositsService([deposit]);
      if (!response.success) {
        console.log({ status: 500, data: "failed", error: response.message });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function putAllDepositsInBatches() {
  const startBlock = 20713988; // starting from this transaction https://etherscan.io/tx/0xdca45faff0b458d3d1915b18ad0e41f4d36e81c584307b2446694219a9ed27e0

  const depositContract = new ethers.Contract(
    process.env.BEACON_DEPOSIT_CONTRACT_ADDR!,
    depositABI,
    PROVIDER
  );

  // Get the latest block number
  const latestBlock = await PROVIDER.getBlockNumber();

  // Fetch all DepositEvent logs from the contract
  const depositEvents = await depositContract.queryFilter(
    "DepositEvent",
    startBlock,
    latestBlock
  );
  const deposits = [];
  // Process each deposit event
  for (const event of depositEvents) {
    const block = await PROVIDER.getBlock(event.blockNumber);

    const { pubkey, withdrawal_credentials, amount, signature, index } =
      //@ts-ignore
      event.args;
    const deposit: DepositServiceDto = {
      blockNumber: event.blockNumber,
      createdAt: Date.now() as unknown as bigint,
      updatedAt: Date.now() as unknown as bigint,
      blockTimestamp: block?.timestamp || 0,
      fee: block?.baseFeePerGas || (0 as unknown as bigint),
      hash: event.transactionHash,
      pubkey: pubkey,
    };
    deposits.push(deposit);
  }

  const response = await CreateDepositsService(deposits);
  if (!response.success) {
    return { status: 500, data: "failed", error: response.message };
  }
  console.log(response);

  return { status: 201, data: "ok" };
}

export async function getAllDeposits(
  start: number,
  size: number
): Promise<Response<BaseDeposit[]>> {
  const response = await getAllDepositsService(start, size);
  if (!response.success) {
    return {
      success: false,
      message: "failed to get deposits",
      statusCode: 500,
    };
  }
  console.log(response);
  sendNotification("new transaction received")

  return { success: true, data: response.data, statusCode: 201 };
}
