package kr.or.bit.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CardDao;
import kr.or.bit.dao.ListDao;
import kr.or.bit.dto.card;
import kr.or.bit.dto.list;

@Service
public class KanbanService {

	@Autowired
	private SqlSession sqlsession;
	

	//칸반 리스트 업데이트 (한개씩)
	public boolean updateKanbanList(HashMap<String,Object> listAndProjectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		listdao.updateKanbanList(listAndProjectNum);
		return true;
	}
	
	//전체 카드 업데이트 (한개씩)
	public boolean updateWholeCard(HashMap<String,Object> cardAndProjectNum) {
		CardDao carddao  = sqlsession.getMapper(CardDao.class);
		carddao.updateWholeCard(cardAndProjectNum);
		return true;
	}
	
	//전체 카드 리턴 
	public ArrayList<card> loadWholeCard(int projectNum) {
		CardDao carddao  = sqlsession.getMapper(CardDao.class);
		ArrayList<card> cardlist = new ArrayList<>();
		cardlist = carddao.loadWholeCard(projectNum);
		return cardlist;
	}

	//전체 리스트 리턴 
	public ArrayList<list> loadWholeList(int projectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		ArrayList<list> listList = new ArrayList<>();
		listList = listdao.loadWholeList(projectNum);
		return listList;
	}
}
