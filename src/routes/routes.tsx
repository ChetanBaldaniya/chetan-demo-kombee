import { lazy } from "react";

const Login = lazy(() => import("../components/Auth/Login/login"));
const Registration = lazy(() => import("../components/Auth/Registration/registration"));
const Dashboard = lazy(() => import("../components/Dashboard/dashboard"));
const CreateUserForm = lazy(() => import("../components/UserForm/UserForm"));
const NotFoundPage = lazy(() => import("../components/NotFoundPage/NotFoundPage"));


type Routes = {
  path: string;
  element: any;
  isPrivate: boolean;
};

export const routes: Routes[] = [
  {
    path: "/",
    element: Login,
    isPrivate: false,
  },
  {
    path: "/login",
    element: Login,
    isPrivate: false,
  },
  {
    path: "/registerUser/:user",
    element: Registration,
    isPrivate: false,
  },
  {
    path: "/user",
    element: Dashboard,
    isPrivate: true,
  },
  {
    path: "/user/add",
    element: CreateUserForm,
    isPrivate: true,
  },
  {
    path: "/user/edit/:id",
    element: CreateUserForm,
    isPrivate: true,
  },
  {
    path: "*",
    element: NotFoundPage,
    isPrivate: false,
  },
];