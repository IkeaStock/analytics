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
    async update(key: string) {
        const oldVar = await this.db.get(key)
        const newVar = oldVar + 1
        const res = this.db.set(key, newVar);
        return res
    }
}