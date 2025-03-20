import { apiRequest } from "../apiConfig";

export const userDataListing = async ({
  page = 1,
  per_page = 10,
  search,
  filter,
  sort,
  order_by,
}: any) => {
  return await apiRequest({
    url: `/users?page=${page}&per_page=${per_page}&search=${search}&filter=${filter}&sort=${sort}&order_by=${order_by}`,
  });
};

export const deleteUser = async (id: string) => {
  return await apiRequest({
    url: `/users/${id}`,
    method: "DELETE",
  });
};

export const deleteMultipleUser = async (data: { id: string[] }) => {
  return await apiRequest({
    url: `/users-delete-multiple`,
    method: "POST",
    data,
  });
};

export const getUserDetails = async (id: string) => {
  return await apiRequest({
    url: `/users/${id}`,
    method: "GET",
  });
};

export const createUser = async (formData: FormData) => {
  return await apiRequest({
    url: `/users`,
    method: "POST",
    data: formData,
  });
};
export const updateUser = async (id: string, formData: FormData) => {
  return await apiRequest({
    url: `/users/${id}`,
    method: "POST",
    data: formData,
  });
};

export const logOutUserData = async () => {
  return await apiRequest({
    url: `/logout`,
  });
};

export const exportCsvFile = async ({
  page = 1,
  per_page = 10,
  search,
  filter,
  sort,
  order_by,
}: any) => {
  return await apiRequest({
    url: `/users-export?page=${page}&per_page=${per_page}&search=${search}&filter=${filter}&sort=${sort}&order_by=${order_by}`,
  });
};
