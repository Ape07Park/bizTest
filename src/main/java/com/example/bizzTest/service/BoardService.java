package com.example.bizzTest.service;

import java.util.List;

import com.example.bizzTest.entity.Board;

public interface BoardService {
	
	Board getBoardByBid(int bid);
	
	public List<Board> getBoardList();
	
	void insertBoard(Board board);  // 게시물 작성할 때 사용
	
	void updateBoard(Board board); // 게시물 수정할 때 사용
		
    public void increaseViewCount(int bid);
}
