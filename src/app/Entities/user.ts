export class User {
    id?: string;
    userName:string|undefined;
    registerDate:string|undefined;
    points:number|undefined;
    email:string|undefined;

    mostrar() {
        console.log(this);
    }
}
