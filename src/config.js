const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "finpro-app-upload",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6th8bis5jd.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_30J5V006d",
    APP_CLIENT_ID: "2n2kd6njlin0l8jjq1rehe1cdr",
    IDENTITY_POOL_ID: "us-east-1:f2b7e13c-dc0d-456d-b1ff-c5ada14be524",
  },
};

export default config;
