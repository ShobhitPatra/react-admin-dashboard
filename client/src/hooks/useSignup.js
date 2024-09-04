import { useState } from "react";
import { useAuthContext } from "../state/authContext";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async (inputs) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:9000/auth/signup", {
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
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};
export default useSignup;
