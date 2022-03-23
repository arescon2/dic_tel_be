import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import _ from 'lodash';
import { Response, Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { IAccaunt } from 'src/modules/auth/interfaces/accaunt.i';
import { IError } from 'src/interfaces/error.i';

import { AuthService } from '../services/auth.service';
import { CreateAccauntDto, LoginPassDto } from '../dto/auth';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { PersonService } from '../../priem/services/person.service';
import { Accaunt } from 'src/entityes/auth/accaunt.entity';
import { RoleService } from '../services/role.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly roleService: RoleService,
  ) {}

  @Post('/logout')
  async log_out(@Req() req: Request, @Res() res: Response): Promise<any> {
    const cookies = {
      access_cookie: `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      refresh_cookie: `Refresh=; HttpOnly; Path=/; Max-Age=0`,
    };

    res
      .setHeader('Set-Cookie', [cookies.access_cookie, cookies.refresh_cookie])
      .status(HttpStatus.OK)
      .send({
        message: 'Log out done.',
      });
  }

  @Post('/init')
  async createAdminAccaunt(@Res() res: Response): Promise<any> {
    const adminPerson = await this.personService.Find({ fam: 'admin' });

    if (!_.isEmpty(adminPerson)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: ['Пользователь с таким именем существует'] });
    } else {
      // создаем Персона для админа
      const adminPerson = await this.personService.createAdmin();
      const hash = await this.authService.hashedPassword('admin');

      // создаем главную роль разраба
      const role = await this.roleService.createRole({
        name: 'DEVELOP',
        title: 'Разработчик',
      });
      // создаем аккаунт админа
      await this.authService.createUser({
        login: 'admin',
        password: hash,
        email: 'admin@admin.com',
        person: adminPerson,
        roles: [role],
      });

      res
        .status(HttpStatus.CREATED)
        .send({ message: ['Учетная запись администратора создана'] });
    }
  }

  @ApiCreatedResponse({ type: Accaunt })
  @Post('/login')
  async log_on(
    @Body() data: LoginPassDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const user: { error: IError; data: IAccaunt } =
      await this.authService.checkAccaunt(data.login, data.password);

    if (user.error.message.length > 0) {
      res.status(HttpStatus.UNAUTHORIZED).send({ message: user.error.message });
    } else {
      const token = await this.authService.genJWT(user.data);
      const authCookies = this.authService.getCookieWithJwtToken(token);

      res
        .setHeader('Set-Cookie', [
          (await authCookies).access_cookie,
          (await authCookies).refresh_cookie,
        ])
        .status(HttpStatus.OK)
        .send({
          message: 'Вы успешно авторизованы',
          data: user.data,
        });
    }
  }

  @Post('/register')
  async register(
    @Body() data: CreateAccauntDto,
    @Res() res: Response,
  ): Promise<any> {
    const _accaunt = await this.authService.getAccauntIsLogin(data.login);

    // if (_accaunt) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: ['Регистрация временно отключена'] });
    // } else
    //   await this.authService
    //     .hashedPassword(data.password)
    //     .then(async (hash) => {
    //       // логин не существует, делаем хеш пароля
    //       data.password = hash;

    //       if (data.init) {
    //         const new_person = await this.personService.createAdmin();
    //         // this.authService.saveUser(
    //         //   Object.assign(data, { person: new_person }),
    //         // );
    //       } else {
    //         this.authService.saveUser(data);

    //       res
    //         .status(HttpStatus.CREATED)
    //         .send({ message: ['Пользователь зарегистрирован'] });
    //     });
  }

  @Get('/check')
  @UseGuards(JwtAuthGuard)
  async checkAuth(@Req() req: Request, @Res() res: Response): Promise<any> {
    res.status(HttpStatus.OK).send({
      message: 'Вы успешно авторизованы',
      data: req.user,
    });
  }
}
