import React from 'react';
import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import {MemoryRouter} from 'react-router-dom';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('registerinput component', () => {
  afterEach(()=> {
    cleanup();
  });

  it( 'should handle name input correctly', async () => {
    // arrange
    render(
        <MemoryRouter>
          <RegisterInput register={() => {}} />
        </MemoryRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('Jon Doe');

    // action
    await userEvent.type(nameInput, 'Jon');

    // assert
    expect(nameInput).toHaveValue('Jon');
  });

  it( 'should handle email input correctly', async () => {
    // arrange
    render(
        <MemoryRouter>
          <RegisterInput login={() => {}} />
        </MemoryRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('you@example.com');

    // action
    await userEvent.type(emailInput, 'jon@example.com');

    // assert
    expect(emailInput).toHaveValue('jon@example.com');
  });


  it( 'should handle password input correctly', async () => {
    // arrange
    render(
        <MemoryRouter>
          <RegisterInput login={() => {}} />
        </MemoryRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'secret-password');

    // assert
    expect(passwordInput).toHaveValue('secret-password');
  });

  it( 'should handle password confirmation input correctly', async () => {
    // arrange
    render(
        <MemoryRouter>
          <RegisterInput login={() => {}} />
        </MemoryRouter>,
    );
    const passwordConfirmation = await screen.getByPlaceholderText('Confirm Password');

    // action
    await userEvent.type(passwordConfirmation, 'secret-password');

    // assert
    expect(passwordConfirmation).toHaveValue('secret-password');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<MemoryRouter>
      <RegisterInput register={mockLogin} />
    </MemoryRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('Jon Doe');
    await userEvent.type(nameInput, 'Jon');
    const emailInput = await screen.getByPlaceholderText('you@example.com');
    await userEvent.type(emailInput, 'jon@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'secret-password');
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
    await userEvent.type(confirmPasswordInput, 'secret-password');
    const registerButton = await screen.getByRole('button', {name: 'Register'});

    await userEvent.click(registerButton);

    expect(mockLogin).toBeCalledWith({
      name: 'Jon',
      email: 'jon@example.com',
      password: 'secret-password',
    });
  });
});

