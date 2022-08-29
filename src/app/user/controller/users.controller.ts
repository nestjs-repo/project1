import { Controller } from '@nestjs/common';
// import { AuthJwtGuard, User } from 'src/app/auth/auth.decorator';
// import { Response } from 'src/utils/response/response.decorator';
// import { IResponse } from 'src/utils/response/response.interface';
import { UserService } from '../service/user.service';
// import { IUserDocument } from '../user.interface';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // @Response('user.me')
  // @AuthJwtGuard()
  // @Get('/me')
  // async profile(@User() user: IUserDocument): Promise<IResponse> {
  //   return this.userService.mapProfile(user);
  // }
}
