import '@tasteee/zest'
import '@tasteee/zest/ink.css'
import '@tasteee/zest/fonts.css'
import { mount } from 'svelte'
import App from './App.svelte'

mount(App, { target: document.getElementById('app')! })
