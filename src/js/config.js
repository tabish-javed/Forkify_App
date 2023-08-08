import 'dotenv/config';
export const API_URL = new URL(process.env.API_URL);
export const API_KEY = process.env.API_KEY;
export const TIMEOUT_SECONDS = process.env.TIMEOUT_SECONDS;
export const RESULTS_PER_PAGE = process.env.RESULTS_PER_PAGE;