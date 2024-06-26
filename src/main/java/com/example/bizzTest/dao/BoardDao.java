package com.example.bizzTest.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.bizzTest.entity.Board;

@Mapper
public interface BoardDao {
    // 1개 가져오기
    @Select("select * from board where bid=#{bid}")
    Board getBoardByBid(int bid);

    // 전체 가져오기
    @Select("SELECT * FROM board")
    List<Board> getBoardList();

    // 새 게시글 삽입
    @Insert("insert into Board values (default, #{title}, #{writer}, #{content}, default, default, #{files})")
    void insertBoard(Board board);

    // 게시글 업데이트
    @Update("update Board set title=#{title}, content=#{content}, files=#{files}, regtime=current_timestamp where bid=#{bid}")
    void updateBoard(Board board);
}
