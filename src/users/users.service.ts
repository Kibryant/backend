import { Injectable, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Model } from "mongoose";
import { Users } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create({ username, email, password }: CreateUserDto, res: Response) {
    const emailExists = await this.usersModel.findOne({ email });
    const usernameExists = await this.usersModel.findOne({ username });

    if (emailExists)
      return res.status(HttpStatus.CONFLICT).json({
        message: "E-mail already registered. Try again!",
        error: true,
        status: 409
      });

    if (usernameExists)
      return res.status(HttpStatus.CONFLICT).json({
        message: "Username already exits. Try again!",
        error: true,
        status: 409
      });

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = new this.usersModel({
      username,
      email,
      password: hashedPassword,
      created_at: new Date()
    });

    await newUser.save();

    return res.status(HttpStatus.CREATED).json({
      error: false,
      data: newUser,
      message: "New User Created successfully!"
    });
  }

  findAll() {
    return this.usersModel.find();
  }

  async findOne({ username, password, email }: CreateUserDto, res: Response) {
    const userExists = await this.usersModel.findOne({ username, email });

    if (!userExists) {
      return res.json({
        error: true,
        data: null,
        message: "Error. Credentials inavlid! Try again.",
        status: HttpStatus.NOT_FOUND
      });
    }

    const validPassword = await bcrypt.compare(password, userExists.password);

    if (!validPassword) {
      return res.json({
        error: true,
        data: null,
        message: "Error. Credentials inavlid! Try again.",
        status: HttpStatus.NOT_FOUND
      });
    }

    return res.json({
      error: false,
      data: userExists,
      message: "User Found successfully!",
      status: HttpStatus.FOUND
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.findByIdAndUpdate(
      {
        _id: id
      },
      {
        updateUserDto
      },
      {
        new: true
      }
    );
  }

  remove(id: string) {
    return this.usersModel
      .deleteOne({
        _id: id
      })
      .exec();
  }
}
