import {IItem} from "~/services/getUserItems";

const ItemIsOld = (itemList: Array<IItem>) => {
  
  const oldItems = itemList.filter(item => (new Date().getTime() - new Date(item.createdAt).getTime())/(60*60*24*1000)  > 30);

  return oldItems;
};

export default ItemIsOld;
