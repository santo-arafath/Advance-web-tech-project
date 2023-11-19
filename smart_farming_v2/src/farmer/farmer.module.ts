import { Module } from "@nestjs/common";
import { FarmerController } from "./farmer.controller";
import { FarmerService } from "./farmer.service";
import { FarmerEntity, RequestEntity } from "./farmer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
import { ExpertEntity, VetEntity } from "./expert.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FarmerEntity, ProductEntity, OrderEntity, ExpertEntity, VetEntity, RequestEntity,])],
    controllers: [FarmerController],
    providers: [FarmerService],
})

export class FarmerModule {}