import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COURSE_BRANDS } from './course.constants';
import { ConfigModule } from '@nestjs/config';
import courseConfig from './config/course.config';

//class MockCourseService(){}

// class ConfigService(){}
// class DevelopmentConfigService(){}
// class ProdctionCOnfigService(){}

// @Inject()
// export class CourseBrandFactory(){
//   create(){
//     return ['Hello','Hi'];
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Flavor, Event]),
    ConfigModule.forFeature(courseConfig),
  ],
  controllers: [CoursesController],
  providers: [
    // {
    //   provide: CoursesService, useValue: new MockCourseService()//if you want to another service when calling CoursesService, we have to do like this
    // },
    CoursesService,
    { provide: COURSE_BRANDS, useValue: ['Hello', 'Hi'] }, // this is the custom provider and we can inject into any of the service
    //{ provide: COURSE_BRANDS, useFactory: ['Hello', 'Hi'] },
    //{ provide: ConfigService, useClass: process.env.NODE_ENV === 'development'? DevelopmentConfigService: ProdctionCOnfigService}
    //{ provide: COURSE_BRANDS, useFactory: (brandFactory: CourseBrandFactory) => brandFactory.create(),inject: CourseBrandFactory},
  ],
  exports: [CoursesService],
})
export class CoursesModule {}
