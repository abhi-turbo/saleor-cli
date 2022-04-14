import type { CancelableRequest } from "got";
import got from "got";

import Debug from 'debug';
const debug = Debug('lib:index'); // esl

import { Options } from '../types.js';

const CloudURL = ("STAGING" in process.env) ?
  'https://staging-cloud.saleor.io/api' :
  'https://cloud.saleor.io/api';

const BaseOptions = {
  prefixUrl: CloudURL,
};

type DefaultURLPath = (_: Options) => string;

const handleAuthAndConfig = (func: (path: string, options?: any) => any) => async (pathFunc: DefaultURLPath, argv: Options, options: any = {}) => {
  const path = pathFunc(argv);

  debug(path)
  debug('cli options', argv)

  options = {
    ...options,
    headers: argv.token ? {
      Authorization: `${argv.token}`,
    } : {},
  }
  debug('`got` options', options)

  return func(path, options) as CancelableRequest;
}

const doGETRequest = (path: string, options?: any) => got(path, {...options, ...BaseOptions}).json();
const doPOSTRequest = (path: string, options?: any) => got.post(path, { ...options, ...BaseOptions}).json()
const doDELETERequest = (path: string, options: any) => got.delete(path, {...options, ...BaseOptions}).json();
const doPUTRequest = (path: string, options: any) => got.put(path, {...options, ...BaseOptions}).json();

export const GET = handleAuthAndConfig(doGETRequest);
export const POST =  handleAuthAndConfig(doPOSTRequest);
export const PUT =  handleAuthAndConfig(doPUTRequest);
export const DELETE = handleAuthAndConfig(doDELETERequest);

export const API: Record<string, DefaultURLPath> = {
  User: _ => "user",
  Organization: _ => `organizations/${_.organization || ''}`,
  OrganizationPermissions: _ => `organizations/${_.organization}/permissions`,
  OrganizationBackups: _ => `organizations/${_.organization}/backups`,
  UpgradeEnvironment: _ => `organizations/${_.organization}/environments/${_.environment}/upgrade`,
  Environment: _ => `organizations/${_.organization}/environments/${_.environment || ''}`,
  PopulateDatabase: _ => `organizations/${_.organization}/environments/${_.environment}/populate-database`,
  ClearDatabase: _ => `organizations/${_.organization}/environments/${_.environment}/clear-database`,
  SetAdminAccount:  _ => `organizations/${_.organization}/environments/${_.environment}/set-admin-account`,
  Job: _ => `organizations/${_.organization}/environments/${_.environment}/jobs`,
  TaskStatus: _ => `service/task-status/${_.task}`,
  Backup: _ => `organizations/${_.organization}/environments/${_.environment}/backups/${_.backup || ''}`,
  Restore: _ => `organizations/${_.organization}/environments/${_.environment}/restore`,
  Project: _ => `organizations/${_.organization}/projects/${_.project || ''}`,
  PaymentMethod: _ => `organizations/${_.organization}/payment-methods/${_.paymentMethod || ''}`,
  Region: _ =>  `regions/${_.region || ''}`,
  Services: _ => `regions/${_.region}/services/${_.serviceName || ''}`,
  Plan: _ => `plans/${_.plan || ''}`,
  Token: _ => "tokens"
}


export const Region = 'us-east-1'
export type Plan = 'startup' | 'pro' | 'dev' | 'enterprise' | 'staging'