import {FC} from 'react'
import {IList} from '../../types'
import { listsContainer } from './Listcontainer.css';
import List from '../List/List';

type TListContainerProps= {
  boardId: string;
  lists: IList[]; 
}

const ListContainer: FC<TListContainerProps>=({
  lists,
  boardId
})=>{
  return (
    <div className={listsContainer}>
      {
        lists.map(list => (
          <List 
            key={list.listId} 
            list={list}
            boardId={boardId}
          />
        ))
      }
    </div>
  )
}

export default ListContainer