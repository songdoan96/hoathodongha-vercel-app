import { Body, Controller, Post, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Prisma } from '../../../generated/prisma';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Post()
  create(@Body() data: Prisma.FeedbackCreateInput) {
    return this.feedbackService.create(data);
  }
}
