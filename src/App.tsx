import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@features/home";
import Question from "@features/question";
import Register from "@features/register";
import MySpace from "@features/my-space";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-space" element={<MySpace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/question/:id" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
