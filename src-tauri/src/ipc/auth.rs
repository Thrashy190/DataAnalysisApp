use tauri::{command};

#[command]
pub fn login(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}

#[command]
pub fn create_user(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}

#[command]
pub fn sign_out(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}