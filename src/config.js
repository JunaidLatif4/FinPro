const dev = {
  STRIPE_KEY: "pk_test_51HhOLjIAWwtv4OdWA43F34LppjskibWniEWYm0UzCxjnv3sR8i73OdzeUiDw4MfqMuy6vZqNZy14vkAAdKCvMuP500AtdAz2Dl",
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-finpro-infra-s3-uploads4f6eb0fd-1fph3itepll1o"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://oryezv5v42.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_1jybMYfMb",
    APP_CLIENT_ID: "1nmnm3uea50n353c8ek1098jfo",
    IDENTITY_POOL_ID: "us-east-1:002db832-1197-4d42-9ba7-935c5e5d39fe"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51HhOLjIAWwtv4OdWA43F34LppjskibWniEWYm0UzCxjnv3sR8i73OdzeUiDw4MfqMuy6vZqNZy14vkAAdKCvMuP500AtdAz2Dl",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-finpro-infra-s3-uploads4f6eb0fd-180i8igizn2tm"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6th8bis5jd.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Ro7i6v3mK",
    APP_CLIENT_ID: "4941bt335dmk22m13rpun3c2j1",
    IDENTITY_POOL_ID: "us-east-1:3f2a7b61-b67e-45fb-a243-93a54a423193"
  }
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
