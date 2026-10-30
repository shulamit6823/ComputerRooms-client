import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const UseLogout = () => {
    const navigate = useNavigate()
    const context = useContext(UserContext);

    if (!context)
        throw new Error("UserContext must be used inside UserProvider");

    const { setUser } = context;

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }
    return logout;
}
export default UseLogout