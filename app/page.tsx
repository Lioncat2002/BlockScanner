"use client";
import {
  putDeposit,
  putAllDeposits,
  getAllDeposits,
} from "@/server/controllers/deposit.controller";
import { useEffect } from "react";
import { DataTable } from "./deposits/data-table";
import { columns } from "./deposits/columns";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // Create Contract Object
  // Fetch all deposits
  const { data: deposits } = useQuery({
    queryKey: ["getAllDeposits", 0, 100],
    queryFn: () => getAllDeposits(0, 100),
    refetchInterval: 60000, //refetch every 1 min
  });

  useEffect(() => {
    async function putDepositsFromInfura() {
      putAllDeposits();
    }
    putDepositsFromInfura();
    putDeposit();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <div className="font-bold text-4xl p-4">BlockScanner</div>
      <DataTable
        columns={columns}
        data={deposits?.success === true ? deposits.data : []}
      />
    </div>
  );
}
