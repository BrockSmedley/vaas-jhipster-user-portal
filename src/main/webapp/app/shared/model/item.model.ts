import { IEthAccount } from 'app/shared/model//eth-account.model';

export interface IItem {
  id?: number;
  name?: string;
  uniqueID?: string;
  brand?: string;
  chainID?: string;
  owner?: IEthAccount;
}

export const defaultValue: Readonly<IItem> = {};
