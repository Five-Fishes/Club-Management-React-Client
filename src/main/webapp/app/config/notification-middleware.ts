import { AxiosError, AxiosResponse } from 'axios';
import { isPromise, translate } from 'react-jhipster';
import { toast } from 'react-toastify';

const addErrorAlert = (message: string, key?: any, data?: any) => {
  key = key ? key : message;
  toast.error(translate(key, data));
};
export default () => (next: any) => (action: any) => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then((response: any) => {
      if (action.meta && action.meta.successMessage) {
        toast.success(action.meta.successMessage);
      } else if (response && response.action && response.action.payload && response.action.payload.headers) {
        const headers = response.action.payload.headers;
        let alert: string | null = null;
        let alertParams: string | null = null;
        const headerEntries: Array<[string, string]> = Object.entries(headers);
        headerEntries.forEach(([k, v]: [string, string]) => {
          if (k.toLowerCase().endsWith('app-alert')) {
            alert = v;
          } else if (k.toLowerCase().endsWith('app-params')) {
            alertParams = v;
          }
        });
        if (alert) {
          const alertParam = alertParams;
          toast.success(translate(alert, { param: alertParam }));
        }
      }
      return Promise.resolve(response);
    })
    .catch((error: AxiosError) => {
      if (action.meta && action.meta.errorMessage) {
        toast.error(action.meta.errorMessage);
      } else if (error && error.response) {
        const response = error.response;
        const data = response.data;
        if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
          let i;
          switch (response.status) {
            // connection refused, server not reachable
            case 0:
              addErrorAlert('Server not reachable', 'error.server.not.reachable');
              break;

            case 400:
              const headers: Array<[string, string]> = Object.entries(response.headers);
              let errorHeader = null;
              let entityKey = null;
              headers.forEach(([k, v]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v;
                }
              });
              if (errorHeader) {
                const entityName = translate('global.menu.entities.' + entityKey);
                addErrorAlert(errorHeader, errorHeader, { entityName });
              } else if (data !== '' && data.fieldErrors) {
                const fieldErrors = data.fieldErrors;
                for (i = 0; i < fieldErrors.length; i++) {
                  const fieldError = fieldErrors[i];
                  if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                    fieldError.message = 'Size';
                  }
                  // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                  const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                  const fieldName = translate(`clubmanagementApp.${fieldError.objectName}.${convertedField}`);
                  addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`, { fieldName });
                }
              } else if (data !== '' && data.message) {
                addErrorAlert(data.message, data.message, data.params);
              } else {
                addErrorAlert(data);
              }
              break;

            case 404:
              addErrorAlert('Not found', 'error.urlNotFound');
              break;

            default:
              if (data !== '' && data.message) {
                addErrorAlert(data.message);
              } else {
                addErrorAlert(data);
              }
          }
        }
      } else if (error && error.message) {
        toast.error(error.message);
      } else {
        toast.error('Unknown error!');
      }
      return Promise.reject(error);
    });
};
