import { render } from 'react-dom';

import AppRouter from './router';

import './style.css';

const root: Element | null = document.querySelector('#root');

render(AppRouter, root);