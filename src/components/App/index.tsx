import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { IrregularVerbs } from "../IrregularVerbs";
import "./index.css";

export const App: FC = () => (
  <Routes>
    <Route path="/english" element={<IrregularVerbs />} />
  </Routes>
);
