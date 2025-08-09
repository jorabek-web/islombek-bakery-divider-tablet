import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./layout";
import Login from "./app/auth/login";
import { Xamir, Zuvala, Profile } from "./page-ui";
import { InstallApp } from "./components";
const Home = lazy(() => import("./app/home/home"));
const Notification = lazy(() => import("./app/notification/notification"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/xamir" element={<Xamir />} />
          <Route path="/zuvala" element={<Zuvala />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <InstallApp />
    </Suspense>
  );
};

export default App;
