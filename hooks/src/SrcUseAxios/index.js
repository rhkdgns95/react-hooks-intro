import React, { useState, useEffect } from "react";
import defaultAxios from "axios";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  // trigger: refetch할때, 사용함.
  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    // 랜덤한 숫자를 써서 useEffect를 실행시키도록 한다.
    setTrigger(Date.now());
  };
  const fetch = async () => {
    try {
      const data = await axiosInstance(opts.url);
      if (data.status === 200) {
        setState({
          loading: false,
          error: null,
          ...data
        });
      }
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
        data: null
      });
    }
  };
  useEffect(() => {
    if (!opts.url) {
      return;
    }
    fetch();
  }, [trigger]);

  return {
    ...state,
    refetch
  };
};
export default () => {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.lt/api/v2/list_movies.json?limit=30&sort_by=rating"
  });
  console.log(`Loading: ${loading}\nError: ${error}\ndata: ${data}`);
  console.log({ ...data });
  return (
    <div>
      <h2>use Axios</h2>
      <button onClick={refetch}>refetch</button>
      <ul>
        {!loading &&
          data &&
          data.data &&
          data.data.movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
};
