import * as cdk from 'aws-cdk-lib';
import { aws_glue as glue } from 'aws-cdk-lib';

declare const defaultRunProperties: any;
declare const tags: any;
declare const parameters: any;
declare const skewedColumnValueLocationMaps: any;

export class GlueSetupStack extends cdk.Stack {
  
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cfnCrawler = new glue.CfnCrawler(this, 'MyCfnCrawler', {
      role: 'role',
      targets: {
        s3Targets: [{
          connectionName: 'connectionName',
          path: 's3://MyBucket/MyFolder/',
        }],
      },
      databaseName: 'output_database',
      name: 'demoCrawler',
      recrawlPolicy: {
        recrawlBehavior: 'CRAWL_NEW_FOLDERS_ONLY',
      },
      schedule: {
        scheduleExpression: 'cron(15 12 * * ? *)',
      }
    });

    const cfnDatabase = new glue.CfnDatabase(this, 'MyCfnDatabase', {
      catalogId: 'catalogId',
      databaseInput: {
        name: 'output_database'
      }
    });

    const cfnTable = new glue.CfnTable(this, 'MyCfnTable', {
      catalogId: 'arn:aws:glue:region:account-id:catalog',
      databaseName: 'output_database',
      tableInput: {
        name: 'output_table',
        owner: 'owner',
        partitionKeys: [],
        storageDescriptor: {
          bucketColumns: ['bucketColumns'],
          columns: [{
            name: 'ColumnName',
          }],
          compressed: false,
          inputFormat: 'inputFormat',
          outputFormat: 'outputFormat',
          storedAsSubDirectories: false,
        },
        tableType: 'EXTERNAL_TABLE',
      }
    });

    const cfnWorkflow = new glue.CfnWorkflow(this, 'MyCfnWorkflow', {
      defaultRunProperties: defaultRunProperties,
      description: 'description',
      maxConcurrentRuns: 123,
      name: 'name',
      tags: tags,
    });

  }
}
