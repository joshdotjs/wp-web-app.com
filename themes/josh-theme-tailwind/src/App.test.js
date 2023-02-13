import { useState } from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; // expect()

// ==============================================

const App = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      Josh

      <button onClick={() => {
        setOpen(prev => !prev);  
      }}></button>
      
      {
        open &&
        <div data-testid="modal">
          Modal Open
        </div>
      }

      {
        !open &&
        <span>The modal is closed...</span>
      }
    </>
  );
};

// ==============================================

describe( // suite
  'Greeting component', // description of test category 
  () => {

    // --------------------------------------------

    test('testing stuff 1', () => {


      // 1. Arrange:  Setup the test. Test conditions and test environment.
      render(<App />);
      
      
      // - - - - - - - - - - - - - - - - - - - - 
      
      
      // 2. Act:      Run logic that should be tested (e.g. execute function).
      
      // get    - throws error if element is not found
      // query  - will not throw effor if element is not found
      // find   - returns promise and is okay if element is eventually found (async)
      
      const elem = screen.getByText(/Josh/i, { exact: true });
      const elem2 = screen.queryByText(/Steve/i, { exact: true });
    
    
    
      // - - - - - - - - - - - - - - - - - - - - 
      
    
      // 3. Assert:   Compare execution results with expected results.
      
      
      // - - - - - - - - - - - - - - - - - - - - 
    
      // matchers:
      //  -toBeInTheDocument()
    
      expect(elem).toBeInTheDocument();
      expect(elem2).not.toBeInTheDocument();
    });

    // --------------------------------------------
  
    test('testing stuff 2', () => {
  
      // 1. Arrange:  Setup the test. Test conditions and test environment.
      render(<App />);
      
      // - - - - - - - - - - - - - - - - - - - - 
      
      // 2. Act:      Run logic that should be tested (e.g. execute [expect?] function).
      
      // get    - throws error if element is not found
      // query  - will not throw effor if element is not found
      // find   - returns promise and is okay if element is eventually found (async)
      
      const elem = screen.getByText(/The modal is closed.../i, { exact: true });
    
      // - - - - - - - - - - - - - - - - - - - - 
    
      // 3. Assert:   Compare execution results with expected results.

      // matchers:
      //  -toBeInTheDocument()
    
      expect(elem).toBeInTheDocument();
    });

    // --------------------------------------------
  
    test('testing stuff 3', () => {
  
      // 1. Arrange:  Setup the test. Test conditions and test environment.
      render(<App />);
      

      // - - - - - - - - - - - - - - - - - - - - 
      
      // 2. Act:      Run logic that should be tested (e.g. execute [expect?] function).
      
      // get    - throws error if element is not found
      // query  - will not throw effor if element is not found
      // find   - returns promise and is okay if element is eventually found (async)
      
      const button = screen.getByRole('button');
      userEvent.click(button);
      // fireEvent(
      //   // screen.getByText('Change Text!'),
      //   button,
      //   new MouseEvent('click', {
      //     bubbles: true,
      //     cancelable: true,
      //   }),
      // );

      const elem_1 = screen.getByTestId('modal');
      const elem_2 = screen.queryByText(/The modal is closed.../i, { exact: true });
    
      // - - - - - - - - - - - - - - - - - - - - 
    
      // 3. Assert:   Compare execution results with expected results.

      // matchers:
      //  -toBeInTheDocument()
    
      expect(elem_1).toBeInTheDocument();
      // expect(elem_2).not.toBeInTheDocument();
      expect(elem_2).toBeNull();
    });
    

    // --------------------------------------------
  }
);