import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./updateprofile.entity";
//import { RecommendationEntity } from "./recommendation.entity";

@Entity("expert")
export class ExpertEntity {
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
    filename: string;
    @Column()
    email:string;

    @Column('float', { default: 0 })
    ratings: number;

    @Column('float', { default: 0 }) // Add this line for balance
    balance: number;

    @Column({ nullable: true }) // Add this line for currency
    currency: string;

    @Column({ nullable: true }) // Add this line for paymentMethod
    paymentMethod: string;

    @OneToMany(type => SolutionEntity, solution => solution.expert, { cascade: true })
    solutions: SolutionEntity[];

    @OneToOne(type => ProfileEntity, uprofile => uprofile.expert,{ cascade: true })
    @JoinColumn()
    uprofile: ProfileEntity;

    
}

@Entity("Solution")
export class SolutionEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    category: string;
    
    @ManyToOne(type => ExpertEntity, expert => expert.solutions)
    //@JoinColumn({ name: "expert_id" }) // Specify the foreign key column name
    expert: ExpertEntity;

}


