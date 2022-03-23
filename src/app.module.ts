import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { PriemModule } from './modules/priem/priem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    PriemModule,
    CoreModule,
    // modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
