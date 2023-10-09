import { WeatherStatus } from '@/types/types';
import { DENIED, ERROR, LOADING, NOT_INITIALIZED, SUCCESS } from './statuses';

export const WELCOME_MESSAGE = 'Welcome to Super Potato!';
// export const LOGIN_MESSAGE = 'Please log in to continue.';
// export const SIGNUP_MESSAGE = "Don't have an account? Sign up now!";
// export const USERNAME_LABEL = 'Username';
// export const PASSWORD_LABEL = 'Password';
// export const LOGIN_BUTTON_TEXT = 'Log In';
// export const SIGNUP_BUTTON_TEXT = 'Sign Up';
// export const FORGOT_PASSWORD_TEXT = 'Forgot Password?';
export const ERROR_MESSAGE = 'Oops! Something went wrong. Please try again.';

export const weatherReadoutMessages = {
  [NOT_INITIALIZED]: 'Press use location to get the weather.',
  [LOADING]: 'Loading...',
  [SUCCESS]: 'The weather is currently',
  [ERROR]: 'Oops, there was a problem getting the weather, try again.',
};

export function getWeatherReadoutMessage(status: WeatherStatus) {
  return weatherReadoutMessages[status];
}

export const locationStatusMessages = {
  [DENIED]: `We don't have access to your location data, check your browser or device settings`,
};
