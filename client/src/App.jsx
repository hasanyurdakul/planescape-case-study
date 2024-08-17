import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin, userLogout } from "./redux/features/userSlice";
import { getToken } from "./utils/auth";
import { jwtDecode } from "jwt-decode"; // Make sure the import is correct

function App() {
  const dispatch = useDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const user = {
          username: decodedToken.username,
          email: decodedToken.email,
        };
        dispatch(userLogin(user));
      } catch (error) {
        console.error("Invalid token:", error);
        dispatch(userLogout());
      }
    } else {
      dispatch(userLogout());
    }
  }, [dispatch, token]);

  return <RouterProvider router={router} />;
}

export default App;
