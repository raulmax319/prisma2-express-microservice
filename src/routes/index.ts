/*
  In this file we only map the controllers instances
  and pass it to the server to create the routes
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as controllers from '~/controllers';

export default (): any[] => {
  const controllerInstances: any[] = [];

  Object.keys(controllers).forEach((name) => {
    const Controller = (controllers as any)[name];

    if (typeof Controller === 'function') controllerInstances.push(new Controller());
  });

  return controllerInstances;
};
