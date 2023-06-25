use tauri::{command};


#[command]
pub fn get_users(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}

#[command]
pub fn get_user_by_id(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}

#[command]
pub fn delete_user(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}