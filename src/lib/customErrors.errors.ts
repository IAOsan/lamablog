export class HttpError<TReason> extends Error {
	status = 400;
	reason: TReason | null = null;

	constructor({
		message = '',
		status,
		reason,
	}: {
		message?: string;
		status?: number;
		reason?: TReason;
	}) {
		super(message);
		if (status) this.status = status;
		if (reason) this.reason = reason;
	}
}
