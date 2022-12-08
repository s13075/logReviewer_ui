import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from '../../module';
import { render, screen } from '@testing-library/react';
import App from '../App';

const createStroeWithMiddleware = applyMiddleware(reduxThunk)(createStore);

describe("App component", () => {
  it("should render app without error", () => {
    const {asFragment} = renderWithRedux (<App/>,{});
    expect(asFragment()).toMatchSnapshot

  });
});

//test('renders learn react link', () => {
//  render(<App />);
//  const linkElement = screen.getByText(/tadam!/i);
//  expect(linkElement).toBeInTheDocument();
//});

const renderWithRedux = (
  uiComponent,
  {
    initialState,
    store = createStroeWithMiddleware(reducers, initialState)
  }
) => ({
  ...render(
    <Provider store={store} > {uiComponent} </Provider>
  )
});
