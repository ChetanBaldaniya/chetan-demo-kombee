import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./routes";

const RouterList: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                path={route.path}
                key={index}
                element={
                  route.isPrivate ? (
                    <PrivateRoute>
                      <route.element /> 
                    </PrivateRoute>
                  ) : (
                    <route.element />
                  )
                } 
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default RouterList;