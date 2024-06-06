import Box from '@mui/system/Box'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'

import { arrayMove } from '@dnd-kit/sortable'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  //Cùng một thời điểm chỉ có 1  phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDragginCard, setOldColumnWhenDragginCard] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //Tim mot cai column theo cardId
  const findColumnbyCardId = (cardId) => {
    //Doan nay can luu y nen dung c.cards thay vi dung c.cardOrderIds boi vi o buoc handleDragOver chung ta se lam du lieu cards hoan chinh truoc roi sau do moi tao ra cardOrderIds moi
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function chung xu ly viec cap nhat lai state trong truong hop di chuyen Card giua 2 Column khac nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // console.log('active: ', active)
      // console.log('over: ', over)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Logic tinh toán "cardIndex moi" (trên hoac duoi cúa overCard) lay chuân ra tu code cua thu viên nhieu khi muôn tù chôi hiêu =))
      let newIndex
      const isBelowOverItem = active.rect.current.translated &&
                              active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // CLone mang OrderedColumnsState cu ra môt cái moi de xu ly data rôi return - cap nhat lai OrderedColumnsState moi
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        // Xoa card o cai column active (cung co the hieu la column cu, cai luc ma keo card ra khoi no de sang column khac)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragingCardId)

        // Cap nhat lai mang cardOrderIds cho chuan du lieu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        // Kiem tra xem card dang keo no co ton tai trong column overColumn hay chua, neu co thi can xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragingCardId)
        // Phai cap nhat chuan du lieu columnId trong card sau khi keo giua 2 column khac nhau
        const rebuild_activeDragingCardData = {
          ...activeDragingCardData,
          columnId: nextOverColumn._id
        }
        // Them card dang keo vao column overColumn
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newIndex, 0, rebuild_activeDragingCardData)
        // Cap nhat lai mang cardOrderIds cho chuan du lieu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      //console.log('nextColumns: ', nextColumns)
      return nextColumns
    })
  }
  //Trigger khi bắt đầu kéo (Drag) 1 phần tử
  const handleDragStart = (event) => {
    //console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Neu la keo tha card thi moi thuc hien han dong set gia tri oldColumn
    if (event?.active?.data?.current?.columnId)
      setOldColumnWhenDragginCard(findColumnbyCardId(event?.active?.id))
  }

  //Trigger khi kéo (Drag) phần tử qua một phần tử khác
  const handleDragOver = (event) => {
    //Khong lam gi neu dang keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Con neu keo card thi xu ly them de co the keo tha card qua lai giua cac column
    //console.log('handleDragOver:', event)
    const { active, over } = event

    //Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì cả (để tránh crash trang)
    if (!active || !over) return

    //activeDraggingCard: la cai card dang duoc keo
    const { id : activeDragingCardId, data : { current : activeDragingCardData } } = active
    //overCard: la cai card dang tuong tac tren hoac duoi so voi cai card dang duoc keo o tren
    const { id : overCardId } = over

    // Tim 2 cai column theo cardId
    const activeColumn = findColumnbyCardId(activeDragingCardId)
    const overColumn = findColumnbyCardId(overCardId)

    // console.log('activeColumn: ', activeColumn)
    // console.log('overColumn: ', overColumn)
    //Neu không tôn tai 1 trong 2 column thi không lam gi hêt, tranh crash trang web
    if (!activeColumn || !overColumn) return
    //xu ly logic o day chi khi kéo card qua 2 column khac nhau, con neu kéo card trong chinh column ban dâu cúa nó thi không lam gi
    //Vi day dang là doan xu ly lúc kéo (handleDragOver), con xu ly lúc kéo xong xui thi nó lai là van dè khac o (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDragingCardData
      )
    }
  }

  //Trigger khi kết thúc hành động kéo (Drag) => hành động thả (drop)
  const handleDragEnd = (event) => {
    //console.log('handleDragEnd: ', event)
    const { active, over } = event

    //Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì cả (để tránh crash trang)
    if (!active || !over) return

    // Xu ly keo tha cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id : activeDragingCardId, data : { current : activeDragingCardData } } = active
      //overCard: la cai card dang tuong tac tren hoac duoi so voi cai card dang duoc keo o tren
      const { id : overCardId } = over

      // Tim 2 cai column theo cardId
      const activeColumn = findColumnbyCardId(activeDragingCardId)
      const overColumn = findColumnbyCardId(overCardId)

      //Neu không tôn tai 1 trong 2 column thi không lam gi hêt, tranh crash trang web
      if (!activeColumn || !overColumn) return

      // Hanh dong keo tha card giua 2 column khac nhau
      // Phai dung toi activeDragItemData.columnId hoac oldColumnWhenDragginCard._id (set vao state tu buoc handleDragStart)
      // chu khong phai activeData trong handleDragEnd nay vi sau khi di qua onDragOver toi day thi state cua card da bi cap nhat 1 lan roi
      if (oldColumnWhenDragginCard._id !== overColumn._id) {
        // Hanh dong keo tha card giua 2 column khac nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData
        )
        // setOrderedColumns(prevColumns => {
        //   console.log('prevColumns: ', prevColumns)
        //   return prevColumns
        // })
      } else {
        //Hanh dong theo tha card trong cung column

        // Lay vi tri cu tu thang oldColumnWhenDragginCard
        const oldCardIndex = oldColumnWhenDragginCard?.cards?.findIndex(card => card._id === activeDragItemId)
        //Lau vi tri moi tu thang over
        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // Dung arrayMove cua thäng dnd-kit de sap xêp lai mäng Cards ban däu
        // Code cúa arrayMove o day: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedCards = arrayMove(oldColumnWhenDragginCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // CLone mang OrderedColumnsState cu ra môt cái moi de xu ly data rôi return - cap nhat lai OrderedColumnsState moi
          const nextColumns = cloneDeep(prevColumns)

          // Tim toi cai column ma chung ta dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cap nhat lai 2 gia tri moi la cards va cardOrderIds trong cai targetColumn
          /*Trong JavaScript, khi bạn khai báo một biến bằng từ khóa const, biến đó không thể được tái gán giá trị mới.
          Tuy nhiên, nếu biến đó là một đối tượng (object) hoặc một mảng (array),
          bạn có thể thay đổi các thuộc tính của đối tượng hoặc các phần tử của mảng.
          Điều này có nghĩa là bản thân tham chiếu không thể thay đổi, nhưng nội dung mà tham chiếu trỏ tới có thể thay đổi. */
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          //console.log('nextColumns: ', nextColumns)
          return nextColumns
        })
      }
    }

    // Xu ly keo tha Columns trong mot cai boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
    //Neu vi tri keo tha khac vi tri ban dau
      if (active.id !== over.id) {
        // Lay vi tri cu tu thang active
        const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
        //Lau vi tri moi tu thang over
        const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)

        // Dung arrayMove cua thäng dnd-kit de sap xêp lai mäng Columns ban däu
        // Code cúa arrayMove o day: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        //const dnndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
        //console.log('dnndOrderedColumns: ', dndOrderedColumns)
        //console.log('dnndOrderedColumnsIds: ', dnndOrderedColumnsIds)

        //Cap nhat lai state columns ban dau sau khi da keo tha
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Nhung du lieu nay sau khi keo tha luon phai dua ve gia tri null mac dinh ban dau
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDragginCard(null)
  }

  // Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ overplay (video 32)
  const customDropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }

  return (
    <DndContext
      // Cam bien (da giai thich ky o video so 38)
      sensors={sensors}
      // Thuat toan phat hien va cham(Neu khong co no thi card voi cover lon se khong keo qua column khac duoc
      // vi no se bi conflict giua card va column, chung ta se dung closestCorners thay vi closestCenter)
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' :'#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>

      <DragOverlay dropAnimation={customDropAnimation}>
        {!activeDragItemType && null}
        {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
        {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
      </DragOverlay>
    </DndContext>
  )
}
export default BoardContent
