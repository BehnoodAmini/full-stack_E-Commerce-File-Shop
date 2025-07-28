import "../styles/globals.css";
import 'leaflet/dist/leaflet.css';

import Header from "@/components/header";
import Footer from "@/components/footer";

import ContextProvider from "@/context/contextProvider";
import ToastProvider from "@/components/toast/ToastProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR">
      <body>
        <ContextProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
