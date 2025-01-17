// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:60cfa344-6fae-4c31-988f-2fb47ce2047f",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_FZpwvYl4o",
  aws_user_pools_web_client_id: "2recfkoclv4bf8dapibguvssem",
  oauth: {
    domain: "auth.saleor.io",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "https://cloud.saleor.io/",
    redirectSignOut: "https://cloud.saleor.io/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default awsmobile;
