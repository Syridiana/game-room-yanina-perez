import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { defaultUrlMatcher, DefaultUrlSerializer, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';
import UserInterface from 'src/app/Entities/user-interface';
import { formatDate } from '@angular/common';
import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userRegister: FormGroup;
  userLogin: FormGroup;
  email: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  name: string | undefined;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private FirebaseCodeError: FirebaseCodeErrorService,
    private userFirestoreService: UserFirestoreService) {

    this.userRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


  }

  ngOnInit(): void {

    const switchers = document.querySelectorAll('.switcher');

    switchers.forEach(item => {
      item.addEventListener('click', function () {
        switchers.forEach(item2 => item2.parentElement?.classList.remove('is-active'))
        item.parentElement?.classList.add('is-active')
      })
    })


  }

  autoComplete(): void {
    this.userLogin.controls['email'].setValue("test@test.com");
    this.userLogin.controls['password'].setValue("test123");
  }


  async register() {
    this.email = this.userRegister.value.email;
    this.password = this.userRegister.value.password;
    this.passwordRepeat = this.userRegister.value.passwordRepeat;
    this.name = this.userRegister.value.name;


    if (this.password !== this.passwordRepeat) {

      Swal.fire({
        title: 'Error!',
        text: "Las contraseñas no coindicen",
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#ff3030",
        iconColor: "#fff",
        color: "#fff"
      })

    } else {
      this.afAuth.createUserWithEmailAndPassword(this.email!, this.password!).then((user) => {

        Swal.fire({
          title: 'Usuario registrado',
          text: "Usuario registrado con éxito",
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          background: "#00af00",
          iconColor: "#fff",
          color: "#fff"
        })

        this.router.navigate(['/']);

        const currentDate = new Date();

        const cValue = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');




        this.userFirestoreService.addUser({
          'email': this.email,
          'userName': this.name,
          'points': 0,
          'registerDate': cValue
        });



      }).catch((error) => {
        console.log(error)

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

  login(): void {
    this.email = this.userLogin.value.email;
    this.password = this.userLogin.value.password;



    this.afAuth.signInWithEmailAndPassword(this.email!, this.password!).then((user) => {

      console.log(user);

      Swal.fire({
        title: 'Usuario logueado',
        text: "Usuario logueado con éxito",
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#00af00",
        iconColor: "#fff",
        color: "#fff"
      })

      this.router.navigate(['/']);


    }).catch((error) => {

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


setUser(user: any){
  localStorage.setItem('testObject', JSON.stringify(user));
}

deleteUser(user: any){

}



}


