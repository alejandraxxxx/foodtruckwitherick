import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateFoodDto {
 @MinLength(3)
 @IsString()

food_name:string

@IsString()
@MinLength(10)
description:string

@IsNumber()
@IsPositive()
@Min(1)
price:number

@IsString()
type:string
}
