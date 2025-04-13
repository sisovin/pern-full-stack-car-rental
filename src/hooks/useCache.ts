import { useState, useEffect } from 'react';
import redis from '../config/redis';

const useCache = (key: string, fetchFunction: () => Promise<any>, ttl: number = 60) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await redis.get(key);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const freshData = await fetchFunction();
          setData(freshData);
          await redis.set(key, JSON.stringify(freshData), 'EX', ttl);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, fetchFunction, ttl]);

  return { data, loading, error };
};

export default useCache;
