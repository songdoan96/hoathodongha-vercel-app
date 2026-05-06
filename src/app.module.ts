import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { FormsModule } from './modules/forms/forms.module';
import { MealsModule } from './modules/meals/meals.module';
import { OvertimesModule } from './modules/overtimes/overtimes.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SalariesModule } from './modules/salaries/salaries.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    PrismaModule,
    FirebaseModule,
    AuthModule,
    FormsModule,
    EmployeesModule,
    SalariesModule,
    OvertimesModule,
    MealsModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
