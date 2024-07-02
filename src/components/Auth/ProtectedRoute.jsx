const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return redirect("/login");
  }
  return null;
};

export default ProtectedRoute;
