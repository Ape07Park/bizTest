import axios from "axios";
import apiClient from "./apiClient";

const baseURL = process.env.REACT_APP_API_BASE_URL;

// board
export const getBoardList = async () => {
  try {
    const response = await axios.get('/bizz/board/getList'); // 데이터 가져오기
    return response.data; // 가져온 데이터 반환
  } catch (error) {
    console.log('데이터를 불러오는 중 에러:', error);
    throw error;
  }
};

export const BoardInsert = async (boardData) => {
  try {
    const response = await axios.post('/bizz/board/insert', boardData); // 데이터 가져오기
    return response.data; // 가져온 데이터 반환
  } catch (error) {
    console.log('데이터를 불러오는 중 에러:', error);
    throw error;
  }
};
