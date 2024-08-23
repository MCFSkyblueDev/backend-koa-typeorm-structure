import { IsEmpty } from "class-validator";
import {CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({ name: "collection" })
export class CustomBaseEntity {
   @PrimaryGeneratedColumn()
   @IsEmpty({always : true, message : "Do not send the ID"})
   id: number;

   @CreateDateColumn({name: 'created_at', type: 'timestamp'})
   createdAt: Date;

   @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
   updatedAt: Date;
}
