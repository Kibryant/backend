import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CorsMiddleware } from './middleware/cors.middleware'
import { PrismaService } from './database/prisma.service'
import { AppController } from './app.controller'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ReactNative:Tbjh980080@cluster0.eruktk2.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*') // Apply CORS middleware to all routes
  }
}
