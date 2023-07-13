use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Cadet {
    pub identifier: String,
    pub name: String,
    pub level: String,
    pub birth: i64,
    pub create_at:i64
}
