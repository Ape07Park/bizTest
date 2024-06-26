package com.example.bizzTest.controller;

import java.util.List; 

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.example.bizzTest.entity.Board;
import com.example.bizzTest.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController // 이건 Controller 꼭 필요한 기능
@RequestMapping("/board") // localhost:8090/ft/board 식으로 오게 하는것
@RequiredArgsConstructor // final을 사용하려면 필요
public class BoardController {
	private final BoardService boardService;

	 @PostMapping("/insert")
	    public String boardInsert(@RequestPart("board") Board board, @RequestPart("file") MultipartFile file) {
	        
	        Board boardData = Board.builder()
	                .title(board.getTitle())
	                .writer(board.getWriter())
	                .content(board.getContent())
	                .regTime(board.getRegTime())
	                .viewCount(board.getViewCount())
	                .files(file.getOriginalFilename()) // 파일명을 Board에 저장
	                .build();
	        
	        System.out.println(boardData);

	        boardService.insertBoard(boardData);
	        return "Success";
	    }

	@GetMapping("/list")
	public JSONArray list() {
		JSONArray jArr = new JSONArray();
		List<Board> list = boardService.getBoardList();
		if (list.isEmpty() == false) {
			for (Board board : list) {
				JSONObject jObj = new JSONObject();
				jObj.put("bid", board.getBid());
				jObj.put("title", board.getTitle());
				jObj.put("writer", board.getWriter());
				jObj.put("regTime", board.getRegTime());
				jObj.put("viewCount", board.getViewCount());
				jObj.put("files", board.getFiles());
				jArr.add(jObj);
			}
		}
		return jArr;
	}
	
	@GetMapping("/detail/{bid}")
	public JSONObject getBoardDetail(@PathVariable int bid) {
				boardService.increaseViewCount(bid);
				Board board = boardService.getBoardByBid(bid);
				
				
				JSONObject jObj = new JSONObject();
				jObj.put("bid", board.getBid());
				jObj.put("title", board.getTitle());
				jObj.put("writer", board.getWriter());
				jObj.put("content", board.getContent());
				jObj.put("regTime", board.getRegTime());
				jObj.put("viewCount", board.getViewCount());
				jObj.put("files", board.getFiles());					
				
				return jObj;
	}
		
	@GetMapping("/getUpdate/{bid}")
	public JSONObject getBoardUpdate(@PathVariable int bid) {		
		
		Board board = boardService.getBoardByBid(bid);
		
		JSONObject jObj = new JSONObject();
		jObj.put("bid", board.getBid());
		jObj.put("title", board.getTitle());
		jObj.put("writer", board.getWriter());
		jObj.put("content", board.getContent());
		jObj.put("regTime", board.getRegTime());
		jObj.put("viewCount", board.getViewCount());
		jObj.put("files", board.getFiles());					
		
		return jObj;
	}
	
	@PostMapping("/update")
    public String boardUpdate(@RequestPart("board") Board board, @RequestPart("file") MultipartFile file) {
        
        Board boardData = Board.builder()
        		.bid(board.getBid())
                .title(board.getTitle())
                .writer(board.getWriter())
                .content(board.getContent())
                .regTime(board.getRegTime())
                .viewCount(board.getViewCount())
                .files(file.getOriginalFilename()) // 파일명을 Board에 저장
                .build();
        
        System.out.println(boardData);

        boardService.updateBoard(boardData);
              
        return "Success";
    }
	
	
}

