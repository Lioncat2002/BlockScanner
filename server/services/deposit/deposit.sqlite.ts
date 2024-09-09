import { prisma } from "@/server/db/db";
import { BaseDeposit, DepositRepositoryDto } from "@/server/domain/deposit.domain";
import { Response } from "@/server/utils/IResponse";

export async function CreateDeposits(newDeposits: DepositRepositoryDto[]):Promise<Response<string>> {
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

    return {success:true,data:"ok",statusCode:201 };
  } catch (error) {
    console.log(error)
    return {success:false,message:"failed to create",statusCode:500 };
  }
}

export async function getAllDeposits(start:number,size:number):Promise<Response<BaseDeposit[]>>{
    try{
        const deposits=await prisma.deposit.findMany()

        return {success:true,data:deposits,statusCode:200 }
    }catch(error){
        return {success:false,message:"failed to get all deposits",statusCode:500 };
    }
}