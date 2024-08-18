import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import "@fontsource/montserrat"; // Defaults to weight 400
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// ######################################################################
// Gerekli olan providerlar eklenir.
// StyledEngineProvider, MUI kullanımında gerekli olan bir provider. injectFirst prop'u true olarak verilir. Bu sayede MUI ile Tailwind kullanabiliriz.
// ThemeProvider, oluşturulan MUI temamızı kullanmamızı sağlar. Default font olarak Roboto kullanılır ancak ThemeProvider ile biz Montserrat olarak override ettik.
// LocalizationProvider, MUI'nin date picker componentlerini kullanırken, tarih formatlarını ayarlamamızı sağlar. Adapter olarak Dayjs kullanıyoruz.
// ToastContainer, react-toastify kütüphanesini kullanarak, uygulama içinde toast mesajları göstermek için kullanılır.
// Provider, redux store'u uygulamaya sağlar.
// ######################################################################

createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <App />
        </Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </LocalizationProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
