use mongodb::bson::{doc, Document};
use tauri::{command};

use crate::models::cadet_model::Cadet;
use crate::services::cadet_service::CadetService;

#[command]
pub async fn get_cadet(identifier:String) -> Result<Document, String> {
    let cadet_service_result = CadetService::new().await;

    match cadet_service_result {
        Ok(cadet_service) => {
            let signup_result = cadet_service.get_cadet(identifier).await;

            match signup_result {
                Ok(data) => Ok(data),
                Err(_) => Err("error".to_string()),
            }
        }
        Err(_) => Err("error".to_string()),
    }
}

#[command]
pub async fn get_cadets() -> Result<Vec<Document>, String> {
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

    let cadet_service_result = CadetService::new().await;
    match cadet_service_result {
        Ok(cadet_service) => {
            let create_result = cadet_service.create_cadet(cadet).await;

            match create_result {
                Ok(()) => Ok("Cadete creado exitosamente".to_string()),
                Err(_) => Err("Error al crear cadete o cadete existente".to_string()),
            }
        }
        Err(_) => Err("No se genero la instancia".to_string()),
    }
}


#[command]
pub async fn handle_dat_file(date:i64, identifier:String, data:Vec<u8>,process:String) ->  Result<String, String>{

    let file_content = String::from_utf8_lossy(&data);

    let mut time_vec = Vec::new();
    let mut data_vec = Vec::new();

    let lines = file_content.lines();

    for line in lines {
        let columns: Vec<&str> = line.split(',').collect();
        if columns.len() == 2 {
            if let Ok(time) = columns[0].trim().parse::<f64>() {
                if let Ok(data) = columns[1].trim().parse::<f64>() {
                    data_vec.push( data);

                }
                time_vec.push(time)
            }
        }
    }

    let cadet_service_result = CadetService::new().await;

    match  cadet_service_result{
        Ok(cadet_service) => {
            let create_result = cadet_service.update_cadet(doc!{
                "$push": {
                    process:{
                            "date":date,
                            "time":time_vec,
                            "data":data_vec
                    }
                }
            } ,identifier).await;

            match create_result {
                Ok(()) => Ok("Informacion agregada correctamente".to_string()),
                Err(_) => Err("Error al agregar informacion".to_string()),
            }
        }
        Err(_) => Err("No se genero la instancia".to_string()),
    }
}


