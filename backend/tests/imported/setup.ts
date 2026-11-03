import 'reflect-metadata';
import { config } from 'dotenv';

config({ quiet: true });
process.env.RATE_LIMIT_PER_MINUTE = '100000';
