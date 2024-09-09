import { DepositServiceDto } from "@/server/domain/deposit.domain";
import { CreateDeposits, getAllDeposits } from "./deposit.sqlite";

export async function CreateDepositsService(newDeposits: DepositServiceDto[]) {
  return CreateDeposits(newDeposits);
}

export async function getAllDepositsService(start: number, size: number) {
  return getAllDeposits(start, size);
}
