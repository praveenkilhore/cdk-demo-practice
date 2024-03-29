import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { PrivateSubnet } from 'aws-cdk-lib/aws-ec2';
import { aws_s3_deployment as s3deploy } from 'aws-cdk-lib';

export class CdkDemoPracticeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3bucket = new s3.Bucket(this, 'DemoBucket', {
      versioned: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      bucketName: 'carrier-data-warehouse-testing-bucket',
    });

    const deployment = new s3deploy.BucketDeployment(this, 'DeployFolder', {
      sources: [s3deploy.Source.data('landing/.keep','')],
      destinationBucket: s3bucket
    });

    const deployment1 = new s3deploy.BucketDeployment(this, 'DeployFolder1', {
      sources: [s3deploy.Source.data('schema_mismatch/dummy.txt','')],
      destinationBucket: s3bucket
    });

    const deployment2 = new s3deploy.BucketDeployment(this, 'DeployFolder2', {
      sources: [s3deploy.Source.data('archive/dummy.txt','')],
      destinationBucket: s3bucket
    });

    const deployment3 = new s3deploy.BucketDeployment(this, 'DeployFolder3', {
      sources: [s3deploy.Source.data('unmapped/dummy.txt','')],
      destinationBucket: s3bucket
    });
    // const vpc = new ec2.Vpc(this, 'DemoVPC', {
    //   cidr: "10.0.0.0/16",
    //   natGateways: 0,
    //   subnetConfiguration: [{
    //     cidrMask: 24,
    //     name: 'private_Subnet',
    //     subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    //   }, {
    //     cidrMask: 24,
    //     name: 'public_Subnet',
    //     subnetType: ec2.SubnetType.PUBLIC,
    //   }]
    // });

    // var publicSubnets = vpc.publicSubnets;
    // var privateSubnets = vpc.isolatedSubnets;

    // const subnet_for_ec2Instance: ec2.SubnetSelection = { subnets: publicSubnets };
    // const subnet_for_endpoint: ec2.SubnetSelection = { subnets: privateSubnets };

    // new ec2.Instance(this, 'Instance', {
    //   vpc: vpc,
    //   vpcSubnets: subnet_for_ec2Instance,
    //   instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
    //   machineImage: ec2.MachineImage.latestAmazonLinux2022()
    // });

    // new ec2.InterfaceVpcEndpoint(this, 'VPCEndpoint', {
    //   vpc: vpc,
    //   //(name of the service, port)
    //   service: new ec2.InterfaceVpcEndpointService('com.amazonaws.vpce.us-east-1.vpce-svc-uuddlrlrbastrtsvc', 443),
    //   subnets: subnet_for_endpoint
    // });

  }
}
