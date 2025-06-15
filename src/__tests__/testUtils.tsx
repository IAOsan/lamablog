// re-export everything
export * from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

export function setupUser(): UserEvent {
    return userEvent.setup();
}