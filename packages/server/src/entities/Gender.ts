import { Column, Entity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { TableNames } from '../types/tableNames';
import { IGender, GenderNameEnum } from '../types/gender.types';
import { DefaultColumns } from './common/DefaultColumns';

@ObjectType()
@Entity(TableNames.Gender)
export class Gender extends DefaultColumns implements IGender {
  @Field(() => String)
  @Column('enum', { name: 'name', enum: GenderNameEnum })
  name: GenderNameEnum;
}
