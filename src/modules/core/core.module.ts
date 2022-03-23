import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import importsModels from '../importsModels';

import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';

@Module({
  imports: [importsModels, AuthModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class CoreModule {}
