import {genSalt, hash, compare, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../../interfaces/IPayload';

export class AuthUtils {
    public static async hash(content: string): Promise<string> {
        const salt = await (genSalt(13));

        return await hash(content, salt);
    }

    public static async compare(password: string, storedPassword: string): Promise<Boolean> {
        return compare(password, storedPassword);
    }

    public static decodeToken(jwtToken: string): Payload {
        let decodedToken = jwt.decode(jwtToken, { complete: true })
        return decodedToken["payload"];
    }

}
