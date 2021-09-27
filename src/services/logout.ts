import {API} from '~/constants';
import getUrl from '../utils/getUrl';

const logout = async() => {
  localStorage.removeItem("token");
  const url = getUrl(API.Logout );
  await fetch(url);
};

export default logout;