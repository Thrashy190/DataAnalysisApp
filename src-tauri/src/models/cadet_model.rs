use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Cadet {
    pub identifier: String,
    pub genre: String,
    pub level: String,
    pub birth: i64,
    pub relationship: String,
    pub create_at:i64
}
