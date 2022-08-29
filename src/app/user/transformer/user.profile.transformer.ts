import { Exclude, Type } from 'class-transformer';

export class UserProfileTransformer {
  @Type(() => String)
  readonly _id: string;

  readonly role: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobileNumber: string;
  readonly gender: string;
  readonly purchasedTokensRemaining: string;
  readonly earnedTokensRemaining: string;
  readonly starsRemaining: string;

  @Exclude()
  readonly isActive: boolean;

  @Exclude()
  readonly isConfirmed: boolean;

  @Exclude()
  readonly password: string;

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;
}
