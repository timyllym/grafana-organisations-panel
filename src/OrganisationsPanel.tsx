import React, { useState, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';

interface Props extends PanelProps {}

export const OrganisationsPanel: React.FC<Props> = (props: Props) => {
  const [organisationsList, setOrganisationsList] = useState([] as any[]);
  const [baseURL, setBaseURL] = useState('');

  useEffect(() => {
    // Store the URL part before dashboard definition as baseURL
    let baseURL = '';
    if (window.location.href.indexOf('/d/') > -1) {
      baseURL = window.location.href.split('/d/')[0];
    } else {
      baseURL = window.location.href;
      if (baseURL.indexOf('?') > -1) {
        baseURL = baseURL.split('?')[0];
      }
    }
    setBaseURL(baseURL);
    // Fetch list of organisations of current user from Grafana
    getBackendSrv()
      .get('api/user/orgs')
      .then((result: any) => {
        const organisationList = result.map((item: any) => {
          return {
            id: item.orgId,
            name: item.name,
          };
        });
        setOrganisationsList(organisationList);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="organisation-btns">
      {organisationsList.map((organisation: any, index: number) => (
        <div className="organisation-btn-container" key={'org' + index}>
          <a href={baseURL + '/?orgId=' + organisation.id} target="_self" className="organisation-btn">
            {organisation.name}
          </a>
        </div>
      ))}
    </div>
  );
};
