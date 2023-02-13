import { render, screen, prettyDOM, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; // expect()

import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders "Hello World" as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World!');
    // expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see" you if the button was NOT clicked', () => {
    render(<Greeting />);

    const outputElement = screen.getByText('good to see you', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', async () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    // console.log(prettyDOM(buttonElement));
    // userEvent.click(buttonElement)

    fireEvent(
      // screen.getByText('Change Text!'),
      buttonElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    // Assert
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
     // Arrange
     render(<Greeting />);

     // Act
     const buttonElement = screen.getByRole('button');
     userEvent.click(buttonElement)
 
     // Assert
    //  const outputElement = screen.queryByText('good to see you', { exact: false });
    //  expect(outputElement).toBeNull();
  });
});
