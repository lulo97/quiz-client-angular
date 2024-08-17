//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface IDifficultLevel {
  difficultLevelId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const empty_record: IDifficultLevel = {
  difficultLevelId: '',
  name: '',
  description: '',
  createdAt: '',
  updatedAt: '',
};
