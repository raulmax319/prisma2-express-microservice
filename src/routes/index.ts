import * as controllers from '~/controllers';

export default () => {
  const controllerInstances = [];

  for (const name of Object.keys(controllers)) {
    const controller = (controllers as any)[name];

    if (typeof controller === 'function') {
      controllerInstances.push(new controller());
    }
  }
  return controllerInstances;
};
