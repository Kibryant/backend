
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from './middleware/cors.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ReactNative:Tbjh980080@cluster0.eruktk2.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // Apply CORS middleware to all routes
  }
}

