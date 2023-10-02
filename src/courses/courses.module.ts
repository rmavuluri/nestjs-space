import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COURSE_BRANDS } from './course.constants';
@Module({
  imports: [TypeOrmModule.forFeature([Course, Flavor, Event])],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    { provide: COURSE_BRANDS, useValue: ['Hello', 'Hi'] }, // this is the custom provider and we can inject into any of the service
  ],
  exports: [CoursesService],
})
export class CoursesModule {}
