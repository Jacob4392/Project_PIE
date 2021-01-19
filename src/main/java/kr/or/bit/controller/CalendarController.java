package kr.or.bit.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import kr.or.bit.dto.calendar;
import kr.or.bit.service.CalendarService;

@Controller
public class CalendarController {

	private CalendarService calendarservice;

	@Autowired
	public void setCalendarservice(CalendarService calendarservice) {
		this.calendarservice = calendarservice;
	}

	@RequestMapping(value = "fullcalendar.htm", method = RequestMethod.GET)
	public String home() {
		return "project/calendar_main";
	}

	@ResponseBody
	@RequestMapping(value = "calendarInsert.pie", method = RequestMethod.POST)
	public String calendarInsert(String start, String end, String title, String content, Boolean allDay,
			String color,int project_seq,int card_seq) {
		try {
			calendarservice.insertCalendar(start, end, title, content, allDay, color,project_seq,card_seq);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());
		}
			return "a";
	}
	
	@ResponseBody
	@RequestMapping(value = "calendarUpdate.pie", method = RequestMethod.POST)
	public String calendarUpdate(String start, String end, String title, String content, boolean allDay,
			String color,String id) {
		try {
			calendarservice.calendarUpdate(start, end, title, content,allDay,color, id);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());
		}
		return "a";

	}

	@ResponseBody
	@RequestMapping(value = "calendarList.pie", method = RequestMethod.GET)
	public List<calendar> calendarList(int project_seq) {
		List<calendar> calendarList = null;
		try {
			calendarList = calendarservice.calendarList(project_seq);

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());

		}
		return calendarList;
	}
	
	@ResponseBody
	@RequestMapping(value = "calendarListKanban.pie", method = RequestMethod.GET)
	public List<calendar> calendarListKanban(String email,int project_seq) {
		List<calendar> calendarListKanban = null;
		try {
			calendarListKanban = calendarservice.calendarListKanban(email,project_seq);

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());

		}
		return calendarListKanban;
	}
	
	@ResponseBody
	@RequestMapping(value = "calendarListKanbanDetail.pie", method = RequestMethod.GET)
	public calendar calendarListKanbanDetail(int card_seq) {
		calendar calendarListKanbanDetail = null;
		try {
			calendarListKanbanDetail = calendarservice.calendarListKanbanDetail(card_seq);

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());

		}
		return calendarListKanbanDetail;
	}
	
	@ResponseBody
	@RequestMapping(value = "calendarEdit.pie", method = RequestMethod.POST)
	public void calendarEdit(String start, String end, String id) {
		try {
			SimpleDateFormat org_format = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss", Locale.ENGLISH);
			SimpleDateFormat new_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startformat = org_format.parse(start);
			Date endformat = org_format.parse(end);
			start = new_format.format(startformat);
			end = new_format.format(endformat);

			calendarservice.calendarEdit(start, end, id);
			;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	@ResponseBody
	@RequestMapping(value = "calendarDelete.pie", method = RequestMethod.POST)
	public void calendarDelete(int id) {
		try {
			calendarservice.calendarDelete(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}

	}
	@ResponseBody
	@RequestMapping(value = "calendarDeleteKanban.pie", method = RequestMethod.POST)
	public void calendarDeleteKanban(int card_seq) {
		try {
			calendarservice.calendarDeleteKandan(card_seq);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}

	}

}
