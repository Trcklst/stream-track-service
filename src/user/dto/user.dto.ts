import { IsNumber, IsString } from 'class-validator';
import { SubscriptionEnum } from '../enum/subscription.enum';
import { RoleEnum } from '../enum/role.enum';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  role: RoleEnum;

  @IsString()
  subscription: SubscriptionEnum;
}
