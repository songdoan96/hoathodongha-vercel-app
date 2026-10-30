import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { MealsCreateDto, MealsUpdateNextDayDto } from './meals.dto';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  findAll(@Query('month') month: string) {
    return this.mealsService.findAll(month);
  }

  @Post()
  async create(@Body() data: MealsCreateDto) {
    return this.mealsService.create(data);
  }

  @Get('line')
  lineFindAll() {
    return this.mealsService.lineFindAll();
  }

  @Get('line/next-day')
  findMealNextDay() {
    return this.mealsService.findMealNextDay();
  }
  @Get('line/print-next-day')
  findMealPrintNextDay(@Query('day') day: string) {
    return this.mealsService.findMealPrintNextDay(day);
  }
  @Post('line/next-day')
  updateNextDay(@Body() formData: MealsUpdateNextDayDto) {
    return this.mealsService.updateNextDay(formData);
  }

  @Get('download')
  @Header('Content-Disposition', 'attachment; filename="ansang.xlsx"')
  async downloadXlsxFile(
    @Query('month') month: string,
  ): Promise<StreamableFile> {
    return this.mealsService.exportData(month);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mealsService.findOne(id);
  // }
}
