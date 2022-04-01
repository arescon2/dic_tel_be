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
import { CreateAccauntDto, LoginPassDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { PersonService } from '../../priem/services/person.service';
import { Accaunt } from 'src/entityes/auth/accaunt.entity';
import { RoleService } from '../services/role.service';
import { AccessesService } from '../services/accesses.service';
import { OrgsService } from 'src/modules/dics/services/organization.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly roleService: RoleService,
    private readonly AccessService: AccessesService,
    private readonly OrgService: OrgsService,
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
      // создаем главную роль разраба
      const role = await this.roleService.createRole({
        name: 'DEVELOP',
        title: 'Разработчик',
      });
      // создаем организацию ЦАХО "Минтруда"
      const org = await this.OrgService.createOrg({
        name: 'ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ "ЦЕНТР АДМИНИСТРАТИВНО-ХОЗЯЙСТВЕННОГО ОБЕСПЕЧЕНИЯ МИНИСТЕРСТВА ТРУДА И СОЦИАЛЬНОЙ ПОЛИТИКИ РЕСПУБЛИКИ ТЫВА"',
        short: 'ГБУ "ЦАХО МинТруда И СоцПол РТ"',
        inn: 1701053789,
      });
      // создаем Персона для админа
      const adminPerson = await this.personService.createAdmin(org);
      // создаем пароль для админа
      const hash = await this.authService.hashedPassword('admin');
      // создаем аккаунт админа
      await this.authService.createUser({
        login: 'admin',
        password: hash,
        email: 'admin@admin.com',
        person: adminPerson,
        roles: [role],
      });

      // создаем доступы
      await this.AccessService.init();

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

    const DEVELOPER = user.data.roles.some((role: any) =>
      ['DEVELOP'].includes(role.name),
    );

    if (!user.data.organization && !DEVELOPER) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: ['Ваша учетная запись не активированна'],
        code: 'NotOrg',
      });
    }

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
