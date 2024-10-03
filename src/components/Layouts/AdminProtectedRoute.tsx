import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!token) {
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }

  if (currentUser?.role === "admin") {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }
};

export default AdminProtectedRoute;
