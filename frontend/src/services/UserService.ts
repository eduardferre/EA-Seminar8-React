import http from "../http-common";
import IUser from "../types/User";

const getAll = () => {
    return http.get<Array<IUser>>("/");
};

const get = (name: any) => {
    return http.get<IUser>(`/${name}`);
};

const create = (data: IUser) => {
    return http.post<IUser>("/", data);
};

const update = (name: any, data: IUser) => {
    return http.put<any>(`/${name}`, data);
};

const remove = (name: any) => {
    return http.delete<any>(`/${name}`);
};

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
};
export default UserService;
