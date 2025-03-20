import { apiRequest } from "../apiConfig";

export const roleListing = async ({page=1, per_page=10, search, filter, sort,order_by}:any) => {
    return await apiRequest({
      url: `/roles?page=${page}&per_page=${per_page}&search=${search}&filter=${filter}&sort=${sort}&order_by=${order_by}`,
    });
  };