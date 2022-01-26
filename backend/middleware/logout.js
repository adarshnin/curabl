import React, { Component } from "react";
import { useHistory } from "react-router-dom";

export function Logout(){
    const history = useHistory();
    localStorage.removeItem("token");
    history.pushState("/login");
}