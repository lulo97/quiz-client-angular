//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface IPoint {
  pointId: string;
  value: number;
  isPenalty: boolean;
  createdAt: string;
  updatedAt: string;
}

export const empty_record: IPoint = {
  pointId: '',
  value: 0,
  isPenalty: false,
  createdAt: '',
  updatedAt: '',
};
