
import { Module } from '@nestjs/common';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertEntity, SolutionEntity } from './expert.entity';
import { ProfileEntity } from './updateprofile.entity';
import { Message } from './message.entity';
import { MailerModule } from '@nestjs-modules/mailer';
//import { RecommendationEntity } from './recommendation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ExpertEntity,SolutionEntity,ProfileEntity,Message]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'binteoysha@gmail.com', 
        pass: 'My app password', 
      },
    },
  }),
],
  controllers: [ExpertController],
  providers: [ExpertService],
})
export class ExpertModule {}
