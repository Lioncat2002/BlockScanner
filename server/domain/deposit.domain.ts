export type BaseDeposit = {
  id: number;
  createdAt: bigint;
  updatedAt: bigint;

  blockNumber: number;
  blockTimestamp: number;
  fee: bigint;
  hash: string;
  pubkey: string;
};

export type DepositControllerDto = Omit<
  BaseDeposit,
  "id" | "createdAt" | "updatedAt"
>;
export type DepositServiceDto = Omit<BaseDeposit, "id">;
export type DepositRepositoryDto = DepositServiceDto;
