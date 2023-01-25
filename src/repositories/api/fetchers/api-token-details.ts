import axios, {AxiosResponse} from 'axios';
import {API_URI, API_VERSION} from '@/common/values/constant-value';

export const getTokenDetails = async (denom: string | any): Promise<AxiosResponse<any, any>> => {
  return await axios.get(API_URI + API_VERSION + `/token/summary/${denom}`);
};