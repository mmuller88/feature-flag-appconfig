import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as appconfig from 'aws-cdk-lib/aws-appconfig';
import { Construct } from 'constructs';
import { FeatureFlagFunction } from './feature-flag-function';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const application = new appconfig.CfnApplication(
      this,
      'AppConfigApplication',
      {
        name: 'feature-flag-appconfig',
      },
    );

    new appconfig.CfnEnvironment(this, 'AppConfigEnvironment', {
      applicationId: application.ref,
      name: 'dev',
    });

    new appconfig.CfnConfigurationProfile(
      this,
      'AppConfigConfigurationProfile',
      {
        applicationId: application.ref,
        name: 'feature-flag-profile2',
        locationUri: 'hosted',
        type: 'AWS.AppConfig.FeatureFlags',
        validators: [
          {
            content: `
        {
          "title": "AppConfigDemoApp",
          "description": "Configuration JSON for the AppConfig demo app",
          "type": "object",
          "properties": {
            "includeReleaseYear": {
              "description": "Feature flag - whether to include the release year in the response",
              "type": "boolean"
            },
            "errorProbability": {
              "description": "The probability, between 0 and 1, for a random error to occur",
              "type": "number"
            }
          },
          "required": [ "includeReleaseYear", "errorProbability" ]
        }
        `,
            type: 'JSON_SCHEMA',
          },
        ],
      },
    );

    const lambda = new FeatureFlagFunction(this, 'FeatureFlagFunction', {
      environment: {
        FOO: '1234',
      },
    });

    const functionUrl = lambda.addFunctionUrl();

    new CfnOutput(this, 'FunctionUrl', { value: functionUrl.url });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: '164721000630',
  region: 'us-east-1',
};

const app = new App();

new MyStack(app, 'backend-dev', { env: devEnv });
// new MyStack(app, 'backend-prod', { env: prodEnv });

app.synth();
