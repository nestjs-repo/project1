import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModal: Model<User>) {}
  async findAll(): Promise<User[]> {
    return await this.userModal.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModal.findById({ _id: id });
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModal(user);
    return await newUser.save();
  }
  async delete(id: string): Promise<User> {
    return await this.userModal.findByIdAndDelete(id);
  }
  async update(id: string, user: User): Promise<User> {
    return await this.userModal.findByIdAndUpdate(id, user);
  }
}
