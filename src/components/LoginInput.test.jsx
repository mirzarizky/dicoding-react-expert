import React from 'react';
import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';
import {MemoryRouter} from 'react-router-dom';

expect.extend(matchers);

/**
 * test scenario for LoginInput component
 *
 * - LoginInput component
 *    - should handle email input correctly
 *    - should handle password input correctly
 *    - should call login function when login button is clicked
 *
 */

describe('logininput component', () => {
  afterEach(()=> {
    cleanup();
  });

  it(
      'should handle email input correctly',
      async () => {
        // arrange
        render(
            <MemoryRouter>
              <LoginInput login={() => {}} />
            </MemoryRouter>,
        );
        const emailInput = await screen.getByPlaceholderText('you@example.com');

        // action
        await userEvent.type(emailInput, 'jon@example.com');

        // assert
        expect(emailInput).toHaveValue('jon@example.com');
      });


  it(
      'should handle password input correctly',
      async () => {
        // arrange
        render(
            <MemoryRouter>
              <LoginInput login={() => {}} />
            </MemoryRouter>,
        );
        const passwordInput = await screen.getByPlaceholderText('Password');

        // action
        await userEvent.type(passwordInput, 'secret-password');

        // assert
        expect(passwordInput).toHaveValue('secret-password');
      });

  it(
      'should call login function when login button is clicked',
      async () => {
        const mockLogin = vi.fn();
        render(<MemoryRouter>
          <LoginInput login={mockLogin} />
        </MemoryRouter>,
        );
        const emailInput = await screen.getByPlaceholderText('you@example.com');
        await userEvent.type(emailInput, 'jon@example.com');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'passwordtest');
        const loginButton = await screen.getByRole('button', {name: 'Login'});

        await userEvent.click(loginButton);

        expect(mockLogin).toBeCalledWith({
          email: 'jon@example.com',
          password: 'passwordtest',
        });
      });
});

