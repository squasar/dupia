export class User{
    id?: number | null;
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    pass?: string | null;
    password_once_again?:string | null;
    photo?:any | null;
    phone?:string | null;
    point?:string | null;
    city?:string | null;
    yetki?:string | null;
    birth_day?:Date|null;
    ref_id_for_real?:string|null;
    ref_id_for_point?:string|null;
    ref_id_for_link?:string|null;

    //for personal model...
    sub_members?:any[] | null;
    rank?:number | null;
    created_date?:Date|null;
    parent_id?:number|null;
    ref_id?:string|null;

    isGhost?:string|null;
    nickname?:string|null;
    generation?:number | null;

    constructor(){
    }

}