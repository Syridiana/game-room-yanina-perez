import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import ChatMessageI from 'src/app/Entities/chat-message-interface';
import { ChatServiceService } from 'src/app/Services/chat-service.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service';
import Swal from 'sweetalert2';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatArray: ChatMessageI[] | undefined;
  currentMessage: string | undefined;
  public currentUserEmail: any;
  public currentUser!: any | null;

  constructor(private chatService: ChatServiceService, private angularFireAuth: AngularFireAuth,
    private FirebaseCodeError: FirebaseCodeErrorService, private userFirestoreService: UserFirestoreService) { 
    this.chatService.getMessages().subscribe(chats => {
      this.chatArray = chats;
    })

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserEmail = user.email;
        this.currentUser = user;
      }
    })
  }



  ngOnInit(): void {
  }

  enterMessage(): void {
  
    const currentDate = Timestamp.now();

    this.chatService.sendMessage({ 
      userEmail: this.currentUserEmail,
      time: currentDate,
      message: this.currentMessage
    })
     .catch((error) => {

      Swal.fire({
        title: 'Error!',
        text: this.FirebaseCodeError.codeError(error.code),
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#ff3030",
        iconColor: "#fff",
        color: "#fff"
      })

    }); 

  }

}
