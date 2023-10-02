import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  // private courses: Course[] = [
  //   {
  //     id: 1,
  //     name: 'ng',
  //     brand: 'google',
  //     flavors: ['frontend', 'framework'],
  //   },
  // ];

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.courseRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        flavors: true,
      },
    });
    if (!course) {
      throw new NotFoundException(`course ${id} not found`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const flavors = await Promise.all(
      createCourseDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const course = this.courseRepository.create({
      ...createCourseDto,
      flavors,
    });
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const flavors =
      updateCourseDto.flavors &&
      (await Promise.all(
        updateCourseDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
      flavors,
    });
    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return this.courseRepository.save(course);
  }

  // async remove(id: string) {
  //   const courseIndex = await this.courses.findIndex((item) => item.id === +id);
  //   if (courseIndex >= 0) {
  //     this.courses.splice(courseIndex, 1);
  //   }
  // }
  async remove(id: string) {
    const course = await this.findOne(id);
    return this.courseRepository.remove(course);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    }); // 👈 notice the "where"
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}