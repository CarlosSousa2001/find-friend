import { app } from "./app";
import { config } from "@/env";

app.listen({
    host: "0.0.0.0",
    port: config.PORT,

}).then(() => {
    console.log("⚡ Server is running on port 3333");
})