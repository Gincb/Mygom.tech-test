import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import {Route, Switch} from "react-router-dom";
import {Routes} from '~/constants';
import itemIsReused from "~/utils/itemIsReused";
import itemIsOld from "~/utils/itemIsOld";
import itemIsWrong from "~/utils/itemIsWrong";
import { useUserContext } from '../UserContext';

const UsersManagement = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items,
    isLoading,
    errorMessage,
  } = useItemsProvider();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>
  }

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items}/>
      <Switch>
        <Route exact path={Routes.Users}>
          <List items={items}/>
        </Route>
        <Route path={Routes.Wrong}>
          <List items={itemIsWrong(items)}/>
        </Route>
        <Route path={Routes.Reused}>
          <List items={items.filter((item) => itemIsReused(item, items))}/>
        </Route>
        <Route path={Routes.Old}>
          <List items={itemIsOld(items)}/>
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagement;
