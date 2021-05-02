import {Logger} from 'winston';
import {LoggerFactory} from './LoggerFactory';

export class Log {
    public static config: Logger = LoggerFactory.config;
    public static server: Logger = LoggerFactory.server;
    public static api:    Logger = LoggerFactory.api;
}
