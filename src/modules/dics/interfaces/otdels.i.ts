import { Organization } from 'src/entityes/dics/organizations.entity';

export interface IOtdels {
  id: number;
  name: string;
  organization?: Organization;
}
