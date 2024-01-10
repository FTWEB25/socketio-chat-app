    const socket = io("http://localhost:8000");
    
    const audio = new Audio("../audio/pikachu-message-tone.mp3")

    const formEl = document.getElementById("send-container");
    const messageInput = document.getElementById("messageInp");
    const messageContainer=document.querySelector(".container")


    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      append(`You:${messageInput.value}`,'right')
      socket.emit('send',messageInput.value)
      messageInput.value=''
    });

    const nam=prompt("Enter your name to join")
    socket.emit("new-user-joined",nam)
    
    const append=(message,position)=>{
        let messageElement=document.createElement("div")
        messageElement.innerText=message
        messageElement.classList.add("message")
        messageElement.classList.add(position)
        messageContainer.append(messageElement)
        if(position=='left'){
            audio.play()
        }
    }
    socket.on("user-joined",name=>{
       append(`${name} has joined`,"right")
    })
    
    socket.on('receive',data=>{
      append(`${data.name}: ${data.msg}`,"left")
    })
    

    socket.on("left",name=>{
        append(`${name} Left the chat`,'left')
    })
    