// https://github.com/Microsoft/TypeScript/issues/26728#issuecomment-422970152

// navigator.clipboard.d.ts

// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
interface Clipboard {
	writeText(newClipText: string): Promise<void>;
	readText(): Promise<string>;
	// Add any other methods you need here.
}

interface NavigatorClipboard {
	// Only available in a secure context.
	readonly clipboard?: Clipboard;
}

interface Navigator extends NavigatorClipboard {}
