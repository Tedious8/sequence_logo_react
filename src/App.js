import { lazy, startTransition } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./pages/Home"));
    });
  });
});

const Figure = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./pages/Figure"))
    })
  });
});

const Redirect = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./pages/Redirect"))
    })
  });
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/request" element={<Figure/>} />
        <Route path="*" element={<Redirect/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
