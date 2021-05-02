import {createLogger, format, Logger, transports} from 'winston';

export class LoggerFactory {
    private static getLogger = (label: string) => {
        return createLogger({
            format: format.combine(
                format.colorize(),
                format.splat(),
                format.simple(),
                format.label({label: label, message: true}),
                format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
            ),
            transports: [new transports.Console({
                level: process.env.NODE_ENV == 'prodcu?tion' ? 'info' : 'debug',
                handleExceptions: true,                
            })],
            exitOnError: false
        });
    };

    public static grpc:     Logger      = LoggerFactory.getLogger('GRPC');
    public static config:   Logger      = LoggerFactory.getLogger('CONFIG');
    public static server:   Logger      = LoggerFactory.getLogger('SERVER');
    public static api:      Logger      = LoggerFactory.getLogger('API');
}
