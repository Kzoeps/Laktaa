export enum APIStatuses {
  'IDLE' = 'IDLE',
	'LOADING' = 'LOADING',
	'SUCCEEDED' = 'SUCCEEDED',
	'FAILED' = 'FAILED',
}

export interface BasicOption {
	label: string;
	value: string;
}

export enum ToastTypes {
	success = 'success',
	warn = 'warning',
	info = 'info',
	error = 'error'
}
