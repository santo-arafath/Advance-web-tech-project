import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpertEntity } from "./expert.entity";

@Entity("udateprofile")
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    P_id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    phoneNumber: string;
    //@Column()
    //expertId:number;

    @OneToOne(type => ExpertEntity, expert => expert.uprofile)
    expert: ExpertEntity;


}