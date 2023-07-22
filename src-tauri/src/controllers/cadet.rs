use mongodb::bson::{doc, Document};
use tauri::{command};
use std::fs;
use std::io::Read;

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
pub async fn handle_dat_file( name:String,identifier:String, data:Vec<u8>) ->  Result<String, String>{

    let directory_path = "C:/Users/diego/Documents/proyectos/cinvestav/files";

    let parts = name.split("-");
    let title = parts.clone().collect::<Vec<&str>>()[0];
    let date = parts.clone().collect::<Vec<&str>>()[2];

    let file_path = format!("{}/{}", directory_path, name);

    fs::write(&file_path, &data)
        .expect("Error al escribir el archivo");


    let mut read_buffer = Vec::new();
    let mut read_file = fs::File::open(&file_path).expect("Error al abrir el archivo");
    read_file.read_to_end(&mut read_buffer).expect("Error al leer el archivo");
    let file_content = String::from_utf8_lossy(&read_buffer);

    let mut time_vec = Vec::new();
    let mut data = Vec::new();

    let lines = file_content.lines();

    for line in lines {
        let columns: Vec<&str> = line.split(',').collect();
        if columns.len() == 2 {
            if let Ok(time) = columns[0].trim().parse::<f64>() {
                if let Ok(heart_rate) = columns[1].trim().parse::<f64>() {
                    data.push( heart_rate);

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
                    "stats":{
                        "type":{
                            "title":title,
                            "time":time_vec,
                            "data":data
                        }
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