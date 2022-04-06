import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import _ from 'lodash';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { TAKE } from 'src/constants';

import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { IOtdels } from '../interfaces/otdels.i';
import { Posts } from 'src/entityes/dics/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRep: Repository<Posts>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: IOtdels,
  ): Promise<[Otdels[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    let andWhereVar = '';
    const andWhereObj = {};

    if (filters) {
      if (filters.id) {
        andWhereVar += 'posts.id = :id ';
        andWhereObj['id'] = filters.id;
      }
      if (filters.name) {
        andWhereVar += 'LOWER(posts.name) like :name';
        andWhereObj['name'] = `%${_.toLower(filters.name)}%`;
      }
    }

    const result = await this.postRep
      .createQueryBuilder('posts')
      .where(andWhereVar, andWhereObj)
      .take(take)
      .skip(page * take)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async Find(id: number): Promise<Otdels> {
    return this.postRep.findOne({ id: id });
  }

  async createOtdel(data: any): Promise<any> {
    const newField = this.postRep.create(data);

    return this.postRep.save(newField);
  }

  async deleteOtdel(id: number): Promise<any> {
    return await this.postRep.delete(id);
  }
}
