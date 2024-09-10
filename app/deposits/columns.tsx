"use client";

import { BaseDeposit } from "@/server/domain/deposit.domain";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<BaseDeposit>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "blockNumber",
    header: () => <div className="text-left">Block Number</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("blockNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "blockTimestamp",
    header: () => <div className="text-left">Block Timestamp</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("blockTimestamp")}
        </div>
      );
    },
  },
  {
    accessorKey: "fee",
    header: () => <div className="text-left">Fee</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {(row.getValue("fee") as bigint).toString()}
        </div>
      );
    },
  },
  {
    accessorKey: "hash",
    header: () => <div className="text-left">Hash</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("hash")}</div>
      );
    },
  },
  {
    accessorKey: "pubkey",
    header: () => <div className="text-left">Public Key</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("pubkey")}</div>
      );
    },
  },
];
