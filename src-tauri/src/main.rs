// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod controllers;
mod services;
mod database;
mod models;
mod helper;

use controllers::{auth,user,cadet};

use tokio::{main};

#[main]
async fn main()  {


    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            auth::create_user,
            user::get_users,
            cadet::get_cadets,
            cadet::create_cadets
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
