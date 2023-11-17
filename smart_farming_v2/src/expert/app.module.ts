
import { Module } from '@nestjs/common';

import { ExpertModule } from './expert/expert.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [ExpertModule,
    TypeOrmModule.forRoot(
      { type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: 'saida',
       database: 'Expert',//Change to your database name
       autoLoadEntities: true,
       synchronize: true,
       } ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
