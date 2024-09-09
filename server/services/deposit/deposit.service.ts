import { DepositServiceDto } from "@/server/domain/deposit.domain";
import { CreateDeposits } from "./deposit.sqlite";

export async function CreateDepositsService(newDeposits: DepositServiceDto[]) {
  return CreateDeposits(newDeposits);
}
