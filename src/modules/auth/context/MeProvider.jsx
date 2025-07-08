import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/gql/queries';
import MeContext from './MeContext';

const MeProvider = ({ children }) => {
  const { data, loading } = useQuery(GET_ME,{
    fetchPolicy: 'cache-and-network'
  });
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (data?.me) {
      setMe(data.me);
    }
  }, [data]);

  return (
    <MeContext.Provider value={me}>
      {!loading && children}
    </MeContext.Provider>
  );
};

export default MeProvider;
