import { useEffect } from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    handleLogout();
  },);

  return <></>;
};

export default Logout;
