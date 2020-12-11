import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CreateDateColumn, JoinColumn, ManyToOne, OneToOne} from "typeorm/index";
import {User} from "./user.entity";
import {Course} from "./course.entity";

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Course)
    @JoinColumn()
    course: Course;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    txn_status: string;

    @Column()
    order_id: string;

}
