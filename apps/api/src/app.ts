
import dotenv from 'dotenv'
dotenv.config()
import { contentRoutes } from './routes/content.route';
import { createApp } from './lib/createApp';

export const app = createApp()

app.register(contentRoutes, { prefix: "/api/v1/content" })




