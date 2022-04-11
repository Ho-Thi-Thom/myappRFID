import { useState, useEffect } from "react";
import client from "../sanity/config";

const useQuery = (queryString, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(queryString, params)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useQuery;
