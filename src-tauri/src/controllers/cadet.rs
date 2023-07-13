use tauri::{command};
use crate::models::cadet_model::Cadet;
use crate::services::cadet_service::CadetService;


#[command]
pub async fn get_cadets() -> Result<Vec<Cadet>, String> {
    let cadet_service_result = CadetService::new().await;

    match cadet_service_result {
        Ok(cadet_service) => {
            let signup_result = cadet_service.get_cadets().await;

            match signup_result {
                Ok(data) => Ok(data),
                Err(_) => Err("error".to_string()),
            }
        }
        Err(_) => Err("error".to_string()),
    }
}

#[command]
pub async fn create_cadets(cadet:Cadet) -> Result<String, String> {
    println!("hola");

    let cadet_service_result = CadetService::new().await;
    match cadet_service_result {
        Ok(cadet_service) => {
            let create_result = cadet_service.create_cadet(cadet).await;

            match create_result {
                Ok(()) => Ok("success".to_string()),
                Err(_) => Err("error".to_string()),
            }
        }
        Err(_) => Err("error".to_string()),
    }
}