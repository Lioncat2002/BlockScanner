import { prisma } from "@/server/db/db";
import { BaseDeposit, DepositRepositoryDto } from "@/server/domain/deposit.domain";

export async function CreateDeposits(newDeposits: DepositRepositoryDto[]) {
  try {
    const deposits = await prisma.deposit.findMany();
    console.log("deposits:",deposits)
    const txns = new Set(deposits.map((deposit) => deposit.hash));
    const depositsToCreate = newDeposits.filter(
      (deposit) => !txns.has(deposit.hash)
    );

    if (depositsToCreate.length > 0) {
      await prisma.deposit.createMany({
        data: depositsToCreate,
      });
    }

    return { success: true, data: "ok" };
  } catch (error) {
    return { success: false, data: "failed to create", error: error };
  }
}
