import Navigation from "./Navigation";
import NextAuthProvider from "./NextAuthProvider";
import "./global.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <NextAuthProvider>
          <Navigation />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
