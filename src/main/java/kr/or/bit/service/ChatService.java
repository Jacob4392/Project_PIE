package kr.or.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.ChatDao;
import kr.or.bit.dto.room;
import kr.or.bit.dto.roomlist;
import kr.or.bit.dto.user;

@Service
public class ChatService {
	
	@Autowired
	private SqlSession sqlsession;

	public List<user> chatUserList(Map<String, Object> chatUserListMap){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.chatUserList(chatUserListMap);
	}

	public List<user> chatUserListByEmail(String[] user_array){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.chatUserListByEmail(user_array);
	}
	
	public List<String> chatUserEmailListByEmailByOrder(String[] user_array){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.chatUserEmailListByEmailByOrder(user_array);
	}
	
	public List<user> selectedUserClose(Map<String, Object> map){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.selectedUserClose(map);
	}
	
	public void insertChattingRoom(String chatting_room_name, int projectNum){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.insertChattingRoom(chatting_room_name, projectNum);
	}
	
	public room getChattingRoomByName(String chatting_room_name){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getChattingRoomByName(chatting_room_name);
	}
	
	public void insertChattingRoomList(Map<String, Object> map){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.insertChattingRoomList(map);
	}
	
	public List<room> getRoomList(Map<String, Object> getRoomListMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getRoomList(getRoomListMap);
	}
	
	public List<room> getRoomList2(Map<String, Object> getRoomListMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getRoomList2(getRoomListMap);
	}
	
	public room getRoomListBySeq(int room_seq) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getRoomListBySeq(room_seq);
	}
	
	public List<user> selectedUser(Map<String, Object> selectUserMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.selectedUser(selectUserMap);
	}
	
	public List<user> searchUser(Map<String, Object> searchUserMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.searchUser(searchUserMap);
	}
	
	public List<user> searchAnotherUser(Map<String, Object> map) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.searchAnotherUser(map);
	}
	
	public void hideRoom(Map<String, Object> hideRoomMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.hideRoom(hideRoomMap);
	}
	
	public void unhideRoom(Map<String, Object> unhideRoomMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.unhideRoom(unhideRoomMap);
	}
	
	public void updateRoom(Map<String, Object> updateMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.updateRoom(updateMap);
	}
	
	public List<room> searchRoom(Map<String, Object> searchRoomMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.searchRoom(searchRoomMap);
	}
	
	public List<room> getRoomListByProjectSeq(int projectNum) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getRoomListByProjectSeq(projectNum);
	}
	
	public List<String> getChattingRoomList(Map<String, Object> chattingRoomListMap) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getChattingRoomList(chattingRoomListMap);
	}
	
	public List<roomlist> getChattingRoomUserListByRoomSeq(int chatting_room_seq) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getChattingRoomUserListByRoomSeq(chatting_room_seq);
	}
	
	public void logonUser(String loginuser) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.logonUser(loginuser);
	}
	
	public void logoutUser(String loginuser) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.logoutUser(loginuser);
	}
	
	public List<user> logonUserCheck(String[] session_data) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.logonUserCheck(session_data);
	}
	
}