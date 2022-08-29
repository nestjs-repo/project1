import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import {
  IUserCheckExist,
  IUserCreate,
  IUserDocument,
  IUserUpdate,
} from 'src/app/user/user.interface';
import { DatabaseEntity } from 'src/database/database.decorator';
import { IDatabaseFindAllOptions } from 'src/database/database.interface';
import { HelperStringService } from 'src/utils/helper/service/helper.string.service';
import { UserDocument, UserEntity } from '../schema/user.schema';

@Injectable()
export class UserService {
  private readonly uploadPath: string;

  constructor(
    @DatabaseEntity(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly helperStringService: HelperStringService,
    private readonly configService: ConfigService,
  ) {
    this.uploadPath = this.configService.get<string>('user.uploadPath');
  }

  async findAll(
    find?: Record<string, any>,
    options?: IDatabaseFindAllOptions,
  ): Promise<IUserDocument[]> {
    const users = this.userModel.find(find);

    if (options && options.limit !== undefined && options.skip !== undefined) {
      users.limit(options.limit).skip(options.skip);
    }

    if (options && options.sort) {
      users.sort(options.sort);
    }

    return users.lean();
  }

  async getTotal(find?: Record<string, any>): Promise<number> {
    return this.userModel.countDocuments(find);
  }

  // async mapProfile(data: IUserDocument): Promise<UserProfileTransformer> {
  //   return plainToClass(UserProfileTransformer, data.toJSON());
  // }

  async findOneById<T>(_id: string): Promise<T> {
    return this.userModel.findById(_id);
  }

  async findOne<T>(find?: Record<string, any>): Promise<T> {
    return this.userModel.findOne(find);
  }

  async create({
    password,
    email,
    role,
    isConfirmed = true,
  }: IUserCreate): Promise<UserDocument> {
    const user: UserEntity = {
      email,
      password,
      role,
      isActive: true,
      isConfirmed,
    };

    const create: UserDocument = new this.userModel(user);
    return create.save();
  }

  async deleteOneById(_id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(_id);
  }

  async deleteOne(find: Record<string, any>): Promise<UserDocument> {
    return this.userModel.findOneAndDelete(find);
  }

  async updateOneById(
    _id: string,
    { firstName, lastName }: IUserUpdate,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(_id);

    user.firstName = firstName;
    user.lastName = lastName || undefined;

    return user.save();
  }

  async checkEmailExist(email: string, _id?: string): Promise<boolean> {
    const existEmail: Record<string, any> = await this.userModel.exists({
      email: {
        $regex: new RegExp(email),
        $options: 'i',
      },
      _id: { $nin: [new Types.ObjectId(_id)] },
    });

    return existEmail ? true : false;
  }

  async checkExist(
    email: string,
    mobileNumber: string,
    _id?: string,
  ): Promise<IUserCheckExist> {
    const existEmail: Record<string, any> = await this.userModel.exists({
      email: {
        $regex: new RegExp(email),
        $options: 'i',
      },
      _id: { $nin: [new Types.ObjectId(_id)] },
    });

    const existMobileNumber: Record<string, any> = await this.userModel.exists({
      mobileNumber,
      _id: { $nin: [new Types.ObjectId(_id)] },
    });

    return {
      email: existEmail ? true : false,
      mobileNumber: existMobileNumber ? true : false,
    };
  }

  async createRandomFilename(): Promise<Record<string, any>> {
    const filename: string = this.helperStringService.random(20);

    return {
      path: this.uploadPath,
      filename: filename,
    };
  }

  async inactive(_id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(_id);

    user.isActive = false;
    return user.save();
  }

  async active(_id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(_id);

    user.isActive = true;
    return user.save();
  }

  async inconfirm(_id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(_id);

    user.isConfirmed = false;
    return user.save();
  }

  async confirmed(_id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(_id);

    user.isConfirmed = true;
    return user.save();
  }
}
