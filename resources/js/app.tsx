import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import {ToastContainer} from "react-toastify";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

if (import.meta.env.VITE_APP_ENV !== 'production') {
	window.onerror = (event, source, lineno, colno, err) => {
		// must be within function call because that's when the element is defined for sure.
		const ErrorOverlay = customElements.get('vite-error-overlay');
		// don't open outside vite environment
		if (!ErrorOverlay) {
			return;
		}
		const overlay = new ErrorOverlay(err);
		document.body.appendChild(overlay);
	};
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<>
			<App {...props} />
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>);
    },
    progress: {
        color: '#4B5563',
    },
});
