import Box from '@mui/system/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useState, useEffect } from 'react'

import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  //https://docs.dndkit.com/api-documentation/sensors
  // Nếu dùng PointerSensor mac dinh thi phai kêt hop thuôc tinh CSS touch-action: none ở nhüng phân tử kéo thả - nhung mà còn bug
  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // Yêu câu chuôt di chuyen 10px thi moi kich hoat event, fix truòng hop click bi goi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //Nhan giü 250ms và dung sai cua cam úng 500px thi moi kich hoat event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log(event)
    const { active, over } = event
    //Kiem tra neu khong ton tai over(keo linh tinh ra ngoai thi return luôn để tránh lỗi)
    if (!over) return
    //Neu vi tri keo tha khac vi tri ban dau
    if (active.id !== over.id) {
      // Lay vi tri cu tu thang active
      const oldIndex = orderedColumns.findIndex(column => column._id === active.id)
      //Lau vi tri moi tu thang over
      const newIndex = orderedColumns.findIndex(column => column._id === over.id)

      // Dung arrayMove cua thäng dnd-kit de sap xêp lai mäng Columns ban däu
      // Code cúa arrayMove o day: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      const dnndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
      console.log('dnndOrderedColumns: ', dndOrderedColumns)
      console.log('dnndOrderedColumnsIds: ', dnndOrderedColumnsIds)

      //Cap nhat lai state columns ban dau sau khi da keo tha
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' :'#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}
export default BoardContent
