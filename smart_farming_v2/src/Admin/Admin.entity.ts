import { ExpertEntity } from "src/Expert/Expert.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Admin_information')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "character varying", })
    name: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    filename: string;
     
    @ManyToMany(() => ExpertEntity, expert => expert.admins)
    @JoinTable()
    experts: ExpertEntity[];
    


}




@Entity('Farmer_information')
export class FarmerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "character varying", })
    name: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    filename: string;



}


