import { useQuery } from "@tanstack/react-query";

import useAxios from "../hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then(res => {
          setRole(res.data.role);
          setLoading(false);
        });
    }
  }, [user]);

  return { role, loading };
};

export default useRole;