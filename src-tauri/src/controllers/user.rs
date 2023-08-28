use crate::models::user_model::User;
use crate::services::user_service::UserService;
use tauri::command;

#[command]
pub async fn get_users() -> Result<Vec<User>, String> {
    let user_service_result = UserService::new().await;

    match user_service_result {
        Ok(user_service) => {
            let signup_result = user_service.get_all().await;

            match signup_result {
                Ok(data) => Ok(data),
                Err(_) => Err("error".to_string()),
            }
        }
        Err(_) => Err("error".to_string()),
    }
}

#[command]
pub async fn update_terms_and_conditions(identifier: String) -> Result<String, String> {
    let user_service_result = UserService::new().await;

    match user_service_result {
        Ok(user_service) => {
            let signup_result = user_service.update_terms_and_conditions(identifier).await;

            match signup_result {
                Ok(()) => Ok("success".to_string()),
                Err(_) => Err("error".to_string()),
            }
        }
        Err(_) => Err("error".to_string()),
    }
}
