import React from 'react';
import renderer from 'react-test-renderer';

import AddModal from '../src/components/AddModal';

describe('<AddModal />', () => {
  it('has 2 child', () => {
    const tree = renderer.create(<AddModal />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});