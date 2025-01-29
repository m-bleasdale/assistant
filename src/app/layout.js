import "./styles/globals.css";
import StoreProvider from "@/app/StoreProvider";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: "Assistant",
  description: "AI Scheduling Assistant",
};

export default function RootLayout({ children }) {
  return (
      <StoreProvider>
        <html lang="en">
          <UserProvider>
            <body>
              {children}
            </body>
          </UserProvider>
        </html>
      </StoreProvider>
    
  );
}
