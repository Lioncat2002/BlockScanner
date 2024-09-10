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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  // Create Contract Object
  const [newDeposits, setDeposits] = useState<BaseDeposit[]>([]);
  const queryClient = useQueryClient();
  // Fetch all deposits
  const {
    data: deposits,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllDeposits", 0, 100],
    queryFn: () => getAllDeposits(0, 100),
    refetchInterval:60000//refetch every 1 min
  });

  
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
    }
    putDepositsFromInfura();
    putDeposit();

    
  }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={deposits?.success === true ? deposits.data : []}
      />
    </div>
  );
}
