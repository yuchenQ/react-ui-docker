import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import App from './App';

describe('App', () => {
  afterEach(cleanup);

  test('it should render a spicy title', async () => {
    const { getByTestId } = render(<App />);

    const headerNode = await waitForElement(() => getByTestId('title'));

    expect(headerNode).toHaveTextContent('Docker UI Demo');
    expect(headerNode).toHaveTextContent('🐳');
    expect(headerNode).toHaveTextContent('🔥');
  });
});
