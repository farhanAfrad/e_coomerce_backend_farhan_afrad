import app from "./app";
import config from "./config";

import mongoose from 'mongoose';



async function main() {
    await mongoose.connect(config.db_url as string);

    const port = process.env.PORT || 1000;
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
main();