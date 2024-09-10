"use client";
import {
  putDeposit,
  putAllDepositsInBatches,
  getAllDeposits,
} from "@/server/controllers/deposit.controller";
import { BaseDeposit } from "@/server/domain/deposit.domain";
import { useEffect, useState } from "react";
import { DataTable } from "./deposits/data-table";
import { columns } from "./deposits/columns";

export default function Home() {
  // Create Contract Object
  const [deposits, setDeposits] = useState<BaseDeposit[]>([]);
  // Event Listener for Deposits
  useEffect(() => {
    async function getAllDepositsFromServer() {
      const response = await getAllDeposits(0, 100);
      if (!response.success) {
        console.log("failed to get deposits");
        return;
      }
      setDeposits(response.data);
    }
    getAllDepositsFromServer();
    async function putDepositsFromInfura() {
      const response = await putAllDepositsInBatches();
      console.log(response);
    }
    putDepositsFromInfura();
    putDeposit();

    
  }, []);
  console.log(deposits);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={deposits} />
    </div>
  );
}
