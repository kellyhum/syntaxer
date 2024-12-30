import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";
import GlobalStyles from "./styles/globalStyles.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <GlobalStyles />
            <App />
        </Provider>
    </StrictMode>
);
