import { io } from "socket.io-client";
export function connectSocket(url, onConnect) {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const socket = io(url, {
    auth: { token },
    transports: ["websocket", "polling"],
  });
  if (onConnect) socket.on("connect", () => onConnect(socket));
  return socket;
}
