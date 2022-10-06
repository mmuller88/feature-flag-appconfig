import {
  useIsDVCInitialized,
  useVariableValue,
  withDVCProvider,
} from '@devcycle/devcycle-react-sdk';

const App = () => {
  const dvcReady = useIsDVCInitialized();

  const variableKey = 'example-feature';
  const defaultValue = false;
  const featureVariable = useVariableValue(variableKey, defaultValue);

  if (!dvcReady)
    return (
      <div>
        <h1>DVC is not ready! Loading State...</h1>
      </div>
    );

  return (
    <div>
      {featureVariable ? <div>Variable on!</div> : <div>Variable off</div>}
    </div>
  );
};

export default withDVCProvider({
  envKey: 'dvc_client_a630dbb2_6f41_44a1_920d_c898e645c8da_921ba34',
  user: {
    isAnonymous: false,
    user_id: '1',
  },
})(App);
