import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCourseDto {
  @ApiProperty({ description: 'Name of the course' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Brand of the course' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
