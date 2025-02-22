import "./styles/globals.css";
import StoreProvider from "@/app/StoreProvider";
import Session from "@/app/SessionProvider";

export const metadata = {
  title: "Assistant",
  description: "AI Scheduling Assistant",
};

export default function RootLayout({ children }) {
  return (

      <StoreProvider>
        <html lang="en">
          <Session>
            <body>
              {children}
            </body>
          </Session>
        </html>
      </StoreProvider>
    
  );
}
