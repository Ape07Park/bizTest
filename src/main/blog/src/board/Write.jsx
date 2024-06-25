import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export async function BoardInsert(boardData) {
  try {
    const response = await axios.post('/bizz/board/insert', boardData, {
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

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  
  const move = () => {
    navigate('/list');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      let imageUrl = ''; // Variable to hold the Cloudinary image URL
      
      // If a file is selected, upload it to Cloudinary
      if (file) {
        imageUrl = await uploadImage(file);
      }
      
      // Prepare boardData to be sent to backend
      const boardData = {
        title,
        writer,
        content,
        imageUrl, // Add Cloudinary image URL to boardData
      };

      // Call BoardInsert function to send data to backend
      const response = await BoardInsert(boardData);
      
      // Handle response if needed
      alert('글 등록완료');
      
      // Optionally, reset the form fields
      setTitle('');
      setWriter('');
      setContent('');
      setFile(null);
      if (fileInput.current) {
        fileInput.current.value = '';
      }

      // Navigate to the list page
      move();
    } catch (error) {
      console.log('Error sending data:', error);
      alert('Error sending data');
    }
  };
  
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
                      title="성명"
                      className="name_txt"
                      placeholder="성명 *"
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
              <a href="#" className="btn_blue_line">취소</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Write;
