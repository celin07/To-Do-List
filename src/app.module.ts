import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TodoModule } from './modules/to-do/todo-module';

@Module({
  imports: 
    [TypeOrmModule.forRoot({
      type: "postgres",
      database: "todo",
      host: "ep-proud-math-a56oqmvo.us-east-2.aws.neon.tech",
      username: "todo_owner",
      password: "iHhfSdZTqE13",
      port: 5432,
      ssl: true,
      synchronize: true,
      autoLoadEntities: true,
      uuidExtension: "pgcrypto",
      namingStrategy: new SnakeNamingStrategy(),
    }), 
    TodoModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
