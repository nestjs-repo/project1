import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AUTH_PROVIDER } from '../user.constant';

@Schema({ timestamps: true, versionKey: false })
export class UserEntity {
  @Prop({
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    enum: AUTH_PROVIDER,
    default: AUTH_PROVIDER.EMAIL_PASSWORD,
  })
  authProvider?: string;

  @Prop({
    required: false,
    index: true,
    trim: true,
  })
  firstName?: string;

  @Prop({
    required: false,
    index: true,
    trim: true,
  })
  lastName?: string;

  @Prop({
    required: false,
    index: true,
    trim: true,
  })
  mobileNumber?: string;

  @Prop({
    required: false,
    index: true,
    trim: true,
  })
  biography?: string;

  @Prop({
    required: false,
  })
  gender?: string;

  @Prop({
    trim: true,
  })
  avatar?: string;

  @Prop({
    required: false,
    lowercase: true,
    trim: true,
  })
  role: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: false,
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: false,
    default: false,
  })
  isConfirmed: boolean;

  @Prop({
    trim: true,
    index: true,
  })
  dateOfBirth?: string;

  @Prop({
    trim: true,
    index: true,
  })
  address?: string;

  @Prop({
    trim: true,
    index: true,
  })
  city?: string;

  @Prop({
    trim: true,
    index: true,
  })
  country?: string;

  @Prop({
    trim: true,
    index: true,
  })
  state?: string;

  @Prop({
    trim: true,
  })
  postcode?: string;
}

export const UserDatabaseName = 'users';
export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDocument = UserEntity & Document;

// Hooks
UserSchema.pre<UserDocument>('save', function (next) {
  this.email = this.email.toLowerCase();
  next();
});
