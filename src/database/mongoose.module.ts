import { Module } from '@nestjs/common';
import { databaseProviders } from './mongoose.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}