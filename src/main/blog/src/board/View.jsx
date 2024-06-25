import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function View() {
  const { bid } = useParams(); // Get the bid parameter from the URL
  const [boardData, setBoardData] = useState(null); // State to hold board data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/bizz/board/detail/${bid}`);
        setBoardData(response.data); // Update state with fetched data
      } catch (error) {
        console.log('Error fetching data:', error);
        // Optionally handle error state or feedback to the user
      }
    };

    fetchBoardData(); // Call the async function on component mount
  }, [bid]); // Dependency array with bid ensures this effect runs when bid changes

  // If boardData is null, return loading or handle the case where data is not yet available
  if (!boardData) {
    return <div>Loading...</div>;
  }

  // Function to handle "수정" button click
  const handleBoardUpdate = async () => {
    try {
      // Navigate to update page with boardData
      navigate(`/update/${bid}`);
    } catch (error) {
      console.log('Error navigating to update page:', error);
      // Optionally handle error state or feedback to the user
    }
  };

  return (
    <div id="wrap">
      <section id="container" className="sub">
        <div id="contents">
          <div className="sub-title-area">
            <h2 className="tit">News & Info</h2>
          </div>
          <div className="write_title">
            {boardData.title} {/* Display the title */}
          </div>
          <div className="write_date">
            <span className="write_line"><strong>작성자 :</strong> {boardData.writer} </span>
            <span className="write_line"><strong>조회수 :</strong> {boardData.viewCount} </span>
            <span className="write_line">{boardData.regTime}</span>
            {/* Assuming there's a file link in boardData */}
            {boardData.files && <span><em className="file_icon"></em><a href="#"> {boardData.files}</a></span>}
          </div>
          <div className="con_box">
            {boardData.content}
          </div>
          <div className="btn_area">
            <a href="#" className="btn_blue" onClick={() => navigate('/list')}>목록</a>
            <button type="button" className="btn_blue" onClick={handleBoardUpdate}>수정</button>
            <button type="button" className="btn_blue">삭제</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default View;
