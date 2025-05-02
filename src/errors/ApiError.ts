export class ApiError extends Error {
    status: number;
    data?: unknown;

    constructor(message: string, status: number = 500, data?: unknown) {
        super(message);
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
