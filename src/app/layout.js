import "./styles/globals.css";
import StoreProvider from "@/app/StoreProvider";

export const metadata = {
  title: "Assistant",
  description: "AI Scheduling Assistant",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </StoreProvider>
    
  );
}
