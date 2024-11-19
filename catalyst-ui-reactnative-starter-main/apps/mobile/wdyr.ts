import React from 'react';
import env from 'react-native-config';

/// <reference types="@welldone-software/why-did-you-render" />
if (env.ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
