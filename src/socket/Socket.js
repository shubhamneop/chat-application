import socketIoClient from "socket.io-client";
//const ENDPOINT = "http://127.0.0.1:4001";
const ENDPOINT = "https://shubhamsocket.herokuapp.com";

const socket = socketIoClient(ENDPOINT);
export default socket;
