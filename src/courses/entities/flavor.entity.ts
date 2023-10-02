import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    (type) => Course,
    (course) => course.flavors, // what is "flavor" within the Coffee Entity
  ) // 👈
  courses: Course[];
}
