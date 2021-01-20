package kr.or.bit.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.noticeComments;
import kr.or.bit.service.NoticeCommentsService;

@Controller
public class NoticeCommentsController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private NoticeCommentsService noticecommentsservice;
	
	//댓글 등록
	@ResponseBody
	@RequestMapping(value = "insertNoticeComments.pie", method = RequestMethod.POST)
	public View insertNoticeComments(@RequestBody noticeComments noticecomments, Model model) {
		noticecommentsservice.insertNoticeComments(noticecomments);
		model.addAttribute("comments", noticecomments);
		return jsonview;
	}
	
	//댓글 로드
	@ResponseBody
	@RequestMapping(value = "loadNoticeComments.pie", method = RequestMethod.POST)
	public View loadNoticeComments(@RequestParam("notice_seq") int notice_seq, Model model) {
		ArrayList<noticeComments> commentsList = noticecommentsservice.loadNoticeComments(notice_seq);
		for(int i = 0; i < commentsList.size(); i++ ) {
			commentsList.get(i).setNotice_seq(notice_seq);
		}
		System.out.println(notice_seq);
		model.addAttribute("commList", commentsList);
		return jsonview;	
	}
	//댓글 삭제
	@ResponseBody
	@RequestMapping(value = "deleteNoticeComments.pie", method = RequestMethod.POST)
	public View deleteNoticeComments(@RequestParam("comments_seq") int comments_seq, Model model) {
		noticecommentsservice.deleteNoticeComments(comments_seq);
		model.addAttribute("data", "success");
		return jsonview;
	}
	//댓글 수정
	@ResponseBody
	@RequestMapping(value = "updateNoticeComment.pie", method = RequestMethod.POST)
	public View updateNoticeComments(@RequestBody noticeComments noticecomments, Model model) {
		noticecommentsservice.updateNoticeComments(noticecomments);
		model.addAttribute("data", "success");
		return jsonview;
	}
}
