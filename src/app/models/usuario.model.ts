export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,         //estos cmapos son opcionales ?
        public role?: string,
        public google?: boolean,
        public _id?: string,
    ) {}
}