import axios from "./axios.js"

export const registerInfo= (user) => axios.post(`/petsos/register`, user)

export const loginInfo=(user) => axios.post(`/petsos/login`, user)

export const verifyTokenRequest=() => axios.get("/verify")