import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Issue } from 'src/entityes/tickets/issue.entity';
import { Iissue } from '../interfaces/ticket.i';
import { TAKE } from 'src/constants';

import { v4 as uuidv4 } from 'uuid';

import _ from 'lodash';
import { IPerson } from 'src/modules/priem/interfaces/person.i';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issueRep: Repository<Issue>,
  ) {}

  async findPagination(
    develop,
    person: IPerson,
    pagination,
    filters?: Iissue,
  ): Promise<[Iissue[], number]> {
    let { page, take } = pagination;

    const { organization } = person;

    take = take || TAKE;
    page = page - 1 || 0;

    // const ordering = {};

    // if (orderby) {
    //   ordering[orderby] = order;
    // }

    let andWhereVar = '';
    const andWhereObj = {};

    if (!develop) {
      andWhereVar += ' org.id = :orgid';
      andWhereObj['orgid'] = organization.id;
    }

    if (filters) {
      if (filters.id) {
        andWhereVar += ' issue.id = :id';
        andWhereObj['id'] = filters.id;
      }
      if (develop && filters.organization) {
        andWhereVar += ' org.id = :orgid';
        andWhereObj['orgid'] = filters.organization;
      }
    }

    const result = await this.issueRep
      .createQueryBuilder('issue')
      .leftJoin('issue.organization', 'org')
      .leftJoinAndSelect('issue.author', 'person')
      .leftJoinAndSelect('issue.responder', 'responder')
      .leftJoinAndSelect('issue.status', 'status')
      .leftJoinAndSelect('issue.type', 'type')
      .select([
        'issue',
        'person.fam',
        'person.im',
        'person.otch',
        'responder.id',
        'responder.fam',
        'responder.im',
        'responder.otch',
        'status.id',
        'status.name',
        'type.id',
        'type.name',
      ])
      .where(andWhereVar, andWhereObj)
      .take(take)
      .skip(page * take)
      .orderBy('issue.id', 'ASC')
      .getManyAndCount();

    return result;
  }

  async findOne(id: number): Promise<any> {
    return this.issueRep
      .createQueryBuilder('issue')
      .leftJoin('issue.organization', 'org')
      .leftJoinAndSelect('issue.author', 'person')
      .leftJoinAndSelect('person.organization', 'personorg')
      .leftJoinAndSelect('issue.responder', 'responder')
      .leftJoinAndSelect('issue.status', 'status')
      .leftJoinAndSelect('issue.type', 'type')
      .leftJoinAndSelect('issue.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'commentAuthor')
      .select([
        'issue',
        'personorg.id',
        'personorg.name',
        'person.fam',
        'person.im',
        'person.otch',
        'responder.id',
        'responder.fam',
        'responder.im',
        'responder.otch',
        'status.id',
        'status.name',
        'type.id',
        'type.name',
        'comments.id',
        'comments.dateCreate',
        'comments.text',
        'comments.author',
        'commentAuthor.fam',
        'commentAuthor.im',
        'commentAuthor.otch',
      ])
      .where({
        id: id,
      })
      .orderBy('issue.id')
      .getOne();
  }

  async createIssue(data: any, person: IPerson): Promise<any> {
    const { organization, id } = person;

    data.isActive = true;
    data.uid = uuidv4();
    data.dateCreate = new Date(Date.now());
    organization ? (data.organization = organization.id) : null;
    data.author = id;

    const newIssue = this.issueRep.create(_.omitBy(data, _.isNil));
    return this.issueRep.save(newIssue);
  }

  async updateIssue(id: number, inData: any): Promise<any> {
    let _data = await this.issueRep.findOne({ where: { id: inData.id } });

    if (!_data)
      return this.issueRep.findOneOrFail({ where: { id: inData.id } });

    _data = Object.assign(_data, inData);
    _data.dateUpd = new Date(Date.now());
    return this.issueRep.save(_data);
  }
}
