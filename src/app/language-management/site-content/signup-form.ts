export interface SignupForm{
    reference_min_warning?:string;
    title?:string;
    tag?:string;
    text_on_form_header?:string;
    name?:string;
    name_required_warning?:string;
    surname?:string;
    surname_required_warning?:string;
    email?:string;
    email_required_warning?:string;
    password?:string;
    password_required_warning?:string;
    password_minLength_warning?:string;
    passwords_need_to_be_same_warning?:string;
    accept_terms_text?:string;
    accept_terms_link_part?:string;
    register_button_text?:string;
    register_result_text?:string;
    phone?:string;
    phone_required_warning?:string;
    birthday?:string;
    birthday_required_warning?:string;
    reference_id?:string;

    password_required_again_warning?:string;
    password_again?:string;

    _password_length?:string;
    _accept_terms_pre_text?:any;
    _accept_terms_pos_text?:any;

}