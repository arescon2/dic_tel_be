import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jswt from 'jsonwebtoken';

import { v4 as uuidv4 } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';

import { IAccaunt } from 'src/modules/auth/interfaces/accaunt.i';
import { Accaunt } from 'src/entityes/auth/accaunt.entity';
import { IError, IErrorAndData } from 'src/interfaces/error.i';
import { jwtConstants } from '../constants';
import { LoginPassDto } from '../dto/auth';
import { TAKE } from 'src/constants';
import _ from 'lodash';
import { encode, decode } from 'js-base64';
import { Person } from 'src/entityes/priem/person.entity';
import { Roles } from 'src/entityes/auth/roles.entity';

export interface IJWTPayload {
  access_token: string;
  refresh_token: string;
}

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Accaunt)
    private AccRep: Repository<Accaunt>,
    @InjectRepository(Roles)
    private roleRep: Repository<Roles>,
    private jwtService: JwtService,
  ) {}

  async genJWT(data: IAccaunt): Promise<IJWTPayload> {
    const _data = { ...data };
    return {
      access_token: this.jwtService.sign(_data, {
        secret: jwtConstants.secret,
        expiresIn: '3h',
      }),
      refresh_token: this.jwtService.sign(
        {
          uid: _data.uid,
          login: _data.login,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '3d',
        },
      ),
    };
  }

  async checkJWT(token: string): Promise<IErrorAndData> {
    const tokenData = this.jwtService.decode(token);
    let localData: IAccaunt;
    let error: IError = {
      error: null,
      message: null,
    };

    await this.getAccauntIsLogin(tokenData['login']).then((res) => {
      if (!res)
        error = { message: ['Пользователь с таким логином не найден.'] };
      localData = res;
    });
    return {
      error,
      data: localData
        ? {
            uid: localData.uid,
            login: localData.login,
            email: localData.email,
            roles: localData.roles,
            person: localData.person,
          }
        : {},
    };
  }

  async getCookieWithJwtToken(tokens: IJWTPayload) {
    // 3 d = 259 200
    // 3 h = 10 800
    return {
      access_cookie: `Authentication=${tokens.access_token}; HttpOnly; Path=/; Max-Age=10800`,
      refresh_cookie: `Refresh=${tokens.refresh_token}; HttpOnly; Path=/; Max-Age=259200`,
    };
  }

  async checkAccaunt(login: string, password: string): Promise<IErrorAndData> {
    let localData: IAccaunt;

    const error: IError = {
      message: [],
    };

    const result: IErrorAndData = {
      error: error,
      data: {},
    };

    await this.getAccauntIsLogin(login).then((res) => {
      if (!res) error.message.push('Пользователь с таким логином не найден.');

      localData = res;
    });

    // проверка пароли
    if (localData) {
      await this.checkPassword(password, localData.password).then((res) => {
        if (!res) error.message.push('Вы ввели неправильный пароль.');
      });
    }

    // выкидываем данные аккаунта
    result.error = error;
    result.data = localData
      ? {
          uid: localData.uid,
          login: localData.login,
          email: localData.email,
          roles: localData.roles,
          person: localData.person,
        }
      : {};
    return result;
  }

  async getAccauntIsLogin(login: string): Promise<any> {
    const result = await this.AccRep.createQueryBuilder('acc')
      .leftJoinAndSelect('acc.person', 'person')
      .leftJoinAndSelect('acc.roles', 'roles')
      .where('acc.login = :login', { login: login })
      .select([
        'acc.id',
        'acc.uid',
        'acc.login',
        'acc.password',
        'acc.email',
        'acc.phone',
        'person.id',
        'person.uid',
        'person.fam',
        'person.im',
        'roles.id',
        'roles.name',
        'roles.title',
      ])
      .getOne();
    // await this.AccRep.findOne({ login }).then((res) => {
    //   localData = res;
    // });

    return result;
  }

  async hashedPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async createUser(data: any): Promise<IAccaunt> {
    data.uid = uuidv4();
    data.dateCreate = new Date(Date.now());
    data.isActive = true;

    return await this.AccRep.save(data);
  }

  async updUser(inData: any): Promise<IAccaunt> {
    let data = await this.AccRep.findOne({ where: { id: inData.id } });

    delete inData.id;

    data = Object.assign(data, inData);

    data.dateUpd = new Date(Date.now());

    return this.AccRep.save(data);
  }

  async addRolesToUser(inData: any): Promise<any> {
    const accaunt = await this.AccRep.findOne({ where: { id: inData.id } });

    const AccRoles = await this.roleRep.find({
      where: { id: In(inData.roles) },
    });

    accaunt.roles = AccRoles;

    accaunt.dateUpd = new Date(Date.now());

    return this.AccRep.save(accaunt);
  }

  async delRoleToUser(id: number, userid: number): Promise<any> {
    // сначала получить аккаунт с ролями
    return 'ok';
  }

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: string,
  ): Promise<[IAccaunt[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) {
      ordering[orderby] = order;
    }

    const result = await this.AccRep.createQueryBuilder('acc')
      .leftJoinAndSelect('acc.person', 'person')
      .leftJoinAndSelect('acc.roles', 'roles')
      .take(take)
      .offset(page)
      .orderBy(ordering)
      .select([
        'acc.id',
        'acc.login',
        'acc.dateCreate',
        'acc.dateUpd',
        'acc.email',
        'acc.phone',
        'person.id',
        'person.fam',
        'person.im',
        'roles.id',
        'roles.name',
        'roles.title',
      ])
      .getManyAndCount();

    return result;
  }
}
