import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {
   
   @PrimaryGeneratedColumn()
   id:number

   @Column()
   name: string

   @Column()
   phone: string

   @Column()
   message:string

   @Column({nullable: true ,default: Date.now()})
   createAt : string;

   @Column({nullable: true , default: Date.now()})
   updateAt : string;
}
