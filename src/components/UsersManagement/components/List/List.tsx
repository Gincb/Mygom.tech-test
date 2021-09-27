import { FC, useState } from "react"
import { IItem } from "~/services/getUserItems"
import ItemIcon from "./components/ItemIcon"
import updateItem from "../../../../services/updateItem"
import Modal from "react-modal"

import "./list-style.scss"

interface IList {
  items: Array<IItem>
}

interface IListItem {
  item: IItem
}

interface IUpdateModal {
  item: IItem
  setNewEmail: (arg0: string) => void
  newEmail: string
}

const UpdateModal: FC<IUpdateModal> = ({ item, newEmail, setNewEmail }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Email
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Email</h1>
        <input
          placeholder="new email"
          className="input"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={async () => {
              await updateItem({
                ...item,
                email: newEmail,
              })
              setShowModal(false)
            }}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setShowModal(false)
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

const ListItem: FC<IListItem> = ({ item }) => {
  const [newEmail, setNewEmail] = useState<string>('')
  
  return (
    <li className="item">
      <ItemIcon name={item.name} />
      <div>
        <div className="title">{item.name}</div>
        <div className="description">{newEmail ? newEmail : item.email}</div>
      </div>
      <UpdateModal item={item} newEmail={newEmail} setNewEmail={setNewEmail} />
    </li>
  )
}

const List: FC<IList> = ({items}) => (
  <ul className="list">
    {
      items.map((item) => (
        <ListItem key={item.email+Math.random()} item={item}/>
      ))
    }
  </ul>
)

export default List
