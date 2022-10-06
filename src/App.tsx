import {
  useDVCClient,
  useIsDVCInitialized,
  withDVCProvider,
} from '@devcycle/devcycle-react-sdk';
import { useEffect, useState } from 'react';

const App = () => {
  const [variable, setVariable] = useState(false);

  const dvcReady = useIsDVCInitialized();

  const client = useDVCClient();

  useEffect(() =>  {
    async function fetchUser() {
      await client.identifyUser({
        isAnonymous: false,
        user_id: '9',
      })  ;

      const feature = client.variable('ex-3', false).value as boolean;

      setVariable(feature);
    }
    void fetchUser();
  }, []);

  if (!dvcReady || !client)
    return (
      <div>
        <h1>DVC is not ready! Loading State...</h1>
      </div>
    );

  return (
    <div>{variable ? <div>Variable on!</div> : <div>Variable off</div>}</div>
  );
};

export default withDVCProvider({
  envKey: 'dvc_client_a630dbb2_6f41_44a1_920d_c898e645c8da_921ba34',
})(App);
