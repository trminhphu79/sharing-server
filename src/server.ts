import mainRoutes from "./api/v1/routes";
import app from "./app";
import connect from "./utils/connect";
import logger from "./utils/logger";
import config from "config";

const port = config.get<number>("port");

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();
    app.use('/api', mainRoutes)
});
