import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { GroupEntity } from 'src/group/entities/group.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([TaskEntity, TagEntity, GroupEntity])],
})
export class TaskModule {}
