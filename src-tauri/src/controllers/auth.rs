use tauri::{command};
use crate::services::auth_service::AuthService;
use crate::models::user_model::User;


#[command]
pub fn login(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}

#[command]
pub async fn create_user(user:User) -> Result<String, String> {
    let auth_service_result = AuthService::new().await;
    match auth_service_result {
        Ok(auth_service) => {
            let signup_result = auth_service.signup(user).await;

            match signup_result {
                Ok(()) => Ok("success".to_string()),
                Err(_) => Err("error".to_string()),
            }
        }
        Err(_) => Err("error".to_string()),
    }
}

#[command]
pub fn sign_out(user: String,password:String) -> String {
    format!("User: {}, Password: {}",user,password)
}