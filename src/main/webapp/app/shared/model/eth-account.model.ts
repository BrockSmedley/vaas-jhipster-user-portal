import { IItem } from 'app/shared/model//item.model';

export interface IEthAccount {
  id?: number;
  address?: string;
  items?: IItem[];
}

export const defaultValue: Readonly<IEthAccount> = {};
