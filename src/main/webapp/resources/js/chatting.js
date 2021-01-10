/**
 * chat.jsp 웹소켓
 */

$(document).ready(function() {
	//웹소켓 연결
	connect();
	
	var rootRef = firebase.database().ref();
	
	//전송 버튼 CSS 조절 + Enter 키 입력
	$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
	$('#message').keyup( (event) => {
		//Enter 키 입력
		if (event.which == 13) {
			send();
			event.preventDefault();
		}
		//전송버튼 CSS 조절
		if($('#message').val() == ''){
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
		}else if($('#message').val() != ''){
			$('.chat-msgWrite-btn-not').attr('class','chat-msgWrite-btn');
		}
	});
	

	
	//처음 입장시 메시지 입력창 CSS 색 입히기
	$('#message').focus();
	if($('#message').is(':focus')){
		$('.chat-msgWrite-wrapper').css("border","2px solid #f2dd68");
	}
	
	//입력창 클릭시 메시지 입력상태 ON
	$('.chat-msgWrite-wrapper').click( () => {
		$('#message').focus();
		$('.chat-msgWrite-wrapper').css("border","2px solid #f2dd68");
	});
	//입력창 외에 다른 곳 클릭시 입력상태 OFF
	$('#message').focusout( () => {
		$('.chat-body-wrapper, .chat-top-wrapper').click( () => {
			$('.chat-msgWrite-wrapper').css("border","2px solid #999999");
		});
	});
	
	//전송 버튼을 눌렀을 때
	$('#sendBtn').click( (event) => {
		//버튼이 활성화 되어 있는 상태이면 메시지를 보낸다
		if($('#chat-msgWrite-btn').attr('class') == 'chat-msgWrite-btn'){
			send();
			$('#message').focus();
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
			event.preventDefault();
			
		//버튼이 활성화 되어 있지 않으면 입력상태 ON
		}else{
			$('#message').focus();
		}
	});

	
	/*
	$('#exitBtn').click(function() {
		disconnect();
		window.close();
	})
	*/
});

var websocket;


function connect(){
	websocket = new WebSocket(
		"ws://localhost:8090/websocket/chat/websocket?select="+$('#select').val()+"&roomname="+$('#roomname').val());
	websocket.onopen = onOpen;
	websocket.onmessage = onMessage;
	websocket.onclose = onClose;
	console.log($('#select').val());
	console.log($('#roomname').val());
}

function disconnect(){
	websocket.close();
}

function onOpen(evt){
	
	//최초 메시지 0번을 생성함
	firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages/0').set({
		chatting_room_seq : $('#select').val(),
		message_seq : 0
	});

	
	//SELECT * FROM Users WHERE UID = 1; 
	/*
	firebase.database().ref().child('chatting_room_seq').child('1').once('value',function(data){
	console.log('1번:',data.val());
	})
	/*
	//SELECT * FROM Users WHERE name= 'Backho Kang'; 
	firebase.database().ref('users').orderByChild('name').equalTo('Backho Kang').once('value',function(data){
	console.log('2번:',data.val());
	})

	//SELECT * FROM Users LIMIT 3 ; 
	rootRef.child('users').limitToFirst(3).once('value', function(data){
	    console.log('3번 :' , data.val());
	});

	//SELECT * FROM Users WHERE email LIKE 'S%' ; 
	rootRef.child('users').orderByChild('email').startAt('S').endAt('S\uf8ff').once('value', function(data){
	    console.log('4번 :' , data.val());
	});
	*/
	
}

function onMessage(evt){
	var data = evt.data;
	appendMessage(data);
}

function onClose(evt){
	
}

function send(){
	let email = $('#session_email').val();
	let nickname = $('#nickname').val();
	var msg = $('#message').val();
	$('#message').val('');
	if(msg.trim() != ''){
		websocket.send(email + "|" + msg + "|" + nickname);
	}
	
}

function appendMessage(msg) {
	
	$.ajax(
		{
			type 		: "GET",
			url  		: "users?select="+$('#select').val(),
			error		: function(request,status,error){
				alert(error);
			},
			success 	: function(data){
				console.log(data);

				let myemail = $('#session_email').val();
				let mynickname = $('#nickname').val();
				var strarray = msg.split('|');
			
				var msginfo = strarray[0];
				console.log(">"+msginfo+"<")
				var message = strarray[1];
				var msgbox ='';
				if (msginfo == myemail) {
					//현재 시간 구하기
					let today = new Date();
					let date_index = today.toLocaleTimeString().lastIndexOf(':');
					let date = today.toLocaleTimeString().substr(0,date_index);
					
					msgbox = 	"<div class='chat-receiver-wrapper'>"+
									"<div class='chat-receiver-pic'>"+
										"<i class='fas fa-user'></i>"+
									"</div>"+
									"<div>"+
										"<div class='chat-receiver-name'>"+
											mynickname+
										"</div>"+
										"<div class='chat-receiver-message-wrapper'>"+
											"<div id='chatMessageArea' class='chat-receiver-message'>"+
												message+
											"</div>"+
											"<div class='chat-receiver-time'>"+
												date+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>";
								
							//SELECT chatting_room_seq
							firebase.database().ref().child('chatting_room_seq').once('value',function(data){
								//message_seq 추출
								let message_seq = Object.keys(data.val()[$('#select').val()].messages).length;
								
								//INSERT message
								firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages/'+message_seq).set({
									chatting_room_seq : $('#select').val(),
									message_seq : message_seq,
									message_content : message,
									message_date : date,
									message_file : null,
									email : $('#session_email').val(),
									nickName : $('#nickname').val(),
									profile : null,
									my_room_name : $('#roomname').val()
								});
							})
							
				}else if(msginfo == "알림"){
					console.log("알림에 걸림");
					msgbox += 	"<div class='chat-body-date'>"+
									"<div class='chat-body-date-line'>"+
										"―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
									"</div>"+
									"<div class='chat-body-date-letter'>"+
										message+
									"</div>"+
									"<div class='chat-body-date-line'>"+
										"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
									"</div>"+
								"</div>";
								
				}else {
					$.each(data,function(index,elem){
						console.log(elem.nickName);
						let today = new Date();
						if(msginfo == elem.email){
							//현재 시간 구하기
							let today = new Date();
							let date_index = today.toLocaleTimeString().lastIndexOf(':');
							let date = today.toLocaleTimeString().substr(0,date_index);
							
							msgbox = 	"<div class='chat-sender-wrapper'>"+
											"<div class='chat-sender-pic'>"+
												"<i class='fas fa-user'></i>"+
											"</div>"+
											"<div>"+
												"<div class='chat-sender-name'>"+
													elem.nickName+
												"</div>"+
												"<div class='chat-sender-message-wrapper'>"+
													"<div id='chatMessageArea' class='chat-sender-message'>"+
														message+
													"</div>"+
													"<div class='chat-sender-time'>"+
														date+
													"</div>"+
												"</div>"+
											"</div>"+
										"</div>";
										
						}//if
					});//each

				}
				$("#chatMessageArea").append(msgbox);
				var chatAreaHeight = $("#chatArea").height();
				var maxScroll = $("#chatMessageArea").height() - chatAreaHeight;
				$("#chatMessageArea").scrollTop($("#chatMessageArea")[0].scrollHeight);
			}
		}
	);
	
	
}