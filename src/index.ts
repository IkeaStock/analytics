import Redis from "ioredis";

interface IAnalyticsOptions {
    port: number;
    host: string;
    username: string;
    password: string;
}
export class analytics {
    options: IAnalyticsOptions;
    db: Redis;
    constructor(options: IAnalyticsOptions) {
        if (options === undefined) {
            console.error('Analytics: options are required');
        } else {
            this.options = options;
            const db = new Redis({
                port: this.options.port,
                host: this.options.host,
                username: this.options.username,
                password: this.options.password,
                db: 0,
            })
            this.db = db;

        }
    }
    update(key: string, value: string) {
        this.db.set(key, value);
    }
}