//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface IBook {
  bookId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const empty_record: IBook = {
  bookId: '',
  name: '',
  description: '',
  createdAt: '',
  updatedAt: '',
};
