import { Repository } from "typeorm";
import { License } from "../entities/license.entity";


export interface LicenseRepository extends Repository<License> {

}