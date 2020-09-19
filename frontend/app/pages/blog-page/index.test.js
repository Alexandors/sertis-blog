import React from 'react';
import moxios from 'moxios';
import { render, fireEvent } from 'test-utils'; // eslint-disable-line
import { waitFor } from '@testing-library/dom';
import BlogPage from './index';
import getArticlesData from './mocks/getArticles.json';


describe('Blog Page', () => {
  test('Show page list', async () => {
    moxios.stubOnce('GET', '/articles?page=0&size=8', getArticlesData);

    const blogPage = render(<BlogPage/>);
    const { queryByTestId, queryAllByTestId } = blogPage;

    const loadMoreButton = queryByTestId('load-more-button');
    await waitFor(() => loadMoreButton.toBeInTheDocument());
  });
});
