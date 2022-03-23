import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from 'src/entityes/core/files.entity';

export default TypeOrmModule.forFeature([Files]);
