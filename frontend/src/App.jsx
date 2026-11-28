import { BrowserRouter as Router, Routes, Route } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./context/AuthContext";

// 1. Define the custom font in your MUI theme
const theme = createTheme({
  typography: {
    fontFamily: "'Lora', serif",
  },
});

function App() {
  return (
    // 2. Wrap your app in ThemeProvider
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets default browser styles and applies Josefin Sans to <body> */}
      <CssBaseline />

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
