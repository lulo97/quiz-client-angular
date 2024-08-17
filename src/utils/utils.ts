import { SortEvent } from 'primeng/api';

export const BACKEND_URL = `http://localhost:4001/api/`;

export function isNullOrEmpty(str: string | null) {
  if (str == null) return true;
  if (str == '') return true;
  return false;
}

//This function is handling sort for table in user screen
export function handleSort(event: SortEvent) {
  const { field, order } = event;
  if (!field || !order) return;
  event.data?.sort((data1, data2) => {
    let value1 = data1[field];
    let value2 = data2[field];
    //If column type is string
    if (field == 'name' || field == 'description') {
      if (isNullOrEmpty(value1) && !isNullOrEmpty(value2)) return order * -1;
      else if (!isNullOrEmpty(value1) && isNullOrEmpty(value2))
        return order * 1;
      else if (isNullOrEmpty(value1) && isNullOrEmpty(value2)) return 0;
      else return order * value1.localeCompare(value2);
    }
    //If column type is number (work with boolean)
    if (field == 'value' || field == 'isPenalty') {
      return (
        order *
        (Number(value1) < Number(value2)
          ? -1
          : Number(value1) > Number(value2)
          ? 1
          : 0)
      );
    }
    //If column type is date
    if (field == 'createdAt' || field == 'updatedAt') {
      return order * (value1 < value2 ? -1 : value1 > value2 ? 1 : 0);
    }
    return order;
  });
}
