import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { DicAppModule } from './modules/dicApp/dicApp.module';
import { DicsModule } from './modules/dics/dics.module';
import { PriemModule } from './modules/priem/priem.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // modules
    AuthModule,
    PriemModule,
    CoreModule,
    DicsModule,
    DicAppModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
