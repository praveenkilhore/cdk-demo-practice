#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoPracticeStack } from '../lib/cdk-demo-practice-stack';
import { GlueSetupStack } from '../lib/glue-setup-stack';

const envUSA  = { account: '683845579265' };

const app = new cdk.App();
new CdkDemoPracticeStack(app, 'CdkDemoPracticeStack', {
  env: envUSA
});

new GlueSetupStack(app, 'GlueSetupStack', {

});
