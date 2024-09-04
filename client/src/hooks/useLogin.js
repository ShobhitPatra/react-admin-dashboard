import { useState } from "react";
import { useAuthContext } from "../state/authContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (inputs) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:9000/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (res.ok) {
        setAuthUser(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};
export default useLogin;
