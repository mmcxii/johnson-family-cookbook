import { ObjectType, Field } from 'type-graphql';
import { Entity, Column } from 'typeorm';

import { TableNames } from '../types/tableNames';
import {
  IPermissionLevel,
  PermissionLevelNameEnum,
} from '../types/permissionLevel.types';
import { DefaultColumns } from './common/DefaultColumns';

@ObjectType()
@Entity(TableNames.PermissionLevel)
export class PermissionLevel extends DefaultColumns
  implements IPermissionLevel {
  @Field(() => String)
  @Column('enum', { name: 'name', enum: PermissionLevelNameEnum })
  name: PermissionLevelNameEnum;
}
