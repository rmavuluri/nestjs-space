import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRatingModule } from './course-rating/course-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST, // database host
        port: +process.env.DATABASE_PORT, // database host
        username: 'postgres', // username
        password: 'pass123', // user password
        database: process.env.DATABASE_NAME, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically
        synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres', // type of our database
    //   // host: process.env.DATABASE_HOST,
    //   // port: +process.env.DATABASE_PORT,
    //   // username: process.env.DATABASE_USER,
    //   // password: process.env.DATABASE_PASSWORD,
    //   // database: process.env.DATABASE_NAME,
    //   host: process.env.DATABASE_HOST, // database host
    //   port: +process.env.DATABASE_PORT, // database host
    //   username: 'postgres', // username
    //   password: 'pass123', // user password
    //   database: process.env.DATABASE_NAME, // name of our database,
    //   autoLoadEntities: true, // models will be loaded automatically
    //   synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    // }),
    CourseRatingModule,
    DatabaseModule,
    ConfigModule.forRoot({
      //envFilePath: '.environment',
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      load: [appConfig],
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
