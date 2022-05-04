import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
@Entity('users')
export class User {

   @PrimaryGeneratedColumn()
   id:number;

   @Column({nullable: false})
   fullName : string;

   @Column({unique: true})
   email : string;

   @Column({nullable: true})
   password: string;

   @Column({nullable: true})
   key: string;
   
   @Column()
   photoUrl : string;

   @Column({default: false})
   isVerify: boolean;

   @Column({nullable: true ,default: Date.now()})
   createAt : string;

   @Column({nullable: true , default: Date.now()})
   updateAt : string;
}
