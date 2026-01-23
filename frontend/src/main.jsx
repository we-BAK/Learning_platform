import { SessionContextProvider } from '@supabase/auth-helpers-react';
import ReactDOM from 'react-dom/client';
import supabase from '../src/lib/supabaseClient';
import App from './App';
import { ToastProvider } from './components/Ui/Toast-provider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<SessionContextProvider supabaseClient={supabase}>
		<ToastProvider>
			<App />
		</ToastProvider>
	</SessionContextProvider>
);
