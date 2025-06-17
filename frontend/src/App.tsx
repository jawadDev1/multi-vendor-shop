import { Toaster } from "sonner";
import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/ui/organisms/common/Header";

function App() {
  return (
    <>
      <Toaster closeButton={true}  richColors={true} position="top-right" />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
