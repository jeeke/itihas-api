import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm/index";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    hashed_password: string;

    @Column()
    user_type: string;

}
