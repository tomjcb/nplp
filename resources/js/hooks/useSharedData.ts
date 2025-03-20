import {usePage} from "@inertiajs/react";
import {Page} from "@inertiajs/core";

type InitialSharedData = {
	auth: {
		user: {
			id: number,
			email: string,
			name: string,
		}
	}
}

type DotNotation<T> = T extends object
	? {
		[K in keyof T]: K extends string
			? T[K] extends object
				? K | `${K}.${DotNotation<T[K]>}`
				: K
			: never
	}[keyof T]
	: never;

type GetNestedValue<T, P extends string> =
	P extends keyof T
		? T[P]
		: P extends `${infer K}.${infer R}`
			? K extends keyof T
				? GetNestedValue<T[K], R>
				: never
			: never;

export default function useSharedData<T = {}, P extends DotNotation<InitialSharedData & T> | undefined = undefined>(
	path?: P
): P extends string
	? GetNestedValue<InitialSharedData & T, P>
	: Page<InitialSharedData & T> {
	const page = usePage<InitialSharedData & T>();

	if (path === undefined) {
		return page as any;
	}

	const getValue = (obj: any, path: string) => {
		return path.split('.').reduce((acc, part) => acc?.[part], obj);
	};

	return getValue(page.props, path) as any;
}
