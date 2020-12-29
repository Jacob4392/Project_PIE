package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.HashMap;

import kr.or.bit.dto.card;

public interface CardDao {
	
	public void updateWholeCard(HashMap<String,Object> cardAndProjectNum);
	
	public ArrayList<card> loadWholeCard(int projectNum);

}
