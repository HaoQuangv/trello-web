/**
 * YouTube: TrungQuanDev - Một Lập Trình Viên
 * Created by trungquandev.com's author on Jun 28, 2023
 */
/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/**
  * Video 37.2: Cach xur ly bug logic thu viên Dnd-kit khi Column là rông:
  * Phía FE se tu tao ra môt cái card dac biêt: Placeholder Card, không liên quan tói Back-end
  * Card dac biêt nay se duoc an o giao diên UI nguoi dung.
  * Câu trúc Id cua cái card nay dê Unique rat don giän, không can phai lam random phúc tap:
  * "columnId-placeholder-card' (moi column chi có the có tói da môt cái Placeholder Card)
  * Quan trong khi tao, phai day du: (_id, boardId, columnId, FE_PlaceholderCard)
*/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}