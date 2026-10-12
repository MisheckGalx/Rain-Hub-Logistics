import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App";
import "./index.css";

// Cookie-free page-view analytics. Does nothing until you switch Web Analytics on in the Vercel dashboard.
inject();

createRoot(document.getElementById("root")!).render(<App />);
