import Cookies from "js-cookie";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../redux/Authentication/actions";

export const withAuthSync = (WrappedComponent: any) => {
    const Wrapper = (props: any) => {
        const refresh_token = Cookies.get("refresh_token");
        const dispatch = useDispatch();
        const { currentAccountUserName: username, error } = useSelector(
            (state: any) => state.authentication
        );

        const [isAuth, setIsAuth] = useState(false);

        useEffect(() => {
            if (!refresh_token || !!error) {
                Router.push("/login");
            }
            if (refresh_token) {
                dispatch(refreshToken({ refreshToken: refresh_token }));
            }
            if (username) {
                setIsAuth(true);
            }
        }, [username, error]);

        if (!isAuth && !username) {
            return <h1>Loading</h1>;
        }
        return <WrappedComponent {...props} />;
    };

    if (WrappedComponent.getInitialProps) {
        Wrapper.getInitialProps = WrappedComponent.getInitialProps;
    }

    return Wrapper;
};

export const withAuthToken = (WrappedComponent: any) => {
    const Wrapper = (props: any) => {
        const refresh_token = Cookies.get("refresh_token");

        useEffect(() => {
            if (refresh_token) {
                Router.replace("/");
            }
        }, []);

        if (refresh_token) {
            return <h1>Loading</h1>;
        }
        return <WrappedComponent {...props} />;
    };

    if (WrappedComponent.getInitialProps) {
        Wrapper.getInitialProps = WrappedComponent.getInitialProps;
    }

    return Wrapper;
};

