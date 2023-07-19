import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureService } from './feature/feature.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, FeatureService],
})
export class AppModule {}
