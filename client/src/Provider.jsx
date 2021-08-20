import { useState } from 'react';
import { createContainer } from 'react-tracked';

const { uniqueNamesGenerator, names,adjectives } = require('unique-names-generator');

const initialState = {
  userName: uniqueNamesGenerator({
    dictionaries:[names,adjectives],
    length: 2
  }),
}

export const {
    Provider,
    useTrackedState,
    useUpdate: useSetState,
} = createContainer(() => useState(initialState));