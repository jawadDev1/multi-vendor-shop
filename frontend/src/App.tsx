import { Toaster } from "sonner";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Toaster closeButton={true}  richColors={true} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
