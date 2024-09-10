import { prisma } from "@/server/db/db";
import {
  BaseDeposit,
  DepositRepositoryDto,
} from "@/server/domain/deposit.domain";
import { Response } from "@/server/utils/IResponse";

export async function CreateDeposits(
  newDeposits: DepositRepositoryDto[]
): Promise<Response<string>> {
  try {

    const values = newDeposits.map((deposit) => [
      deposit.createdAt,
      deposit.updatedAt,
      deposit.blockNumber,
      deposit.blockTimestamp,
      deposit.fee,
      deposit.hash,
      deposit.pubkey,
    ]);

    // Flatten the array for Prisma's query
    const flattenedValues = values.flat();

    const placeholders = newDeposits
      .map(() => `(?, ?, ?, ?, ?, ?, ?)`)
      .join(", ");

    const query = `
  INSERT OR IGNORE INTO Deposit (createdAt, updatedAt, blockNumber, blockTimestamp, fee, hash, pubkey)
  VALUES ${placeholders};
`;

    await prisma.$queryRawUnsafe(query, ...flattenedValues);
   
    return { success: true, data: "ok", statusCode: 201 };
  } catch (error) {
    console.log(error);
    return { success: false, message: "failed to create", statusCode: 500 };
  }
}

export async function getAllDeposits(
  start: number,
  size: number
): Promise<Response<BaseDeposit[]>> {
  try {
    const deposits = await prisma.deposit.findMany();

    return { success: true, data: deposits, statusCode: 200 };
  } catch (error) {
    return {
      success: false,
      message: "failed to get all deposits",
      statusCode: 500,
    };
  }
}
