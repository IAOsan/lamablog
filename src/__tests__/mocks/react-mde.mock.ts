import React from 'react';
import { vi } from 'vitest';

export const executeCommand = vi.fn();

vi.mock('react-mde', () => ({
	useTextAreaMarkdownEditor: () => ({
		ref: React.createRef(),
		commandController: { executeCommand },
	}),
	headingLevel1Command: {},
	headingLevel2Command: {},
	headingLevel3Command: {},
	headingLevel4Command: {},
	headingLevel5Command: {},
	headingLevel6Command: {},
	boldCommand: {},
	italicCommand: {},
	strikethroughCommand: {},
	linkCommand: {},
	quoteCommand: {},
	codeBlockCommand: {},
	imageCommand: {},
	unorderedListCommand: {},
	orderedListCommand: {},
	checkedListCommand: {},
}));
