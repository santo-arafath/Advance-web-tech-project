import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/Admin.module';

@Module({
  imports: [AdminModule,TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'santo',
     database: 'Smart_Farm_DB',
     autoLoadEntities: true,
     synchronize: true,
     } ),
    
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
