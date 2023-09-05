import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState({}); 

  useEffect(() => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(config => {
     
      config.headers['name'] = 'abdullah';
      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        const headers = response.headers;

        setResponseHeaders(headers);

        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axiosInstance.get('http://localhost:3333/')
      .then(response => {
        const responseData = response.data;

        setData(responseData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); 

  return (
    <div className="App">
      <h1>Axios Interceptor Example</h1>
      {data ? (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {responseHeaders ? (
        <div>
          <h2>Response Headers:</h2>
          <pre>{JSON.stringify(responseHeaders, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
}

export default App;
