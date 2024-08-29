import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    driver: "postgres",
    database:"todo",
    host:"ep-proud-math-a56oqmvo.us-east-2.aws.neon.tech",
    username:"todo_owner",
    password:"iHhfSdZTqE13",
    ssl: true,
    synchronize: true,
    autoLoadEntities: true
  })], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//postgresql://todo_owner:iHhfSdZTqE13@ep-proud-math-a56oqmvo.us-east-2.aws.neon.tech/todo?sslmode=require