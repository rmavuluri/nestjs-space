import { registerAs } from '@nestjs/config';
export default registerAs('courses', () => ({
  foo: 'bar',
}));
