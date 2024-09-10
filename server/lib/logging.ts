import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
  import { TracingInstrumentation } from '@grafana/faro-web-tracing';

  initializeFaro({
    url: process.env.GRAFANA_URL,
    app: {
      name: 'luganodes-sde-task',
      version: '1.0.0',
      environment: 'production'
    },
    
    instrumentations: [
      // Mandatory, omits default instrumentations otherwise.
      ...getWebInstrumentations(),

      // Tracing package to get end-to-end visibility for HTTP requests.
      new TracingInstrumentation(),
    ],
  });