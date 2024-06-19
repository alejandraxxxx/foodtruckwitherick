import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity'; 
import { NotFoundError, catchError } from 'rxjs';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodRepo:Repository<Food>
  ){}
  async create(createDTO:CreateFoodDto){
    try{
    const food = this.foodRepo.create(
      createDTO);
      await this.foodRepo.save(food); //este crea el registro
      return food;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }}

 async findAll() {
  try{
    const foods=this.foodRepo.find();
    return foods;
  }
  catch(error){
    throw new InternalServerErrorException(error);
  }}

  async findOne(id: number) {
    const food= await this.foodRepo.findOne(
      {
        where:{
          id
        }
      }
    );
    if(!food){
      throw new NotFoundException('Producto no encontrado');
    }
    return food;
  }

 async update(id: number, updateFood: UpdateFoodDto) {
    try{
      const food= await this.foodRepo.preload({
        id,
        ... updateFood   });
        await this.foodRepo.save(food);
        return food;}
        catch(error){
          throw new InternalServerErrorException(error);
        }
  }

  async remove(id: number) {
     const food= await this.foodRepo.findOne(
      {
        where:{
          id
        }
      }
    );
    await this.foodRepo.delete(id);
    if(!food){
      throw new NotFoundException('Producto no encontrado');
    }
    return food;
  }}