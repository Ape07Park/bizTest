import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function View() {
  const { bid } = useParams();
  const [boardData, setBoardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/bizz/board/detail/${bid}`);
        setBoardData(response.data);
        
        // No automatic view count increase here
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchBoardData();
  }, [bid]); // Only run once when the component mounts

  const handleBoardUpdate = async () => {
    try {
      navigate(`/update/${bid}`);
    } catch (error) {
      console.log('Error navigating to update page:', error);
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wrap">
      <section id="container" className="sub">
        <div id="contents">
          <div className="sub-title-area">
            <h2 className="tit">News & Info</h2>
          </div>
          <div className="write_title">
            {boardData.title}
          </div>
          <div className="write_date">
            <span className="write_line"><strong>작성자 :</strong> {boardData.writer} </span>
            <span className="write_line"><strong>조회수 :</strong> {boardData.viewCount} </span>
            <span className="write_line">{formatDate(boardData.regTime)}</span>
            {boardData.files && <span><em className="file_icon"></em><a href="#"> {boardData.files}</a></span>}
          </div>
          <div className="con_box">
            {boardData.content}
          </div>
          <div className="btn_area">
            <button className="btn_blue" onClick={() => { navigate('/list'); }}>목록</button>
            <button type="button" className="btn_blue" onClick={handleBoardUpdate}>수정</button>
            <button type="button" className="btn_blue">삭제</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default View;
