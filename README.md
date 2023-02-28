# serverless_templates
Chapter 1

Change 1

Use this repo to generate the base template for your project 
use this vscode plugin for serverless

Plugins to use 

use this as a base for sls project 
https://github.com/arielweinberger/sls-base
These are the commands 
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install

Plugins 
serverless-bundle is a Serverless Framework plugin that optimally packages your ES6 or TypeScript Node.js Lambda functions with sensible defaults so you don't have to maintain your own Webpack configs. It uses the serverless-webpack plugin internally
serverless-pseudo-parameters : You can now use #{AWS::AccountId}, #{AWS::Region}, etc. in any of your config strings, and this plugin replaces those values with the proper pseudo parameter Fn::Sub CloudFormation function.

In the sls.yml file 
 stage: ${opt:stage, 'dev'}

above if stage variable is not defined then ‘dev’ is the default behavior.

we will define the region for this project 


provider:
 name: aws
 runtime: nodejs12.x
 memorySize: 256
 stage: ${opt:stage, 'dev'}
 region: us-west-1


