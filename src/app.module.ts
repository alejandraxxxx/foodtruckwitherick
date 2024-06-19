import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port: 3306,
  username:'root',
  password:'',
  database:'foodtruck',
  autoLoadEntities:true,
  synchronize: true
  
  }),
  FoodsModule],
})
export class AppModule {}

