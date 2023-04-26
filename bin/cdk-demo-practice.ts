#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoPracticeStack } from '../lib/cdk-demo-practice-stack';

// const envUSA  = { account: 'accountno', region: 'us-central-1' };

const app = new cdk.App();
new CdkDemoPracticeStack(app, 'CdkDemoPracticeStack', {
  // env: envUSA
});
