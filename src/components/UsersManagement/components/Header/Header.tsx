import {FC} from 'react';
import { useHistory } from 'react-router';
import {IItem} from "~/services/getUserItems";
import logout from '../../../../services/logout';
import { Routes } from "../../../../constants";

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
}

const Header: FC<IHeader> = ({items, username}) => {
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push(Routes.Login);
  }

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${items.length} Emails are wrong`}</h1>
      <span>Email validator to protect your company from bad registrations</span>
    </div>
  )
};

export default Header;
