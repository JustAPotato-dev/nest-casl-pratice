import { ForbiddenError } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private abilityFactory: AbilityFactory) {}

  create(createUserDto: CreateUserDto, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);

    ForbiddenError.from(ability)
      .setMessage('gagade')
      .throwUnlessCan(Action.Create, User);

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    const user = new User(); //pull from DB
    user.id = id;
    user.orgId = 2;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);
    const userToUpdate = this.findOne(+id);
    ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate);

    // update call DB

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
