import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { isImmutableIterable } from './valueIn/helpers';

import { mapSelectorsToProps } from './mapSelectorsToProps';

const toJS = maybeImmutable =>
  (isImmutableIterable(maybeImmutable) ? maybeImmutable.toJS() : maybeImmutable);

const propsToJS = (props) => {
  const vanillaProps = {};
  Object.keys(props).forEach((key) => {
    vanillaProps[key] = toJS(props[key]);
  });

  return vanillaProps;
};

const createProxyComponent = (child) => {
  const Proxy = props => React.createElement(child, { ...propsToJS(props) });
  Proxy.displayName = 'Proxy';
  return Proxy;
};

const normalize = mapStateToProps => (state, props) => toJS(mapStateToProps(state, props));

export const connect = (mapStateToProps, ...rest) => (component) => {
  const isSelectorMap = typeof mapStateToProps !== 'function';

  const transformedMapStateToProps = isSelectorMap
    ? mapSelectorsToProps(mapStateToProps)
    : mapStateToProps;
  const normalizedMapStateToProps = mapStateToProps
    ? normalize(transformedMapStateToProps)
    : transformedMapStateToProps;

  const normalizedRest = [];
  rest.forEach((argument) => {
    if (isImmutableIterable(argument)) {
      normalizedRest.push(toJS(argument));
    } else if (typeof argument === 'object') {
      const currentObj = {};
      Object.keys(argument).forEach((key) => {
        currentObj[key] = toJS(argument);
      });
      normalizedRest.push(currentObj);
    } else {
      normalizedRest.push(toJS(argument));
    }
  });

  const Proxy = createProxyComponent(component);
  hoistNonReactStatics(Proxy, component);

  return reduxConnect(normalizedMapStateToProps, ...normalizedRest)(Proxy);
};

export default connect;
