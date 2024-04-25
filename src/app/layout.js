import "./globals.css";
import Header from "./components/Header.js";
import ContextProvider from "./Context/Context";


export const metadata = {
  title: "note-app",
  description: "a note taking app for an intern test",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <ContextProvider>
      <body>
        <Header />
        {children}
        </body>
        </ContextProvider>
    </html>
    
  );
}
