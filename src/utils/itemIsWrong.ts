import {IItem} from "~/services/getUserItems";

const itemIsWrong = (itemList: Array<IItem>) => {
  
  const wrongItems = itemList.filter(item => !item.email.includes('@'));

  return wrongItems;
};

export default itemIsWrong;
