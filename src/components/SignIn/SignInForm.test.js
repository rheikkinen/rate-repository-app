import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SignInForm from './SignInForm';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      // render the SignInForm component, fill the text inputs and press the submit button
      render(<SignInForm onSubmit={onSubmit} />);
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'elina');
      fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'password123'
      );
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'elina',
          password: 'password123',
        });
      });
    });
  });
});
