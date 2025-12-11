import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { FormsModule } from './modules/forms/forms.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SalariesController } from './modules/salaries/salaries.controller';
import { SalariesModule } from './modules/salaries/salaries.module';
import { SalariesService } from './modules/salaries/salaries.service';

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
  ],
  controllers: [SalariesController, AppController],
  providers: [SalariesService, AppService],
})
export class AppModule {}
