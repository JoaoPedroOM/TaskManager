import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Protector = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.user) || localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/logar");
        }
    }, [navigate, isAuthenticated]);

    return isAuthenticated ? children : null;
};

export const ProtectorAccount = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.user) || localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/taskmanager", { replace: true });
        }
    }, [navigate, isAuthenticated]);

    return !isAuthenticated ? children : null;
};
