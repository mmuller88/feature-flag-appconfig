import * as pj from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

const project = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'feature-flag-appconfig',
  projenrcTs: true,

  // deps: ['@devcycle/devcycle-react-sdk'],

  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
    },
  },
});
project.package.addField('lint-staged', {
  '*.(ts|tsx)': ['eslint --fix'],
  '*.(ts|tsx|js|jsx|json)': ['prettier --write'],
});
project.setScript('lint:staged', 'lint-staged');
project.synth();

const cdkVersion = '2.45.0';
const backend = new pj.awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  outdir: 'backend',
  parent: project,
  name: 'backend',
  cdkVersion,
  devDeps: ['@types/aws-lambda', 'aws-sdk'],
  // gitignore: [],
  release: true,
  tsconfig: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
});
backend.synth();
