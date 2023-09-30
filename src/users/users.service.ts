import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { Users } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.usersModel(createUserDto)
    return user.save()
  }

  findAll() {
    return this.usersModel.find();
  }

  findOne(id: string) {
    return this.usersModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.findByIdAndUpdate({
      _id: id
    }, {
      updateUserDto
    },
    {
      new: true
    })
  }

  remove(id: string) {
    return this.usersModel.deleteOne({
      _id: id
    }).exec();
  }
}
