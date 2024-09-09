"use client";
import { putDeposit, putAllDepositsInBatches } from "@/server/controllers/deposit.controller";
import { useEffect } from "react";

export default function Home() {
  // Create Contract Object

  // Event Listener for Deposits
  useEffect(() => {
    async function putDeposits() {
      const response = await putAllDepositsInBatches();
      console.log(response);
    }
    putDeposits()
    putDeposit()
  }, []);

  return <div></div>;
}
