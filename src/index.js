import setUp from 'rango-dropdownmenu';
import { todayPrint, forecastPrint } from './display';
import './weather.css';
// setUp(fontFamily, fontSize, rango)
setUp('"Roboto Mono", monospace', '15', [200, 200, 200]);
todayPrint('Lisbon, PT');
forecastPrint('Lisbon, PT');
