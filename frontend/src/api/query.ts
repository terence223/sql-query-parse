import config from '../config';
import axios from 'axios';
import { getListApiRes, modifiedQueryType } from '../types/sqlQuery';

export const parseSQLApi = async (queryString: string) => {
  const { data: response } = await axios.post(`${config.apiDomain}/parse`, {
    queryString,
  });
  return response;
};

export const getListApi = async (): Promise<getListApiRes> => {
  const { data: response } = await axios.get<getListApiRes>(
    `${config.apiDomain}/list`
  );
  return response;
};

export const rebuildApi = async (
  data: Pick<modifiedQueryType, 'modifiedSQL' | 'map'>
): Promise<{ sqlString: string }> => {
  const { data: response } = await axios.post<{ sqlString: string }>(
    `${config.apiDomain}/rebuild`,
    {
      data,
    }
  );
  return response;
};

export const deleteApi = async (id: number) => {
  const { data: response } = await axios.delete(`${config.apiDomain}/${id}`);
  return response;
};
