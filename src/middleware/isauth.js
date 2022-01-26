import axios from 'axios';
import React, { Component } from "react";
import decode from "jwt-decode";

const userAuthentication=async ()=>{
    var res = "";
    try{
        res = await axios.post(`http://localhost:9000/isAuth`, {
            Headers:{
              "x-access-token": localStorage.getItem("token"),
            }
    });
    } catch (err) {
        console.error(err);
    }
    if(res?.data){
      console.log("userAuthentication",res.data.auth,res.data);
      
    }
  
  }
  
  
  export default userAuthentication;