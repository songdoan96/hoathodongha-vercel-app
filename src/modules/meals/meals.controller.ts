import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  findAll(@Query('month') month: string) {
    return this.mealsService.findAll(month);
  }

  @Post()
  create(@Body() data: any) {
    return this.mealsService.create(data);
  }

  @Get('line')
  lineFindAll() {
    return this.mealsService.lineFindAll();
  }

  @Get('line/next-day')
  findMealNextDay(@Query('bophan') bophan: string) {
    return this.mealsService.findMealNextDay(bophan);
  }
  @Get('line/print-next-day')
  findMealPrintNextDay(@Query('day') day: string) {
    return this.mealsService.findMealPrintNextDay(day);
  }
  @Post('line/next-day')
  updateNextDay(@Body() formData: any) {
    return this.mealsService.updateNextDay(formData);
  }

  @Get('download')
  @Header('Content-Disposition', 'attachment; filename="SheetJSNest.xlsx"')
  async downloadXlsxFile(): Promise<StreamableFile> {
    return this.mealsService.exportData();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mealsService.findOne(id);
  // }
}
