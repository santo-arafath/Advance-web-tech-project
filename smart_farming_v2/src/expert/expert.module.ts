
import { Module } from '@nestjs/common';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertEntity, SolutionEntity } from './expert.entity';
import { ProfileEntity } from './updateprofile.entity';
import { Message } from './message.entity';
//import { RecommendationEntity } from './recommendation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ExpertEntity,SolutionEntity,ProfileEntity,Message])],
  controllers: [ExpertController],
  providers: [ExpertService],
})
export class ExpertModule {}
