package com.example.bizzTest.service;

import java.util.List;

import javax.swing.plaf.synth.SynthOptionPaneUI;

import org.springframework.stereotype.Service;

import com.example.bizzTest.dao.BoardDao;
import com.example.bizzTest.entity.Board;

import ch.qos.logback.core.util.SystemInfo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor   // 서비스처럼 사용 가능
public class BoardServiceImpl implements BoardService {
	private final BoardDao boardDao;

	@Override
	public Board getBoardByBid(int bid) {
		
		return boardDao.getBoardByBid(bid);
	}

	@Override
	public List<Board> getBoardList() {
        
        return boardDao.getBoardList();
    }

	@Override
	public void insertBoard(Board board) {
		boardDao.insertBoard(board);
		
	}

	@Override
	public void updateBoard(Board board) {
		System.out.println(board);
		boardDao.updateBoard(board);
	}

	@Override
	public void increaseViewCount(int bid) {
		 boardDao.increaseViewCount(bid);
		
	}
}
