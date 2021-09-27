import { FC } from 'react';
import { Routes } from "~/constants";
import { IItem } from "~/services/getUserItems";
import FilterTab from "./components/FilterTab";
import itemIsOld from '~/utils/itemIsOld';
import itemIsWrong from '~/utils/itemIsWrong';
import itemIsReused from '~/utils/itemIsReused';

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({items}) => {
  const wrongItemsCount = itemIsWrong(items).length;
  const oldItemsCount = itemIsOld(items).length;
  const reusedItemsCount = items.filter((item) => itemIsReused(item, items)).length;

  return (
    <div className="filter">
      <FilterTab title="all" count={items.length} path={Routes.Users}/>
      <FilterTab title="Wrong" count={wrongItemsCount} path={Routes.Wrong}/>
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused}/>
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old}/>
    </div>
  );
};

export default Filter;
