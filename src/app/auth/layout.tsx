const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-2 my-32">
    <div className="bg-white max-w-xs sm:max-w-sm p-4 rounded-lg shadow-lg mx-auto">
      {children}
    </div>
  </div>
);

export default AuthLayout;
