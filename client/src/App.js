import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import { useAuthContext } from "state/authContext";
import Loading from "components/Loading";
import Signup from "scenes/signup";
import Login from "scenes/login";

function App() {
  const { authUser, isLoading } = useAuthContext();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  if (isLoading) return <Loading />;
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={authUser ? <Dashboard /> : <Navigate to={"/login"} />}
            ></Route>
            <Route
              path="/signup"
              element={!authUser ? <Signup /> : <Navigate to={"/"} />}
            ></Route>
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to={"/"} />}
            ></Route>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Performance />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
