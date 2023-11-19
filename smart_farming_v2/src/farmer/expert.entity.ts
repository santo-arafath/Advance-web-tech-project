import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("expert")
export class ExpertEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "character varying", })
    name: string;
    @Column()
    address: string;
    @Column()
    email:string;
    @Column()
    password: string;
    
/*
    @OneToMany(type => SolutionEntity, solution => solution.expert, { cascade: true })
    solutions: SolutionEntity[];

    @OneToOne(type => ProfileEntity, uprofile => uprofile.expert,{ cascade: true })
    @JoinColumn()
    uprofile: ProfileEntity;
*/
    
}


@Entity("vet")
export class VetEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "character varying", })
    name: string;
    @Column()
    address: string;
    @Column()
    email:string;
    @Column()
    password: string;
    
}



@Entity("Solution")
export class SolutionEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title: string;
    @Column()
    description: string;
    
 /*   
    @ManyToOne(type => ExpertEntity, expert => expert.solutions)
    //@JoinColumn({ name: "expert_id" }) // Specify the foreign key column name
    expert: ExpertEntity;
*/
}


