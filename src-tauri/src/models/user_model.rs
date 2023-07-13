use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub identifier: String,
    pub password: String,
    pub role: String,
    pub create_at:i64
}
