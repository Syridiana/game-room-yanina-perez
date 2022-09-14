export class User {
    userName:string|undefined;
    pass:string|undefined;
    registerDate:string|undefined;
    points:number|undefined;
    email:string|undefined;

    mostrar() {
        console.log(this);
    }
}
