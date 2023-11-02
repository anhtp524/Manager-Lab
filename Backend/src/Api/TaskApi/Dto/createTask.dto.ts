import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  listFileId?: string[]
}
