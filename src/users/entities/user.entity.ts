import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;

  @Column() email: string;

  @Column() firstName: string;

  @Column() lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  accountType: AccountType;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}

export enum AccountType {
  SuperAdmin = 1,
  Admin = 2,
  Default = 3,
}
