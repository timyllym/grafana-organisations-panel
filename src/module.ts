import { PanelPlugin } from '@grafana/data';
import { OrganisationsPanel } from './OrganisationsPanel';
import './style.scss';

export const plugin = new PanelPlugin(OrganisationsPanel);
