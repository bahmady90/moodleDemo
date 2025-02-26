import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, condition }: { children: JSX.Element; condition: boolean }) {
    if (!condition) {
        return <Navigate to="/" replace />;
    }
    return children;
}