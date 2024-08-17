//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface ILanguage {
  languageId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const empty_record: ILanguage = {
  languageId: '',
  name: '',
  description: '',
  createdAt: '',
  updatedAt: '',
};
