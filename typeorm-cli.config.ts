import { CourseRefactor1696211561178 } from 'src/migrations/1696211561178-CourseRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [CourseRefactor1696211561178],
});
