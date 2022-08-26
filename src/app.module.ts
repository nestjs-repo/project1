import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import config from './config/keys';
@Module({
  imports: [UserModule, MongooseModule.forRoot(config.mongoURL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
