window.onload = function(){
    document.getElementById("send-text-message").addEventListener(
        'click', sendMessage
    )
};


navigator.mediaDevices.getUserMedia({audio:true})
    .then(function(stream){}).catch(
        function(error){
            console.error("Microphone access error :(", error);
        }
    );


function sendMessage(){
    message_form = document.getElementById("chat-message");
    message_text = message_form.value.trim();

    if (message_text !== ''){
        displayMessage("Вы: ", message_text);
        createResponse(message_text);
        message_form.value = '';
    }
}


function displayMessage(sender, text){
    chat_messages = document.getElementById('chat-text');
    message_element = document.createElement('div');
    message_element.innerHTML = '<strong>' + sender + ':</strong>' + text;
    
    chat_messages.appendChild(message_element);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}


function createResponse(text){
    word2response = {
        "Добрый день!": ["Здравствуйте!", "Чем могу помочь?", "Приветствую Вас!"],
        "Как успехи?": ["Очень хорошо!", "Лучше и быть не может!", "Восхитительно! А у вас?"],
        "Что делаешь?": ["Делаю жизнь интереснее!", "Прекрасно провожу время с Вами!", "Радуюсь жизни!"]
    };

    let response_text = "";

    if (word2response.hasOwnProperty(text)){
        array = word2response[text];
        random_index = Math.floor(Math.random() * array.length);
        responce_text = array[random_index];
    }
    else{
        response_text = "К сожалению, я пока не могу ответить на ваше сообщение.";
    }

    setTimeout(() => {
        displayMessage("Бот: ", response_text);
    }, 1500);
}


function startVoiceRecording(mediaRecorder){
    mediaRecorder.start();
}


function stopVoiceRecording(){
    mediaRecorder.stop();
}


function createVoiceMessage(){
    navigator.mediaDevices.getUserMedia({audio: true}).then(
        function(stream){
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function(e){
                chunks.push(e.data);
            }

            mediaRecorder.onstop = function(){
                const audioBlob = new Blob(chunks, {type: 'audio/wav'});
                const audioURL = URL.createObjectURL(audioBlob);
                sendAudioMessage(audioURL);
            }

            startVoiceRecording(mediaRecorder);
        }
    ).catch(
        function(err){
            console.log("Microphone access error :(");
        }
    )
}

var mediaRecorder; 
document.getElementById('start-voice-recording')
    .addEventListener('click', createVoiceMessage);
document.getElementById('stop-voice-recording')
    .addEventListener('click', stopVoiceRecording);



function sendAudioMessage(audioURL){
    audio_element = document.createElement('audio');
    audio_element.controls = true;
    audio_element.src = audioURL;
    displayMessage("Вы: ", audio_element.outerHTML);
}