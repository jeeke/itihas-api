import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm/index";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    des: string;

    @Column()
    icon: string;

    @Column()
    link: string;

}
