import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskUserService } from './task_user.service';
import { TaskUserEntity } from './entities/task_user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-passport.guard';
import { User } from '../config/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('task-user')
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Get()
  findAll() {
    return this.taskUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() taskUser: Partial<TaskUserEntity>) {
    return this.taskUserService.update(id, taskUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskUser: TaskUserEntity, @User() user: any) {
    return this.taskUserService.create(taskUser, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async deleteTaskUser(
    @Param('taskId') taskId: number,
    @User() user: UserEntity,
  ) {
    const userId = user.id; // Récupère l'ID de l'utilisateur à partir du décorateur User

    await this.taskUserService.deleteByTaskAndUser(taskId, userId);

    return { message: 'TaskUser deleted successfully' };
  }

  @Get(':taskId/validated-today/:onDate')
  async hasValidatedToday(
    @Param('taskId') taskId: number,
    @Param('onDate') onDate: string,
  ) {
    const validated = await this.taskUserService.hasTaskBeenValidatedOnDate(
      taskId,
      new Date(onDate),
    );
    return { validated };
  }
}
