import { User } from "./entities/user.entity";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comments.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv"
import { join } from "path";
import { Log } from "./common/utils/logging/Log";
import { UserInfo } from "./entities/userInfo.entity";
import { Like } from "./entities/likes.entity";
import { Media } from "./entities/media.entity";
import { UserSubscription } from "./entities/subscriptions.entity";
import { Following } from "./entities/subscribed.entity";


const result = dotenv.config(
  process.env.NODE_ENV == "development"
    ? { path: join(__dirname, "..", "/.env") }
    : undefined
);
if (result.error) {
  Log.config.exitOnError = true;
  Log.config.error(
    "Environment variable is not working correctly, check file location ",
    result.error
  );
}

export const ormConfig: TypeOrmModuleOptions = {
  name: "mysql",
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Post,
    Comment,
    UserInfo,
    Like,
    Media,
    UserSubscription,
    Following
  ],
  keepConnectionAlive: process.env.NODE_ENV == "development" ? true : false
};
