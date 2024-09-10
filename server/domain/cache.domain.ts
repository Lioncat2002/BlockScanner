import { BaseDeposit, DepositControllerDto, DepositServiceDto } from "./deposit.domain"

export type BaseCache={
    data:DepositServiceDto,
    exp:number
}