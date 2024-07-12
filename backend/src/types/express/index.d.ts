import { IUser } from "../../middlewares/auth.middleware";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
        }
    }
}