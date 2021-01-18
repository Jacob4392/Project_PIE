/**
 * chat.jsp 웹소켓
 */

$(document).ready(function() {
	//웹소켓 연결
	connect();
	
	$.ajax({
			type : "GET",
			url  : "profile",
			data : { 'chatting_room_seq' : $('#select').val()},
			async: false,
			success : function(data){
				console.log(data);
				$('.chat-top-pic').empty();
				let opr = '';
				if(data.length > 3){
					if(data[0].profile != null){
						opr+=	"<img class='chat-top-img-1-1' src='/resources/profile/"+data[0].email+"_"+data[0].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-1-1' src='/resources/img/icon/none.png'>";
					}
					if(data[1].profile != null){
						opr+=	"<img class='chat-top-img-1-2' src='/resources/profile/"+data[1].email+"_"+data[1].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-1-2' src='/resources/img/icon/none.png'>";
					}
					if(data[2].profile != null){
						opr+=	"<img class='chat-top-img-1-3' src='/resources/profile/"+data[2].email+"_"+data[2].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-1-3' src='/resources/img/icon/none.png'>";
					}
					if(data[3].profile != null){
						opr+=	"<img class='chat-top-img-1-4' src='/resources/profile/"+data[3].email+"_"+data[3].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-1-4' src='/resources/img/icon/none.png'>";
					}
					
				}else if(data.length == 3){
					if(data[0].profile != null){
						opr+=	"<img class='chat-top-img-2-1' src='/resources/profile/"+data[0].email+"_"+data[0].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-2-1' src='/resources/img/icon/none.png'>";
					}
					if(data[1].profile != null){
						opr+=	"<img class='chat-top-img-2-2' src='/resources/profile/"+data[1].email+"_"+data[1].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-2-2' src='/resources/img/icon/none.png'>";
					}
					if(data[2].profile != null){
						opr+=	"<img class='chat-top-img-2-3' src='/resources/profile/"+data[2].email+"_"+data[2].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-2-3' src='/resources/img/icon/none.png'>";
					}
															
				}else if(data.length == 2){
					if(data[0].profile != null){
						opr+=	"<img class='chat-top-img-3-1' src='/resources/profile/"+data[0].email+"_"+data[0].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-3-1' src='/resources/img/icon/none.png'>";
					}
					if(data[1].profile != null){
						opr+=	"<img class='chat-top-img-3-2' src='/resources/profile/"+data[1].email+"_"+data[1].profile+"'>";
					}else{
						opr+=	"<img class='chat-top-img-3-2' src='/resources/img/icon/none.png'>";
					}										
				}
						
				$('.chat-top-pic').append(opr);
				
			},
			error: function(request,status,error){
				alert(error);
			}
		});
	
	
	//Enter 키 입력
	$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
	$('#message').keypress( (event) => {
		//Enter 키 입력 시
		if (event.which == 13) {
			
			let filename = $('#file-input').val();
			console.log('filename');
			console.log(filename);
			if(filename != null && filename != ''){
				sendFiles(filename);
			}else{
				send();
			}
			$('#message').focus(); 
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
			
			$('#img_zone').css('display','none');
			$('#message').attr('readonly',false);
			$('#message').attr('placeholder','메시지를 입력하세요');
			$('#img_zone').attr('src', '/resources/img/icon/none.png');
			$('.emoji-content').removeClass('disappear2');
			$('.emoji-content').addClass('disappear');
			$('#file-input').val('');
			
			event.preventDefault();
		}
	});
	//전송 버튼 CSS 조절
	$('#message').keyup( (event) => {
		// textarea에 값이 입력되어 있지 않다면, 전송버튼 비활성화
		if($('#message').val().trim() == ''){
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
		//입력되어 있다면 전송버튼 활성화
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
			
			let filename = $('#file-input').val();
			if(filename != null){
				sendFiles(filename);
			}else{
				send();
			}
			
			$('#message').focus(); 
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
			
			$('#img_zone').css('display','none');
			$('#message').attr('readonly',false);
			$('#message').attr('placeholder','메시지를 입력하세요');
			$('#img_zone').attr('src', '/resources/img/icon/none.png');
			$('.emoji-content').removeClass('disappear2');
			$('.emoji-content').addClass('disappear');
			$('#file-input').val('');
			
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
	
	//사용자가 이미지를 올렸을 때 
	$("#file-input").on('change', function(e){
		console.log("check");
		console.log(this.files[0]);
		readURL(this.files[0]);
	});
});
/*
function getFile(email) {
			
	let file = null
	
	let userOb = new Object();
	userOb.email = email;
	let user = JSON.stringify(userOb);
	
	$.ajax({
		type: "post",
		url: "getProfile.pie",
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		data: user,
		async: false,
		success: function(data) {
			
			//프로필 이미지 
			file = data.profile.profile;
		}
	});
	return profile;
}
*/


//이미지 미리보기 
function readURL(file) {
  	let reader = new FileReader();
	//파일을 읽어서
  	reader.readAsDataURL(file);

	//확장자명
	let index = file.name.lastIndexOf(".");
	let extension = file.name.substring(index+1);
	
	//파일이 다 읽어지면 
  	reader.onload = (e) => {
		$('#img_zone').css('display','block');
		
		if(extension === "png" || extension === "jpg" || extension === "jpeg"){
			$('#img_zone').attr('src', e.target.result);
		}else if(extension === "ppt" || extension === "pptx"){
			$('#img_zone').attr('src', '/resources/img/icon/ppt.png');
		}else if(extension === "xlsx"){
			$('#img_zone').attr('src', '/resources/img/icon/excel.png');
		}else if(extension === "hwp"){
			$('#img_zone').attr('src', '/resources/img/icon/hwp.png');
		}else if(extension === "doc" || extension === "docx"){
			$('#img_zone').attr('src', '/resources/img/icon/doc.png');
		}else if(extension === "pdf"){
			$('#img_zone').attr('src', '/resources/img/icon/pdf.png');
		}else if(extension === "txt"){
			$('#img_zone').attr('src', '/resources/img/icon/txt.png');
		}else if(extension === "zip"){
			$('#img_zone').attr('src', '/resources/img/icon/zip.png');
		}else{
			$('#img_zone').attr('src', '/resources/img/icon/file.png');
		}
		$('#message').attr('readonly',true);
		$('#message').removeAttr('placeholder');
		$('#chat-msgWrite-btn').attr('class','chat-msgWrite-btn')
		
		//파일이 업로드 되는 동안 이모티콘 올리지 않도록
		//chattingEmoji.js 파일에서 function switchAnimation(target) 에서 쓰임
		$('.emoji-content').removeClass('disappear');
		$('.emoji-content').addClass('disappear2');
		
		
		
		window.onkeydown = (event) => {
			if (event.keyCode == 8 || event.which == 8) {
				$('#img_zone').css('display','none');
				$('#message').attr('readonly',false);
				$('#message').attr('placeholder','메시지를 입력하세요');
				$('#img_zone').attr('src', '/resources/img/icon/none.png');
				$('.emoji-content').removeClass('disappear2');
				$('.emoji-content').addClass('disappear');
				$('#file-input').val('');
			}
		}
		
		/*
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
		*/
		
		console.log(e);  
		uploadFile(file);
  	}
}

//파일 업로드 
function uploadFile(file) {
	
	let form = $('#chat_uploadForm')[0];
	console.log(form);
	console.log($("#file-input").val());
	//파일 안 올리고 업로드 시 
	if($("#file-input").val()===''){
		console.log("파일없음");
		return;
	}
	
    let formData = new FormData(form);
	console.log(formData);
	formData.append('file', file);

	$.ajax({
		url: 'file?email='+$("#session_email").val(),
		data: formData,
		type: 'POST',
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false,
		async: false,
		cache: false,
		error		: function(request,status,error){
			alert(error);
		},
		success: function(data) {
			console.log(data);
		}
	});
}


var websocket;
var chatReceiveSocket;

function connect(){
	websocket = new WebSocket(
		"ws://localhost:8090/websocket/chat/websocket?select="+$('#select').val()+"&roomname="+$('#roomname').val());
	websocket.onopen = onOpen;
	websocket.onmessage = onMessage;
	websocket.onclose = onClose;
	
	chatReceiveSocket = new WebSocket(
		"ws://localhost:8090/websocket/chatReceive/websocket?select="+$('#select').val()+"&roomname="+$('#roomname').val());
	chatReceiveSocket.onopen = (event) => {};
	chatReceiveSocket.onmessage = (event) => {};
	chatReceiveSocket.onclose = (event) => {};
}

function disconnect(){
	websocket.close();
}

function onOpen(evt){
	
	let today = new Date();
	let date = today.format('yyyy년 MM월 dd일');
	
	firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages/0').set({
		chatting_room_seq : $('#select').val(),
		message_seq : 0
	});
	
	//DB에서 이전 데이터를 불러옴
	firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages').once('value',function(data){
		let myemail = $('#session_email').val();
		let msgbox = '';
		//데이터가 1개이면,
		if(data.val().length == 1){
			msgbox += 	"<div class='chat-body-date'>"+
							"<div class='chat-body-date-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
							"<div class='chat-body-date-letter'>"+
								date+
							"</div>"+
							"<div class='chat-body-date-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
						"</div>";
		}
		
		for(let i=1; i < data.val().length; i++){
			
			let str = data.val()[i].message_date;
			let strArr = str.split('-');
			let DB_date = new Date(strArr[0], strArr[1]-1, strArr[2]);
			let DB_date_format = DB_date.format('yyyy년 MM월 dd일');
			//날짜가 3일뒤 자정이 지난 메시지는 띄우지 않기
			if((today - DB_date)/1000/60/60/24 < 3){
				//날짜가 바뀌었으면 바뀐 것을 표시
				if(data.val()[i].message_date != data.val()[i-1].message_date){
					msgbox += 	"<div class='chat-body-date'>"+
									"<div class='chat-body-date-line'>"+
										"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
									"</div>"+
									"<div class='chat-body-date-letter'>"+
										DB_date_format+
									"</div>"+
									"<div class='chat-body-date-line'>"+
										"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
									"</div>"+
								"</div>";
				}
			
				//내가 보낸 메일이면
				if (data.val()[i].email == myemail) {
					msgbox += 	"<div class='chat-receiver-wrapper'>"+
									"<div class='chat-receiver-pic'>";
										if(data.val()[i].profile != null){
											msgbox +=	"<img class='chat-receiver-profile' src='/resources/profile/"+myemail+"_"+data.val()[i].profile+"'>";
										}else{
											msgbox +=	"<i class='fas fa-user'></i>";
										}
					msgbox +=		"</div>"+
									"<div>"+
										"<div class='chat-receiver-name'>"+
											data.val()[i].nickName+
										"</div>"+
										"<div class='chat-receiver-message-wrapper'>";
											//file이 있으면
											if(data.val()[i].message_content == ''){
												if(data.val()[i].extension == 'jpg' || data.val()[i].extension == 'jpeg' || data.val()[i].extension == 'png'){
													msgbox +=	"<div id='chatMessageArea' class='chat-receiver-message'>"+
																	"<img id='chat-receiver-file' class='chat-receiver-file' src='/resources/files/file_directory_project_seq_"+$('#projectNum').val()+data.val()[i].message_file+"'>"+
																	"<br><a class='chat-receiver-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+data.val()[i].message_file.substring(1)+"'><i class='fas fa-download'></i> "+data.val()[i].message_file.substring(1)+"</a>"+
																"</div>";
												}else{
													msgbox +=	"<div id='chatMessageArea' class='chat-receiver-message'>"+
																	"<img id='chat-receiver-file' class='chat-receiver-file' src='/resources/img/icon/"+data.val()[i].extension+".png'>"+
																	"<br><a class='chat-receiver-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+data.val()[i].message_file.substring(1)+"'><i class='fas fa-download'></i> "+data.val()[i].message_file.substring(1)+"</a>"+
																"</div>";
												}
												
											//일반 메시지가 들어오면
											}else{
												msgbox +=	"<div id='chatMessageArea' class='chat-receiver-message'>"+
																data.val()[i].message_content+
															"</div>";
											}
											
					msgbox +=				"<div class='chat-receiver-time'>"+
												data.val()[i].message_time+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>";
								
				//내가 보낸 메일이 아니면
				}else {
					msgbox += 	"<div class='chat-sender-wrapper'>"+
									"<div class='chat-sender-pic'>";
										if(data.val()[i].profile != null){
											msgbox +=	"<img class='chat-receiver-profile' src='/resources/profile/"+data.val()[i].email+"_"+data.val()[i].profile+"'>";
										}else{
											msgbox +=	"<i class='fas fa-user'></i>";
										}
					msgbox +=		"</div>"+
									"<div>"+
										"<div class='chat-sender-name'>"+
											data.val()[i].nickName+
										"</div>"+
										"<div class='chat-sender-message-wrapper'>";
											//file이 있으면
											if(data.val()[i].message_content == ''){
												if(data.val()[i].extension == 'jpg' || data.val()[i].extension == 'jpeg' || data.val()[i].extension == 'png'){
													msgbox +=	"<div id='chatMessageArea' class='chat-sender-message'>"+
																	"<img id='chat-sender-file' class='chat-sender-file' src='/resources/files/file_directory_project_seq_"+$('#projectNum').val()+data.val()[i].message_file+"'>"+
																	"<br><a class='chat-sender-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+data.val()[i].message_file.substring(1)+"'><i class='fas fa-download'></i> "+data.val()[i].message_file.substring(1)+"</a>"+
																"</div>";
												}else{
													msgbox +=	"<div id='chatMessageArea' class='chat-sender-message'>"+
																	"<img id='chat-sender-file' class='chat-sender-file' src='/resources/img/icon/"+data.val()[i].extension+".png'>"+
																	"<br><a class='chat-sender-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+data.val()[i].message_file.substring(1)+"'><i class='fas fa-download'></i> "+data.val()[i].message_file.substring(1)+"</a>"+
																"</div>";
												}
												
											
											//일반 메시지가 들어오면
											}else{
												msgbox +=	"<div id='chatMessageArea' class='chat-sender-message'>"+
																data.val()[i].message_content+
															"</div>";
											}
					msgbox +=				"<div class='chat-sender-time'>"+
												data.val()[i].message_time+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>";
									
				}//if (msginfo == myemail) end
			}//if((today - DB_date)/1000/60/60/24) < 2) end
		}//for(let i=0; i < data.val().length; i++) end
		if(data.val().length != 1){
			msgbox += 	"<div class='chat-body-unread'>"+
							"<div class='chat-body-unread-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
							"<div class='chat-body-unread-letter'>"+
								"여기까지 읽었습니다."+
							"</div>"+
							"<div class='chat-body-unread-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
						"</div>";
		}

		$("#chatMessageArea").append(msgbox);
		var chatAreaHeight = $("#chatArea").height();
		var maxScroll = $("#chatMessageArea").height() - chatAreaHeight;
		$("#chatMessageArea").scrollTop($("#chatMessageArea")[0].scrollHeight);
		
		
	});//firebase end
}

function onMessage(evt){
	var data = evt.data;
	if(data.indexOf('|') != -1){
		appendMessage(data);
	}else if(data == $('#session_email').val()){
		connectSocket.send($('#select').val());
	}
}

function onClose(evt){
	
}

function send(){
	let email = $('#session_email').val();
	let nickname = $('#nickname').val();
	var msg = $('#message').val();
	$('#message').val('');
	if(msg.trim() != ''){
		websocket.send(email + "|" + msg + "|" + nickname + "|"+nickname);
	}
}

function sendFiles(filename){
	let email = $('#session_email').val();
	let nickname = $('#nickname').val();
	var msg = $('#message').val();
	let index = filename.lastIndexOf('\\');
	let original_filename = filename.substring(index+1);
	console.log(original_filename);
	websocket.send(email + "|" + msg + "|" + nickname +"|/"+original_filename);
}

function appendMessage(msg) {
	console.log(msg.indexOf('|/'));
	
	$.ajax(
		{
			type 		: "GET",
			url  		: "users?select="+$('#select').val(),
			error		: function(request,status,error){
				alert(error);
			},
			success 	: function(data){
				
				let myemail = $('#session_email').val();
				let mynickname = $('#nickname').val();
				var strarray = msg.split('|');
			
				var msginfo = strarray[0];
				var message = strarray[1];
				var msgbox ='';
				
				//현재 시간 구하기
				let today = new Date();
				let time_index = today.toLocaleTimeString().lastIndexOf(':');
				let time = today.toLocaleTimeString().substr(0,time_index);
				let date = today.format('yyyy-MM-dd');
				
				let index = strarray[3].lastIndexOf(".");	
				let extension = strarray[3].substring(index+1);
				
				
				
					if (msginfo == myemail) {
						$.each(data,function(index,elem){
							if(myemail == elem.email){
								msgbox = 	"<div class='chat-receiver-wrapper'>"+
												"<div class='chat-receiver-pic'>";
												if(elem.profile != null){
													msgbox +=	"<img class='chat-receiver-profile' src='/resources/profile/"+myemail+"_"+elem.profile+"'>";
												}else{
													msgbox +=	"<i class='fas fa-user'></i>";
												}
								msgbox +=		"</div>"+
												"<div>"+
													"<div class='chat-receiver-name'>"+
														mynickname+
													"</div>"+
													"<div class='chat-receiver-message-wrapper'>";
													//file이 들어오면
													if(msg.indexOf('|/') != -1){
														if(extension == 'jpg' || extension == 'jpeg' || extension == 'png'){
															msgbox +=	"<div id='chatMessageArea' class='chat-receiver-message'>"+
																			"<img id='chat-receiver-file' class='chat-receiver-file' src='/resources/files/file_directory_project_seq_"+$('#projectNum').val()+strarray[3]+"'>"+
																			"<br><a class='chat-receiver-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+strarray[3].substring(1)+"'><i class='fas fa-download'></i> "+strarray[3].substring(1)+"</a>"+
																		"</div>";
														}else{
															msgbox +=	"<div id='chatMessageArea' class='chat-receiver-message'>"+
																			"<img id='chat-receiver-file' class='chat-receiver-file' src='/resources/img/icon/"+extension+".png'>"+
																			"<br><a class='chat-receiver-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+strarray[3].substring(1)+"'><i class='fas fa-download'></i> "+strarray[3].substring(1)+"</a>"+
																		"</div>";
														}
													
													//일반 메시지가 들어오면
													}else{
														msgbox +=	"<div id='chatMessageArea' class='chat-receiver-message'>"+
																		message+
																	"</div>";
													}
														
								msgbox +=				"<div class='chat-receiver-time'>"+
															time+
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
												message_time : time,
												message_file : strarray[3],
												extension: extension,
												email : $('#session_email').val(),
												nickName : $('#nickname').val(),
												profile : elem.profile,
											});
										});
										
										websocket.send($('#session_email').val());
										//connectSocket.send($('#select').val());
								}
							
							});
						
								
					}else if(msginfo == "알림"){
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
							if(msginfo == elem.email){
								msgbox = 	"<div class='chat-sender-wrapper'>"+
												"<div class='chat-sender-pic'>";
												if(elem.profile != null){
													msgbox +=	"<img class='chat-sender-profile' src='/resources/profile/"+elem.email+"_"+elem.profile+"'>";
												}else{
													msgbox +=	"<i class='fas fa-user'></i>";
												}
													
								msgbox +=		"</div>"+
												"<div>"+
													"<div class='chat-sender-name'>"+
														elem.nickName+
													"</div>"+
													"<div class='chat-sender-message-wrapper'>";
														//file이 들어오면
														if(msg.indexOf('|/') != -1){
															if(extension == 'jpg' || extension == 'jpeg' || extension == 'png'){
																msgbox +=	"<div id='chatMessageArea' class='chat-sender-message'>"+
																				"<img id='chat-sender-file' class='chat-sender-file' src='/resources/files/file_directory_project_seq_"+$('#projectNum').val()+strarray[3]+"'>"+
																				"<br><a class='chat-sender-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+strarray[3].substring(1)+"'><i class='fas fa-download'></i> "+strarray[3].substring(1)+"</a>"+
																			"</div>";
															}else{
																msgbox +=	"<div id='chatMessageArea' class='chat-sender-message'>"+
																				"<img id='chat-sender-file' class='chat-sender-file' src='/resources/img/icon/"+extension+".png'>"+
																				"<br><a class='chat-sender-file-a' href='file/download?project_seq="+$('#projectNum').val()+"&file_uploaded_name="+strarray[3].substring(1)+"'><i class='fas fa-download'></i> "+strarray[3].substring(1)+"</a>"+
																			"</div>";
															}
														
														//일반 메시지가 들어오면
														}else{
															msgbox +=	"<div id='chatMessageArea' class='chat-sender-message'>"+
																			message+
																		"</div>";
														}
								msgbox +=				"<div class='chat-sender-time'>"+
															time+
														"</div>"+
													"</div>"+
												"</div>"+
											"</div>";
											
											//websocket.send($('#session_email').val());
											chatReceiveSocket.send('');
											
							}//if
						});//each end
					}
				
				$("#chatMessageArea").append(msgbox);
				var chatAreaHeight = $("#chatArea").height();
				var maxScroll = $("#chatMessageArea").height() - chatAreaHeight;
				$("#chatMessageArea").scrollTop($("#chatMessageArea")[0].scrollHeight);
				
				
		}
	});
	
}
	//날짜 포맷 형식을 지정해준 함수
	Date.prototype.format = function (f) {
	    if (!this.valueOf()) return " ";
	
	    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
	    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	    var d = this;
	
	    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear(); // 년 (4자리)
	            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
	            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
	            case "dd": return d.getDate().zf(2); // 일 (2자리)
	            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
	            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
	            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
	            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
	            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
	            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
	            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
	            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
	            default: return $1;
	        }
	    });
	};
	
	String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
	String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
	Number.prototype.zf = function (len) { return this.toString().zf(len); };
	