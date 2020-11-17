import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm/index";

@Entity()
export class ContactFormEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    subject: string;

    @Column()
    body: string;

}
