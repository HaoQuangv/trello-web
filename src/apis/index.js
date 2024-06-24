import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/**
* Luu y: Dói vói viêc sú dung axios o khoa MERN Stack Pro trên kênh YouTube: TrungQuanDev - Môt Lâp Trinh Viên
* Tât ca cac function bên duoi cac ban se thay minh chi request và lay data luôn, ma không có try catch hay then catch gi de bat löi.
* Ly do là vi o phia Front-end chung ta không can thiêt lam nhu vay doi voi moi request boi nó sê gay ra viec du thua code catch löi quá nhieu.
* Giäi pháp Clean Code gon gang dó là chúng ta se catch löi tâp trung tai mot noi bäng cách tân dung môt thú
cuc ky manh me trong axios dó là Interceptors
* Hieu don giän Interceptors là cach ma chúng ta se danh chän vao giua request hoàc response de xu ly logic mà chung ta muôn.
* (Va o hoc phân MERN Stafk Advance nâng cao hoc truc tiep minh se day cuc ky day du cach xu ly, áp dung phan nay chuan chinh cho các ban.)
*/
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //Luu y: axios se tra ket qua ve qua property cua no la data
  return response.data
}