package kr.or.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.notice;
import kr.or.bit.service.NoticeService;
@Controller
public class NoticeController {
	@Autowired
	private View jsonview;
	@Autowired
	private NoticeService noticeservice;
	
	@RequestMapping(value="noticeInsert.pie", method = RequestMethod.POST)
	public View noticeInsert(@RequestBody notice notice, Model model) {
		try {
			noticeservice.insertNotice(notice);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
	}
	@ResponseBody
	@RequestMapping(value="noticeList.pie", method = RequestMethod.GET)
	public List<notice> noticeList(int project_seq){
		List<notice> noticeList = null;
		try {
			noticeList = noticeservice.getNoticeList(project_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return noticeList;
	}
	@ResponseBody
	@RequestMapping(value="noticeDetail.pie", method = RequestMethod.GET)
	public notice noticeDatail(int notice_seq){
		notice noticeDetail = null;
		try {
			noticeDetail = noticeservice.getNoticeDatail(notice_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return noticeDetail;
	}
	@ResponseBody
	@RequestMapping(value="lastNotice_seq.pie", method = RequestMethod.GET)
	public int lastNotice_seq(){
		int lastNotice_seq = 0;
		try {
			lastNotice_seq = noticeservice.lastNotice_seq();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lastNotice_seq;
	}
}