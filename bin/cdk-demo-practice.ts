#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkDemoPracticeStack } from '../lib/cdk-demo-practice-stack';

const app = new cdk.App();
new CdkDemoPracticeStack(app, 'CdkDemoPracticeStack');
