package com.example.bizzTest.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.bizzTest.entity.Board;

import ch.qos.logback.core.net.SyslogOutputStream;

@Mapper
public interface BoardDao {
    // 1개 가져오기
    @Select("select * from board where bid=#{bid}")
    Board getBoardByBid(int bid);

    // 전체 가져오기
    @Select("SELECT * FROM board")
    List<Board> getBoardList();

    // 새 게시글 삽입
    @Insert("insert into board values (default, #{title}, #{writer}, #{content}, default, default, #{files})")
    void insertBoard(Board board);

    @Update("update board set title=#{title}, content=#{content}, viewcount=#{viewCount}, files=#{files} where bid=#{bid}")
    void updateBoard(Board board);
    
    @Update("update board set viewcount = viewcount + 1 where bid = #{bid}")
    void increaseViewCount(int bid);
  
}
