import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity} from './Admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertEntity } from 'src/Expert/Expert.entity';
import { VatEntity } from 'src/Veterinary-doctor/Vaterinary.entity';
import { FarmerEntity } from 'src/Farmer/Farmer.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity,ExpertEntity,FarmerEntity,VatEntity]),MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
    user: 'arafath.hossen.santo97193@gmail.com',
    pass: 'ssss ssss'
    },
    }})
    ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
