// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod controllers;
mod database;
mod helper;
mod models;
mod services;

use controllers::{auth, cadet, user};

use tokio::main;

#[main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            auth::create_user,
            auth::login,
            user::get_users,
            user::update_terms_and_conditions,
            cadet::get_cadets,
            cadet::get_cadet,
            cadet::create_cadets,
            cadet::handle_dat_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
