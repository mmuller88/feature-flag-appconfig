import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FeatureFlagFunction } from './feature-flag-function';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new FeatureFlagFunction(this, 'FeatureFlagFunction', {  
      environment: {
        FOO: '1234',
      } , 
    })
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'backend-dev', { env: devEnv });
// new MyStack(app, 'backend-prod', { env: prodEnv });

app.synth();