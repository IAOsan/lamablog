import { render, RenderOptions } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

export function setupUser(): UserEvent {
	return userEvent.setup();
}

export function setup(jsx: React.ReactNode, options?: RenderOptions) {
	return {
		user: userEvent.setup(),
		...render(jsx, options),
	};
}

// re-export everything
export * from '@testing-library/react';
