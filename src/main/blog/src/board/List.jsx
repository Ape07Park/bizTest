import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/general.css';
import { useNavigate } from 'react-router-dom';

// Function to get board list
export const getBoardList = async () => {
  try {
    const response = await axios.get('/bizz/board/list'); // Fetch data
    return response.data; // Return fetched data
  } catch (error) {
    console.log('데이터를 불러오는 중 에러:', error);
    throw error;
  }
};

function List() {
  const [boardList, setBoardList] = useState([]);
  const [pageSize, setPageSize] = useState(5); // 한 페이지에 보여질 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBoardList();
        setBoardList(data);
      } catch (error) {
        console.log('데이터를 불러오는 중 에러:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const moveView = (bid) => {
    navigate(`/view/${bid}`);
  };

  const moveWrite = () => {
    navigate('/write');
  };

  // 페이지 변경 시 호출될 함수
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 해당하는 데이터 가져오기
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return boardList.slice(startIndex, endIndex);
  };

  // 전체 페이지 수 계산
  useEffect(() => {
    if (boardList.length > 0) {
      const totalPages = Math.ceil(boardList.length / pageSize);
      setTotalPages(totalPages);
    }
  }, [boardList, pageSize]);

  return (
    <div id="wrap">
      <section id="container" className="sub new">
        <div id="contents">
          <div className="sub-title-area">
            <h2 className="tit">News & Info</h2>
          </div>
          <div className="btn_area">
            <p href="write.html" className="btn_blue_line" onClick={moveWrite} style={{ cursor: 'pointer' }}>글쓰기</p>
          </div>
          <table className="news_list">
            <caption>News 리스트</caption>
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '*' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '8%' }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">등록일</th>
                <th scope="col">조회</th>
                <th scope="col">첨부</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((board, index) => (
                <tr key={board.bid}>
                  <td>{index + 1}</td>
                  <td className="board_txt">
                    <p onClick={() => moveView(board.bid)} style={{ cursor: 'pointer' }}>
                      {board.title}
                    </p>
                  </td>
                  <td className="board_man">{board.writer}</td>
                  <td className="board_date">{board.regTime}</td>
                  <td className="board_read">{board.viewCount}</td>
                  <td className="board_file">
                    {board.files && <span className="file_icon">파일다운로드</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <a className={`prev end ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => changePage(1)} href="#">첫 페이지</a>
            <a className={`prev ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => changePage(currentPage - 1)} href="#">이전 페이지</a>
            {[...Array(totalPages).keys()].map((page) => (
              <a key={page} className={page + 1 === currentPage ? 'on' : ''} onClick={() => changePage(page + 1)} href="#">
                {page + 1}
              </a>
            ))}
            <a className={`next ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => changePage(currentPage + 1)} href="#">다음 페이지</a>
            <a className={`next end ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => changePage(totalPages)} href="#">마지막 페이지</a>
          </div>
          <div className="find_wrap">
            <select name="" id="">
              <option value="">제목</option>
              <option value="">내용</option>
            </select>
            <input type="text" name="" id="" title="검색어 입력" placeholder="검색어 입력" />
            <a href="#" className="btn_gray">검색</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default List;
