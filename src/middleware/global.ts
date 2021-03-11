import cors = require("cors");
import { Express } from "express";
const express = require('express');
import logger from "morgan";
export default (app: Express) => {
    app.use(cors({ maxAge: 1728000 }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger("dev"));
};
