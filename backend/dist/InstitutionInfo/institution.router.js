"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const institution_controller_1 = require("./institution.controller");
const institutionInfoRouter = new hono_1.Hono();
institutionInfoRouter.get("/institution-info", institution_controller_1.InstitutionInfoController.getAllInstitutionInfo);
institutionInfoRouter.post("/institution-info", institution_controller_1.InstitutionInfoController.createInstitutionInfo);
institutionInfoRouter.put("/institution-info/:id", institution_controller_1.InstitutionInfoController.updateInstitutionInfo);
exports.default = institutionInfoRouter;
