import { Express } from "express";
import { myTestScoresHandler,myTest } from "../controller/examinee.controller";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    app.get("/api/my-tests", myTestScoresHandler);
    app.post("/api/testnpm",upload.single('file'), myTest);
}

export default routes;
