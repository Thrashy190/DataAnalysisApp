use crate::models::user_model::User;
use crate::services::auth_service::AuthService;
use mongodb::bson::Document;
use tauri::command;

#[command]
pub async fn login(identifier: String, password: String) -> Result<Document, String> {
    let auth_service_result = AuthService::new().await;
    match auth_service_result {
        Ok(auth_service) => {
            let login_result = auth_service.login(identifier, password).await;

            match login_result {
                Ok(data) => Ok(data),
                Err(e) => Err(e),
            }
        }
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn create_user(user: User) -> Result<String, String> {
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
