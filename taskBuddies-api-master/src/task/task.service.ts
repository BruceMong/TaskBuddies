import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { GroupEntity } from 'src/group/entities/group.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
  ) {}

  async create(createTaskDto, user: UserEntity) {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    task.author = user;

    console.log('Task to save1:', task);

    const assignUserToTag = async (tag: TagEntity, user) => {
      if (!tag.id) {
        tag.createdBy = user;
        return tag;
      }
    };

    if (task.tags) {
      for (const tag of task.tags) {
        await assignUserToTag(tag, user);
      }
    }

    console.log('Task to save2:', task);

    try {
      const savedTask = await this.taskRepository.save(task);
      console.log('Task saved successfully:', savedTask);
      return savedTask;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }

  async findAll(user: UserEntity) {
    return this.taskRepository.find({
      //rel reccurrences et taskUsers
      relations: ['recurrences', 'author', 'taskUsers', 'tags'],
      where: { author: { id: user.id } },
    });
  }

  async findOne(id: number) {
    return this.taskRepository.find({
      where: { id },
      relations: ['recurrences', 'author', 'taskUsers'],
    });
  }

  async update(id: number, updateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.taskRepository.softDelete(id);
  }

  async getTasksOnDate(
    date: Date = new Date(),
    user: UserEntity,
    tags: number[] = [],
  ) {
    const tasks = await this.taskRepository.find({
      where: { deletedAt: IsNull(), author: { id: user.id } },
      relations: ['recurrences', 'author', 'taskUsers', 'tags'],
    });

    // Filter tasks based on tags if provided
    const filteredTasks = tags.length
      ? tasks.filter((task) =>
          task.tags.some((taskTag) => tags.includes(taskTag.id)),
        )
      : tasks;

    const tasksOnDate = filteredTasks.filter((task) => {
      return task.recurrences.some((recurrence) => {
        const taskStartDate = recurrence.start_date || task.createdAt;
        const taskEndDate = recurrence.end_date || null;
        const interval = recurrence.recurrence_interval || null;
        const dayOfWeek = recurrence.day_of_week || null;
        const dayOfMonth = recurrence.day_of_month || null;

        // Check for single occurrence task
        if (!taskEndDate && !interval && !dayOfWeek && !dayOfMonth) {
          return taskStartDate.toDateString() === date.toDateString();
        }

        // Check for weekly recurrence
        if (dayOfWeek) {
          return date.getDay() === dayOfWeek;
        }

        // Check for monthly recurrence
        if (dayOfMonth) {
          return date.getDate() === dayOfMonth;
        }

        // Check for recurrence with interval
        if (interval) {
          const daysDifference = Math.floor(
            (date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          return daysDifference % interval === 0;
        }

        // Check for recurrence within start and end date
        if (taskStartDate <= date && (!taskEndDate || taskEndDate >= date)) {
          return true;
        }

        return false;
      });
    });

    return tasksOnDate;
  }

  async createWithGroup(task: Partial<TaskEntity>, user: UserEntity, groupId) {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.createdBy', 'createdBy')
      .where('group.id = :id', { id: groupId })
      .getOne();
    if (!group) {
      throw new Error('Group not found');
    }
    console.log('Group found:', group);
    console.log('User:', user);
    console.log('Group created by:', group.createdBy);
    if (!group.createdBy || group.createdBy.id !== user.id) {
      throw new Error('User is not the creator of the group');
    }

    task.group = group;

    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }
}
