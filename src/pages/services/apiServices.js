import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("ADMIN_INFO")
    ? "Bearer " + JSON.parse(localStorage.getItem("ADMIN_INFO")).accessToken
    : "";

  config.headers = {
    ...config.headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2FuZyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRoYW5oc2FuZzUyQHlvcG1haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJ0aGFuaHNhbmc1MkB5b3BtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNzYwNTI1MTIwLCJleHAiOjE3NjA1Mjg3MjB9.239cd6z0dEGYSafW8PZ-YiFkqV-QTrNNlbSwuFqSO4M`,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY",
  };

  return config;
});

export default api;
