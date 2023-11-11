declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    MONGODB_DATABASE: string;
    MONGODB_HOST: string;
    MONGODB_PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_ROOT_PASSWORD: string;
    GOOGLE_MAPS_API_KEY: string;
    GOOGLE_MAPS_BASE_URL: string;
  }
}
