import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App.tsx"

import "./global.scss"
import localforage from "localforage"
import axios from "axios"

axios.interceptors.request.use(config => {
  const bsaeUrl = import.meta.env.BASE_URL;
  if (!config.url?.startsWith(bsaeUrl)) config.baseURL = bsaeUrl;

  return config;
});

localforage.config({
  storeName: "NCKU_BikeFestival_18th"
})

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
)
