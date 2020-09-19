import React from 'react';
import moxios from 'moxios';
import { render, fireEvent } from 'test-utils'; // eslint-disable-line
import { waitFor } from '@testing-library/dom';
import { Route } from 'react-router-dom';
import BlogPage from './index';
import getArticlesData from './mocks/getArticles.json';
import getArticlesPage2Data from './mocks/getArticlesPage2.json';


describe('Blog Page', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Show page list', async () => {
    moxios.stubOnce('GET', '/articles?page=0&size=8', getArticlesData);

    const blogPage = render(<BlogPage/>);
    const { queryByTestId, queryAllByTestId } = blogPage;

    await waitFor(() => expect(queryByTestId('load-more-button')).toBeInTheDocument());

    const cards = queryAllByTestId('article-card');
    expect(cards.length).toBe(8);
  });

  test('Load more and no more articles', async () => {
    moxios.stubOnce('GET', '/articles?page=0&size=8', getArticlesData);
    moxios.stubOnce('GET', '/articles?page=1&size=8', getArticlesPage2Data);

    const blogPage = render(<BlogPage/>);
    const { queryByTestId, queryAllByTestId } = blogPage;

    await waitFor(() => expect(queryByTestId('load-more-button')).toBeInTheDocument());
    fireEvent.click(queryByTestId('load-more-button'));

    await waitFor(() => expect(queryByTestId('load-more-button')).not.toBeInTheDocument());
    const cards = queryAllByTestId('article-card');
    expect(cards.length).toBe(10);
  });
});
