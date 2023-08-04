use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthLogin {
    pub identifier: String,
    pub password: String,
}
