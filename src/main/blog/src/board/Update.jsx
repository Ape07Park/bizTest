import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Function to insert or update board data
export async function BoardUpdate(boardData) {
  try {
    const response = await axios.post('/bizz/board/update', boardData, {
      headers: {
        'Content-Type': 'application/json', // Ensure the Content-Type is JSON
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error sending data:', error);
    throw error;
  }
}

// Function to upload image to Cloudinary
export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  
  try {
    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });
    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Function to fetch board data by bid
const fetchBoardDataById = async (bid) => {
  try {
    const response = await axios.get(`/bizz/board/${bid}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error;
  }
};

const Update = () => {
  const navigate = useNavigate();
  const { bid } = useParams(); // Get the bid from the URL
  const [board, setBoard] = useState(null); // State to hold board data
  const [title, setTitle] = useState(''); // State for title input
  const [writer, setWriter] = useState(''); // State for writer input
  const [content, setContent] = useState(''); // State for content textarea
  const [file, setFile] = useState(null); // State for file input
  const fileInput = useRef(null); // Ref for file input

  useEffect(() => {
    const getBoardData = async () => {
      try {
        const boardData = await fetchBoardDataById(bid);
        setBoard(boardData);
        setTitle(boardData.title || '');
        setWriter(boardData.writer || '');
        setContent(boardData.content || ''); // Ensure content is properly set here
      } catch (error) {
        console.log('Error fetching board data:', error);
        alert('Error fetching board data');
      }
    };
    getBoardData();
  }, [bid]);
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let imageUrl = board.imageUrl; // Initialize with existing imageUrl or empty string
      // If a new file is selected, upload it to Cloudinary
      if (file) {
        imageUrl = await uploadImage(file);
      }

      // Prepare updated boardData to send to backend
      const updatedBoardData = {
        bid: board.bid, // Assuming bid is needed for update
        title,
        writer,
        content,
        imageUrl,
      };

      // Call BoardInsert function to send data to backend
      await BoardUpdate(updatedBoardData);

      // Optionally reset the form fields and file input
      setTitle('');
      setWriter('');
      setContent('');
      setFile(null);
      if (fileInput.current) {
        fileInput.current.value = '';
      }

      // Navigate back to the list page after successful update
      navigate('/list');
    } catch (error) {
      console.log('Error updating board:', error);
      alert('Error updating board');
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div id="wrap">
      <section id="container" className="sub">
        <div id="contents">
          <div className="sub-title-area">
            <h2 className="tit">News & Info</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <table className="basic_write">
              <caption>News 입력</caption>
              <colgroup>
                <col style={{ width: '150px' }} />
                <col style={{ width: '*' }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>제목<span className="star">*</span></th>
                  <td>
                    <input
                      type="text"
                      title="제목"
                      className="add_txt"
                      placeholder="제목 *"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>작성자<span className="star">*</span></th>
                  <td>
                    <input
                      type="text"
                      title="작성자"
                      className="name_txt"
                      placeholder="작성자 *"
                      value={writer}
                      onChange={(e) => setWriter(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>첨부파일</th>
                  <td>
                    <input
                      type="file"
                      title="첨부파일"
                      className="name_txt"
                      ref={fileInput}
                      onChange={handleFileChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>내용 <span className="star">*</span></th>
                  <td>
                    <textarea
                      cols="30"
                      rows="10"
                      style={{ width: '100%' }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn_area">
              <button type="submit" className="btn_blue">확인</button>
              <a href="#" className="btn_blue_line" onClick={() => navigate('/list')}>취소</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Update;
