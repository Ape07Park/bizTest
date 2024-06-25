package com.example.bizzTest.entity;


import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Board {
	private int bid;
	private String title;
	private String writer;
	private String content;
	private LocalDateTime regTime;
	private int viewCount;
	private String files;

}
