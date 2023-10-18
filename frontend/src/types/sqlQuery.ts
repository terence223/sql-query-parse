export interface getListApiRes {
  data: modifiedQueryType[];
}

export type modifiedQueryType = {
  _id: number;
  modifiedSQL: string;
  map: object;
};
