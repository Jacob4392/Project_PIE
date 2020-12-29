<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>칸반보드</title>
<link rel="stylesheet" href="resources/css/drag.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
	$(function() {
		//페이지 입장시 프로젝트 번호 뽑아오는 함수 필요 
		
		loadKanban(1);//**********************
		
		console.log("created");
		
			let lastNum = Number($("#allAround").children().last().attr("id"));//오른쪽 끝에 있는 리스트의 id 값 (제일 마지막 리스트 id 값)

			$("#createBtn").click(function(){//create 버튼 
			$("#allAround").append("<div class = 'sortable all' id="+(lastNum+1)+">"+//새로운 리스트 추가 
								   "<div class = 'mini' id="+(lastNum+1)+"-1>"+(lastNum+1)+"-1</div>"+
								   "<div class = 'mini' id="+(lastNum+1)+"-2>"+(lastNum+1)+"-2</div>"+
								   "<div class = 'mini' id="+(lastNum+1)+"-3>"+(lastNum+1)+"-3</div>"+
								   "</div>");
			miniSortable();//새로운 리스트 만들어주고 sortable 활성화 
			lastNum = lastNum+1;
			console.log("리스트의 마지막 값 : "+lastNum);
			});
		
		function allSortable(){//리스트 단위 sortable 
			console.log("all sortable");
			$("#allAround").sortable({
				start : function(event, ui) {	//드래그 시작시 동작하는 함수 
					$(this).attr('data-previndex', ui.item.index()+1);
				},
		 		update: function(event, ui) {//드래그로 위치 변경이 생겼을 시 동작하는 함수 
				    let newIndex = ui.item.index()+1; 
				    let oldIndex = $(this).attr('data-previndex'); 
				    let old_id = ui.item.attr('id'); 
			        $(this).removeAttr('data-previndex');

					//리스트의 위치변경이 생겼을 시 모든 리스트의 id를 새로 부여  
					
					//1. 리스트가 이동후 왼쪽에 다른 리스트가 없을 시 (맨 왼쪽으로 이동)
					if(newIndex===1){
						console.log("맨 왼쪽으로 이동"); 
						firstItem = ui.item;//맨 왼쪽으로 이동한 요소 
						firstItem.attr('id',1);//맨 왼쪽으로 이동한 요소의 id를 1로 할당 
						for(let i = 2; i < lastNum+1; i++){//for문 돌면서 다음 형제 요소들을 1씩 크게 할당 
							firstItem.next().attr("id", i);
							firstItem = firstItem.next();
						} 
					}
					
					//2. 리스트가 이동후 오른쪽에 다른 리스트가 없을 시
					if(newIndex===lastNum){
						console.log("맨 오른쪽으로 이동");
						lastItem = ui.item;//맨 오른쪽으로 이동한 요소 
						lastItem.attr("id", lastNum);//맨 오른쪽으로 이동한 요소에 id를 리스트의 마지막 번호로 할당 
						for(let i = lastNum-1; i > 0; i--){//for문 돌면서 이전 형제 요소들을 1씩 작게 할당
							lastItem.prev().attr("id", i);
							lastItem = lastItem.prev();
							}
					}
					
					//3. 리스트가 리스트 사이(중간)로 가는 경우
					if(newIndex!=1 && newIndex!=lastNum){
						console.log("중간으로 이동");

						//3.1 리스트가 리스트 사이로 이동하면서 왼쪽 요소는 그대로 있는 경우  
						if(Number(ui.item.attr("id")) < Number(ui.item.next().attr("id"))){
							console.log("움직인 요소가 오른쪽 요소보다 작을 경우 ");
							let movedItem = ui.item;//중간으로 이동한 요소 
							let nextNum = Number(movedItem.next().attr("id"));//다음 요소의 숫자 
							movedItem.attr("id", nextNum-1);
							for(let i = nextNum-2; i > 0; i--){//for문 돌면서 움직인 요소의 이전 숫자를 1씩 작게 함 
								movedItem.prev().attr("id", i);
								movedItem = movedItem.prev();
							}
						}
						
						//3.2 리스트가 리스트 사이로 이동하면서 오른쪽 요소는 그대로 있는 경우 
						if(Number(ui.item.attr("id")) > Number(ui.item.next().attr("id"))){
							console.log("움직인 요소가 오른쪽 요소보다 큰 경우 ");
							let movedItem = ui.item;//중간으로 이동한 요소 
							let prevNum = Number(movedItem.prev().attr("id"));//이전 요소의 숫자 
							movedItem.attr("id", prevNum+1);
							for(let i = prevNum+2; i <= lastNum; i++){//for문 돌면서 움직인 요소의 다음 숫자를 1씩 크게 할 
								movedItem.next().attr("id", i);
								movedItem = movedItem.next();
							}
						}
							}
					
					cardIndexing(); //리스트의 위치의 변화가 생기고 모든 카드의 id를 재할당하는 역할
					updateKanban(1); //********************** //컨트롤러에게 칸반 객체 전달 & 파라미터는 프로젝트 번호 
				    },
			});
			}
		
		let new_list_id = null;//업데이트 시 새로운 리스트 id 값 
		let old_list_id = null;//업데이트 시 전 리스트 id 값 
		let new_list = null;//새로운 리스트 객체 
		
		function miniSortable(){//카드 단위 sortable 
			console.log("mini sortable");
			$(".sortable").sortable({
				connectWith : ".sortable",//해당 셀렉터의 요소와 드래그를 가능하게 공유하겠다.  
				start : function(event, ui) {//드래그 시작시 동작하는 함수 
					$(this).attr('data-previndex', ui.item.index()+1);//드래그 시작시 선택한 요소의 인덱스 값을 'data-previndex'으로 지정 
					old_list_id = $(this).attr('id');//드래그 시작시 선택한 요소의 리스트의 id 
				},
				update : function (event, ui){//드래그로 위치 변경이 생겼을 시 동작하는 함수 
					new_list_id = event.target.id;//드래그로 새로 위치하게 된 리스트의 id 	
					new_list = event.target;//새로 위치하게 된 리스트 객체 		
				},
				stop : function(event, ui) {//드래그 종료시 동작하는 함수 
				    let newIndex = ui.item.index()+1;//새로운 위치의 인덱스 
				    let oldIndex = $(this).attr('data-previndex');//전 위치의 인덱스 
			        let old_item_id = ui.item.attr('id');//전 위치의 아이디 
			        $(this).removeAttr('data-previndex');//요소 초기화(삭제)

					//움직인 카드의 요소의 개수를 알아내서 인덱싱하는 역할 
					let newListIndex = 1;
					$(new_list).children().each( function(){
						$(this).attr("id", new_list_id+"-"+newListIndex);	
						newListIndex++;
					});

					//빠진 부분 카드의 요소의 개수를 알아내서 인덱싱하는 역할
					let oldListIndex = 1;
			    	$(event.target).children().each( function(){
			    		$(this).attr("id", old_list_id+"-"+oldListIndex);
			    		oldListIndex++;	
					});
					console.log("db insert");
					updateKanban(1);//********************** //컨트롤러에게 칸반 객체 전달 & 파라미터는 프로젝트 번호 
				},
			});
			$(".sortable").disableSelection();//텍스트가 드래그 되는 것을 방지하는 함수 
		}

	//페이지 입장시 모든 요소에 sortable 부여 	
	allSortable();
	miniSortable();

	//카드의 인덱싱을 해주는 함수 
	function cardIndexing(){
		for(let i = 1; i <= lastNum; i++){//첫번째 카드 리스트부터 마지막 리스트까지 
			let newCardIndex = 1;
				$("#"+i.toString()).children().each( function(){//카드의 id를 재할당해줌 

					//if card title 이면 통과 
					
					$(this).attr("id", i+"-"+newCardIndex);	
					newCardIndex++;
				});
			}
		}

	//리스트와 카드의 정보를 JSON 형태로 리턴하는 함수 
	function listUp(){
			let kanban = new Object();//모든 리스트와 카드를 담을 오브젝트 
			let listList = new Array();//각각의 리스트객체를 담을 리스트array 
			for(let i = 1; i <= lastNum; i++){//첫번째 카드 리스트부터 마지막 리스트까지 
				let list = new Object();//하나의 리스트의 정보를 담을 리스트 객체 
				list.list_order_num = Number($("#"+i.toString()).attr("id"));//리스트의 순서 번호 
				list.list_seq = Number($("#"+i.toString()).attr("data-list-seq"));//리스트의 고유 번호 

				//여기서 리스트의 다른 항목들 추가되면 추가 
				//ex) list.listTitle = ...
				//ex) list.listDate = ... 
				
				let cardList = new Array();//각각의 카드객체를 담을 카드 array 
				
					$("#"+i.toString()).children().each(function(){//하나의 리스트 안에서 카드의 갯수만큼 for문을 거침 
					let card = new Object();//하나의 카드의 정보를 담을 카드 객체 
					card.card_order_num = $(this).attr("id"); //카드의 순서 번호  
					card.card_name = $(this).text();//카드의 제목 
					card.card_seq = Number($(this).attr("data-card-seq"));//카드의 고유 번호

					//여기서 카드의 다른 항목을 추가되면 추가 
					//ex) card.cardTitle = ...
					//ex) card.cardMember = ... 
					
					cardList.push(card);//카드 하나 하나를 카드리스트 배열에 담아준다.
					});
					
					list.cardList = cardList;//하나의 리스트에 여러개의 카드가 담긴 카드리스트(array)를 담아준다. 
					listList.push(list);//하나의 리스트 객체를 리스트array에 담아준다. 
				}
			kanban.kanban = listList;
			return kanban;
		}

	//칸반 리스트와 카드를 객체화 하여 컨트롤러에게 전달하는 함수
	function updateKanban(projectNum){

		let wholeList = listUp();//모든 리스트와 카드 정보를 리턴하는 함수
		let kanbanJson = JSON.stringify(wholeList);//자바 컨트롤러가 받을 수 있는 형태로 바꿈 
		
		  //칸반 객체를 컨트롤러에게 보내는 ajax 
		  $.ajax(
					 {  
						type : "post",
						url  : "updateKanban.do?projectNum="+projectNum,
						contentType: "application/json; charset=UTF-8",
						dataType : "json",
						async : false,
						data : kanbanJson,
						success : function(data){
							console.log(data.success);
							console.log(wholeList);
						}
					 } 
			       )  
		}

	//리스트 태그를 만들고 리턴해주는 함수 
 	function makeList(list_order_num, data_list_seq){
		let listTag = "<div class = 'sortable all' id ='"+list_order_num+"' data-list-seq ='"+data_list_seq+"'>";
		return listTag;
		}  

	//카드 태그를 만들고 리턴해주는 함수 	
 	function makeCard(card_order_num, card_seq, card_name){
		let cardTag = "<div class = 'mini' id ='"+card_order_num+"' data-card-seq ='"+card_seq+"'>"+card_name+"</div>";
		return cardTag;
		}  
	

	//칸반 페이지 입장시 해당 프로젝트의 번호로 칸반 리스트를 로드하는 함수 
	function loadKanban(projectNum){
		  $.ajax(
					 {  
						type : "post",
						url  : "loadKanban.do?projectNum="+projectNum,
						contentType: "application/json; charset=UTF-8",
						dataType : "json",
						async : false,//필수 안 해주면 순서 보장이 안 됨 
						success : function(data){
							let kanban = data.listList;
							$.each(kanban, function(index, item){
								let listTag = makeList(item.list_order_num, item.list_seq);//리스트 생성 
						 		$.each(kanban[index].cardList, function(cardIndex, item){
									let cardTag = makeCard(item.card_order_num, item.card_seq, item.card_name);
									listTag += cardTag;//해당 리스트에 카드 추가 
								}); 
								listTag += "</div>";
								$("#allAround").append(listTag); //리스트 한개 페이지에 추가 
							}); 
						}
					 } 
			       ) 
		}
	console.log("요소의 마지막 번호 : "+lastNum);
	});

	
/*
 - 리스트의 id = 리스트의 순서 번호 
 - 리스트의 data-list-seq = 리스트의 고유 번호 
 - 카드의 id = 카드의 순서 번호 
 - 카드의 data-card-seq= 카드의 고유 번호 

 
 -추가로 필요한 기능 

 *모두 프로젝트 넘버 고려* 
 1. 리스트 수정 (이름) 해당 리스트 seq만 수정 하면 됨 
 2. 리스트 삭제 해당 리스트의 seq로 삭제하고 카드도 삭제 트랜잭션 처리 + lastNum - 1 >> 리스트 인덱싱 >> 카드 인덱싱 ******
 3. 리스트 추가 추가된 리스트 seq만들고 lastNum +1 해주고 insert 맨 오른쪽에서 생기기 때문에 정렬은 필요없음
 4. 카드 수정 (이름) 해당 카드 seq만 수정 하면 됨 
 5. 카드 삭제 >> 해당 seq로 카드 삭제하고 삭제된 곳의 카드 리스트만 인덱싱 해주고 update  
 6. 카드 추가 >> 해당 리스트의 +1씩 해서 카드를 만들어주고 insert 만 하면 됨 
 7. 카드 선택(클릭) >> 해당 seq로 요청 
 
 */
 
</script>
</head>
<body>
	<div id="allAround">
	
	<div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	
	</div>
	<div id="create">
		<input type="button" id="createBtn" value="create">
	</div>
	
</body>
</html>